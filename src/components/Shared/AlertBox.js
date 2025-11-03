import React from 'react';
import './AlertBox.css';

const AlertBox = ({ 
  type = 'error', 
  title, 
  message, 
  isOpen, 
  onClose, 
  onConfirm,
  showConfirmButton = false,
  confirmText = 'OK',
  cancelText = 'Cancel'
}) => {
  if (!isOpen) return null;

  const getAlertIcon = () => {
    switch (type) {
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'success':
        return '✅';
      case 'info':
        return 'ℹ️';
      default:
        return '❌';
    }
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    if (onClose) {
      onClose();
    }
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="alert-overlay">
      <div className={`alert-box alert-${type}`}>
        <div className="alert-header">
          <div className="alert-icon">
            {getAlertIcon()}
          </div>
          <div className="alert-content">
            {title && <h3 className="alert-title">{title}</h3>}
            <p className="alert-message">{message}</p>
          </div>
          <button className="alert-close" onClick={handleCancel}>
            ×
          </button>
        </div>
        
        <div className="alert-actions">
          {showConfirmButton && (
            <>
              <button className="btn btn-secondary" onClick={handleCancel}>
                {cancelText}
              </button>
              <button className="btn btn-primary" onClick={handleConfirm}>
                {confirmText}
              </button>
            </>
          )}
          {!showConfirmButton && (
            <button className="btn btn-primary" onClick={handleCancel}>
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertBox;
