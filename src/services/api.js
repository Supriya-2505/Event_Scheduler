import axios from 'axios';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    validateStatus: status => status < 400 // Reject all error status codes (4xx and 5xx)
});

// Add a request interceptor to include the JWT token and log requests
api.interceptors.request.use(
    config => {
        console.log('Making request to:', config.baseURL + config.url);
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Add retry functionality
const retryRequest = async (error, retryCount = 0) => {
    const config = error.config;
    
    if (!config || retryCount >= MAX_RETRIES || error.response?.status === 401) {
        return Promise.reject(error);
    }

    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * Math.pow(2, retryCount)));
    console.log(`Retrying request (${retryCount + 1}/${MAX_RETRIES})...`);
    return api.request(config);
};

// Add response interceptors
api.interceptors.response.use(
    response => {
        console.log('Response received:', response.status, response.data);
        // If it's an error response (4xx status), reject it
        if (response.status >= 400) {
            return Promise.reject({
                response: {
                    status: response.status,
                    data: response.data
                }
            });
        }
        return response;
    },
    async error => {
        console.error('Response error:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
        });

        // Handle different types of errors
        if (error.response) {
            // Server responded with an error status
            switch (error.response.status) {
                case 401:
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href = '/login';
                    break;
                case 403:
                    console.error('Access forbidden');
                    break;
                case 404:
                    console.error('Resource not found');
                    break;
                case 409:
                    // Event conflict - don't retry, let the component handle it
                    console.error('Event conflict:', error.response.data?.message);
                    break;
                case 500:
                    return retryRequest(error);
                default:
                    if (error.response.status >= 500) {
                        return retryRequest(error);
                    }
                    console.error('Server error:', error.response.status);
            }
        } else if (error.request) {
            // Request was made but no response received - retry
            return retryRequest(error);
        } else {
            // Error in setting up the request
            console.error('Request setup error:', error.message);
        }
        
        return Promise.reject(error);
    }
);

export default api;