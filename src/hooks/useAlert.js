import { useState, useCallback } from 'react';

const useAlert = () => {
  const [alert, setAlert] = useState({
    isOpen: false,
    type: 'error',
    title: '',
    message: '',
    showConfirmButton: false,
    confirmText: 'OK',
    cancelText: 'Cancel',
    onConfirm: null
  });

  const showAlert = useCallback((options) => {
    setAlert({
      isOpen: true,
      type: options.type || 'error',
      title: options.title || '',
      message: options.message || '',
      showConfirmButton: options.showConfirmButton || false,
      confirmText: options.confirmText || 'OK',
      cancelText: options.cancelText || 'Cancel',
      onConfirm: options.onConfirm || null
    });
  }, []);

  const hideAlert = useCallback(() => {
    setAlert(prev => ({
      ...prev,
      isOpen: false
    }));
  }, []);

  const showError = useCallback((message, title = 'Error') => {
    showAlert({
      type: 'error',
      title,
      message
    });
  }, [showAlert]);

  const showSuccess = useCallback((message, title = 'Success') => {
    showAlert({
      type: 'success',
      title,
      message
    });
  }, [showAlert]);

  const showWarning = useCallback((message, title = 'Warning') => {
    showAlert({
      type: 'warning',
      title,
      message
    });
  }, [showAlert]);

  const showInfo = useCallback((message, title = 'Information') => {
    showAlert({
      type: 'info',
      title,
      message
    });
  }, [showAlert]);

  const showConfirm = useCallback((message, onConfirm, title = 'Confirm Action') => {
    showAlert({
      type: 'warning',
      title,
      message,
      showConfirmButton: true,
      confirmText: 'Yes',
      cancelText: 'No',
      onConfirm
    });
  }, [showAlert]);

  return {
    alert,
    showAlert,
    hideAlert,
    showError,
    showSuccess,
    showWarning,
    showInfo,
    showConfirm
  };
};

export default useAlert;
