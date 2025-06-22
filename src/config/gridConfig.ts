/**
 * AG-Grid configuration and setup
 * 
 * This module contains all grid-related configuration including:
 * - Column definitions
 * - Grid options
 * - Cell renderers
 * - Auto-sizing logic
 * 
 * Centralizing grid configuration makes it easier to maintain and modify
 * grid behavior without touching the main application file.
 */

import type { GridOptions, ColDef } from 'ag-grid-community';
import type { RowData } from '../types';
import { getIconSvg } from '../utils/icons';
import { CustomTooltip } from '../components/CustomTooltip';
import { sampleData, getNonProductData } from '../data';

/**
 * Creates a custom cell renderer for the description column
 * 
 * This renderer displays the description text alongside a contextual icon.
 * The layout uses flexbox to ensure the icon remains visible even when
 * the text is truncated with ellipsis.
 * 
 * @param params - AG-Grid cell renderer parameters containing cell data
 * @returns HTML string representing the cell content
 */
const createDescriptionCellRenderer = (params: any): string => {
  // Get the appropriate icon SVG based on the row's badge field
  const iconSvg = getIconSvg(params.data.badge);
  
  // Return a flexbox layout with text that can truncate and a fixed icon
  return `
    <div class="description-cell">
      <span class="description-text">${params.value}</span>
      <span class="icon">${iconSvg}</span>
    </div>
  `;
};

/**
 * Column definitions for the AG-Grid
 * 
 * Defines the structure and behavior of each column in the grid:
 * - Category: Simple text column
 * - Description: Complex column with custom renderer, tooltip, and fixed width
 */
export const columnDefinitions: ColDef[] = [
  {
    // Category column - simple text display
    field: 'category',
    headerName: 'Category',
    sortable: true,
    filter: true,
    resizable: true
  },
  {
    // Description column - complex with custom rendering and tooltips
    field: 'description',
    headerName: 'Description',
    width: 300, // Fixed width to demonstrate text truncation
    sortable: true,
    filter: true,
    resizable: true,
    
    // Custom cell renderer for description + icon layout
    cellRenderer: createDescriptionCellRenderer,
    
    // Tooltip configuration
    tooltipField: 'description', // Use the description field value for tooltip
    tooltipComponent: CustomTooltip, // Use our custom tooltip component
    
    // Enable text wrapping in case of very wide columns
    wrapText: false, // Keep false to maintain ellipsis behavior
    autoHeight: false // Keep false to maintain consistent row heights
  }
];

/**
 * Implements auto-sizing logic for the description column
 * 
 * This function calculates the optimal width for the description column
 * based on the longest non-Product category text. This ensures that
 * shorter service/support descriptions are fully visible while preventing
 * the column from becoming too wide due to very long product descriptions.
 * 
 * @param params - Grid ready event parameters from AG-Grid
 */
const setupColumnAutoSizing = (params: any): void => {
  // Use setTimeout to ensure grid is fully rendered before measuring
  setTimeout(() => {
    // Get descriptions from non-Product rows only (shorter text)
    const nonProductDescriptions = getNonProductData()
      .map(row => row.description);
    
    // Find the longest description by character count
    const longestDescription = nonProductDescriptions
      .reduce((longest, current) => 
        current.length > longest.length ? current : longest, 
        ''
      );
    
    // Create a temporary DOM element to measure text width
    const measurementElement = document.createElement('div');
    
    // Configure the element for accurate measurement
    measurementElement.style.position = 'absolute';
    measurementElement.style.visibility = 'hidden'; // Hide from user
    measurementElement.style.whiteSpace = 'nowrap'; // Prevent wrapping
    measurementElement.textContent = longestDescription;
    
    // Copy styling from actual grid cells for accurate measurement
    const existingGridCell = document.querySelector('#myGrid .ag-cell') as HTMLElement;
    if (existingGridCell) {
      const computedStyle = window.getComputedStyle(existingGridCell);
      measurementElement.style.font = computedStyle.font;
      measurementElement.style.padding = computedStyle.padding;
    }
    
    // Add to DOM temporarily for measurement
    document.body.appendChild(measurementElement);
    const measuredWidth = measurementElement.offsetWidth;
    document.body.removeChild(measurementElement);
    
    // Apply the calculated width with some padding and a maximum limit
    const finalWidth = Math.min(measuredWidth + 40, 600); // 40px padding, max 600px
    
    params.api.setColumnWidths([{
      key: 'description',
      newWidth: finalWidth
    }]);
  }, 300); // 300ms delay to ensure grid is fully rendered
};

/**
 * Main grid options configuration
 * 
 * This object contains all the configuration options for the AG-Grid instance.
 * It includes data, column definitions, theme settings, and event handlers.
 */
export const gridOptions: GridOptions<RowData> = {
  // Data and column configuration
  columnDefs: columnDefinitions,
  rowData: sampleData,
  
  // Theme configuration - using legacy theme for compatibility
  theme: 'legacy',
  
  // Grid behavior options
  defaultColDef: {
    sortable: true,      // Enable sorting on all columns by default
    filter: true,        // Enable filtering on all columns by default
    resizable: true,     // Allow column resizing
    flex: 0             // Don't use flex sizing by default (use explicit widths)
  },
  
  // Row and selection options
  rowSelection: 'single', // Allow single row selection
  suppressRowClickSelection: false, // Allow row selection by clicking
  
  // Performance options
  animateRows: true,      // Animate row changes
  
  // Event handlers
  onGridReady: setupColumnAutoSizing, // Setup auto-sizing when grid is ready
  
  // Optional: Add more event handlers as needed
  // onCellClicked: (event) => console.log('Cell clicked:', event),
  // onRowSelected: (event) => console.log('Row selected:', event),
  
  // Tooltip options (global settings)
  tooltipShowDelay: 500,     // Show tooltip after 500ms hover
  tooltipHideDelay: 0,       // Hide tooltip immediately when not hovering
  tooltipMouseTrack: false   // Tooltip doesn't follow mouse cursor
};