import React, { useState, useEffect } from 'react';
import Notes from './components/Notes';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState(() => {
    // Load theme from localStorage or default to 'light'
    return localStorage.getItem('theme') || 'light';
  });

  // Effect to apply theme to document element and save to localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  /**
   * Toggle between light and dark themes
   */
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="App">
      <button 
        className="theme-toggle" 
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        <span className="theme-toggle-icon">
          {theme === 'light' ? '🌙' : '☀️'}
        </span>
        {theme === 'light' ? 'Dark' : 'Light'}
      </button>
      
      <Notes />
    </div>
  );
}

export default App;
