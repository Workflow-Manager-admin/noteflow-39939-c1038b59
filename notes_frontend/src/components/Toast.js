import React from 'react';
import './Toast.css';

// PUBLIC_INTERFACE
/**
 * Toast notification component for displaying user feedback
 * @param {Array} toasts - Array of toast objects
 * @param {function} onRemove - Callback to remove a toast
 */
const Toast = ({ toasts, onRemove }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast toast-${toast.type}`}
          onClick={() => onRemove(toast.id)}
        >
          <div className="toast-content">
            <span className="toast-icon">
              {toast.type === 'success' && '✓'}
              {toast.type === 'error' && '✕'}
              {toast.type === 'warning' && '⚠'}
              {toast.type === 'info' && 'ℹ'}
            </span>
            <span className="toast-message">{toast.message}</span>
          </div>
          <button
            className="toast-close"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(toast.id);
            }}
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
