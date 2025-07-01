import React from 'react';
import './LoadingSpinner.css';

// PUBLIC_INTERFACE
/**
 * Loading spinner component for indicating loading states
 * @param {string} size - Size of spinner (small, medium, large)
 * @param {string} color - Color theme (primary, secondary)
 */
const LoadingSpinner = ({ size = 'medium', color = 'primary' }) => {
  return (
    <div className={`spinner-container spinner-${size}`}>
      <div className={`spinner spinner-${color}`}>
        <div className="spinner-inner"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
