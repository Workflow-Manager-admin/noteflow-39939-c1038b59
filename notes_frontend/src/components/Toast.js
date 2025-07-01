import React from 'react';
import { FiCheck, FiX, FiAlertTriangle, FiInfo } from 'react-icons/fi';
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
              {toast.type === 'success' && <FiCheck />}
              {toast.type === 'error' && <FiX />}
              {toast.type === 'warning' && <FiAlertTriangle />}
              {toast.type === 'info' && <FiInfo />}
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
            <FiX />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
