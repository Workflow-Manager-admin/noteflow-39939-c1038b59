import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navigation.css';

// PUBLIC_INTERFACE
/**
 * Navigation component that provides header navigation with branding and back button
 */
const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // PUBLIC_INTERFACE
  /**
   * Navigate back to the front page
   */
  const handleBackToHome = () => {
    navigate('/');
  };

  // Show navigation only on notes page
  if (location.pathname === '/') {
    return null;
  }

  return (
    <nav className="navigation">
      <div className="nav-container">
        <button 
          className="nav-back-button"
          onClick={handleBackToHome}
          aria-label="Back to home"
        >
          <span className="nav-back-icon">←</span>
          <span className="nav-back-text">Home</span>
        </button>
        
        <div className="nav-brand">
          <span className="nav-logo">📝</span>
          <span className="nav-title">Notes Manager</span>
        </div>
        
        <div className="nav-spacer"></div>
      </div>
    </nav>
  );
};

export default Navigation;
