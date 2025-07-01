import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiBook, FiEdit, FiSettings, FiSmartphone, FiArrowRight } from 'react-icons/fi';
import './FrontPage.css';

// PUBLIC_INTERFACE
/**
 * Front page component that serves as the landing page for the Notes Manager app
 * Provides welcome message, branding, feature overview, and navigation to main app
 */
const FrontPage = () => {
  const navigate = useNavigate();

  // PUBLIC_INTERFACE
  /**
   * Navigate to the notes manager page
   */
  const handleGetStarted = () => {
    navigate('/notes');
  };

  return (
    <div className="front-page">
      <div className="front-page-container">
        <header className="front-page-header">
          <div className="brand-logo">
            <span className="logo-icon"><FiBook /></span>
            <h1 className="brand-title">Notes Manager</h1>
          </div>
          <p className="brand-tagline">Your thoughts, organized beautifully</p>
        </header>

        <main className="front-page-main">
          <section className="hero-section">
            <h2 className="hero-title">
              Capture, organize, and never forget your ideas
            </h2>
            <p className="hero-description">
              A simple yet powerful notes manager that helps you keep track of your thoughts, 
              ideas, and important information. Create, edit, and organize your notes with an 
              intuitive and beautiful interface.
            </p>
          </section>

          <section className="features-section">
            <h3 className="features-title">What you can do</h3>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon"><FiEdit /></div>
                <h4 className="feature-title">Create & Edit</h4>
                <p className="feature-description">
                  Easily create new notes and edit existing ones with our intuitive editor
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><FiBook /></div>
                <h4 className="feature-title">Organize</h4>
                <p className="feature-description">
                  Keep your notes organized with timestamps and search functionality
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><FiSettings /></div>
                <h4 className="feature-title">Dark Mode</h4>
                <p className="feature-description">
                  Switch between light and dark themes for comfortable viewing
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><FiSmartphone /></div>
                <h4 className="feature-title">Responsive</h4>
                <p className="feature-description">
                  Access your notes from any device with our responsive design
                </p>
              </div>
            </div>
          </section>

          <section className="cta-section">
            <button 
              className="cta-button"
              onClick={handleGetStarted}
              aria-label="Get started with Notes Manager"
            >
              <span className="cta-text">Get Started</span>
              <span className="cta-arrow"><FiArrowRight /></span>
            </button>
            <p className="cta-subtitle">
              Start organizing your thoughts today
            </p>
          </section>
        </main>

        <footer className="front-page-footer">
          <p className="footer-text">
            Built with care for productivity enthusiasts
          </p>
        </footer>
      </div>
    </div>
  );
};

export default FrontPage;
