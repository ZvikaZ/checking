/**
 * Main App component for the AG-Grid React TypeScript application
 * 
 * This is the root component that renders the application layout
 * and includes the main grid component.
 */

import React from 'react';
import GridComponent from './components/GridComponent';

/**
 * Root application component
 * 
 * Provides the overall layout and structure for the AG-Grid demonstration.
 * Includes the main heading and the grid component.
 */
const App: React.FC = () => {
  return (
    <div className="app">
      <h1>AG-Grid React TypeScript Example</h1>
      <GridComponent />
    </div>
  );
};

export default App;