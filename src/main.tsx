/**
 * Main entry point for the AG-Grid React TypeScript application
 * 
 * This application demonstrates:
 * - AG-Grid React integration with TypeScript
 * - Custom cell renderers with icons and text truncation
 * - Custom React tooltip components
 * - Modular code organization with React patterns
 * - Column auto-sizing based on content
 * 
 * The application displays a grid with categories, descriptions, and contextual icons,
 * showcasing how to handle varying content lengths with proper UI patterns in React.
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

/**
 * Initialize and render the React application
 * 
 * This function:
 * 1. Finds the target DOM element for the React app
 * 2. Creates a React root and renders the App component
 * 3. Handles any initialization errors gracefully
 */
const initializeApp = (): void => {
  // Find the root container element
  const container = document.getElementById('root');
  
  if (!container) {
    console.error('Root container element not found');
    return;
  }
  
  try {
    // Create React root and render the app
    const root = createRoot(container);
    root.render(<App />);
    
    console.log('React AG-Grid application initialized successfully');
  } catch (error) {
    console.error('Failed to initialize React application:', error);
  }
};

/**
 * Application startup
 * 
 * Initialize the app when the DOM is ready. This ensures all required
 * DOM elements are available before attempting to create the React root.
 */
if (document.readyState === 'loading') {
  // DOM is still loading, wait for it to complete
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  // DOM is already loaded, initialize immediately
  initializeApp();
}