/**
 * Main entry point for the AG-Grid TypeScript application
 * 
 * This application demonstrates:
 * - AG-Grid community edition setup with TypeScript
 * - Custom cell renderers with icons and text truncation
 * - Custom tooltip components with width limitations
 * - Modular code organization with separate concerns
 * - Column auto-sizing based on content
 * 
 * The application displays a grid with categories, descriptions, and contextual icons,
 * showcasing how to handle varying content lengths with proper UI patterns.
 */

import { createGrid, ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { gridOptions } from './config/gridConfig';

/**
 * Initialize AG-Grid modules
 * 
 * AG-Grid uses a modular architecture where features are provided through modules.
 * The AllCommunityModule includes all features available in the free community edition.
 * This must be registered before creating any grid instances.
 */
ModuleRegistry.registerModules([AllCommunityModule]);

/**
 * Initialize and render the grid
 * 
 * This function:
 * 1. Finds the target DOM element for the grid
 * 2. Creates the grid instance with our configuration
 * 3. Handles any initialization errors gracefully
 */
const initializeGrid = (): void => {
  // Find the grid container element
  const gridContainer = document.querySelector<HTMLElement>('#myGrid');
  
  if (!gridContainer) {
    console.error('Grid container element #myGrid not found');
    return;
  }
  
  try {
    // Create the grid instance with our pre-configured options
    createGrid(gridContainer, gridOptions);
    
    console.log('AG-Grid initialized successfully');
  } catch (error) {
    console.error('Failed to initialize AG-Grid:', error);
  }
};

/**
 * Application startup
 * 
 * Initialize the grid when the DOM is ready. This ensures all required
 * DOM elements are available before attempting to create the grid.
 */
if (document.readyState === 'loading') {
  // DOM is still loading, wait for it to complete
  document.addEventListener('DOMContentLoaded', initializeGrid);
} else {
  // DOM is already loaded, initialize immediately
  initializeGrid();
}