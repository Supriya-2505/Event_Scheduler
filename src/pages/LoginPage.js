import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './LoginPage.css';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        fullName: '',
    });
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const requestData = isRegistering 
                ? formData 
                : { username: formData.username, password: formData.password };
                
            const response = await api.post(
                isRegistering ? '/auth/register' : '/auth/login',
                requestData
            );

            const { data } = response;
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify({
                username: data.username,
                fullName: data.fullName
            }));
            navigate('/');
            // Force a refresh to ensure token state is recognized
            window.location.reload();
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>{isRegistering ? 'Register' : 'Login'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    {isRegistering && (
                        <>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required={isRegistering}
                                />
                            </div>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    required={isRegistering}
                                />
                            </div>
                        </>
                    )}
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" className="submit-button">
                        {isRegistering ? 'Register' : 'Login'}
                    </button>
                </form>
                <p className="toggle-auth">
                    {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <button 
                        className="toggle-button"
                        onClick={() => {
                            setIsRegistering(!isRegistering);
                            setFormData({
                                username: '',
                                password: '',
                                email: '',
                                fullName: ''
                            });
                            setError('');
                        }}
                    >
                        {isRegistering ? 'Login' : 'Register'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;