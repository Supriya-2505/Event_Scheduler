export const handleApiError = (error) => {
  // If there's a response with an error message from the server
  if (error.response?.data?.message) {
    alert(error.response.data.message);
    return {
      success: false,
      error: error.response.data.message
    };
  }
  
  // For network errors or other issues
  const errorMessage = 'An error occurred. Please try again.';
  alert(errorMessage);
  return {
    success: false,
    error: errorMessage
  };
};