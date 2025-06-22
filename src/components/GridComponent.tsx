/**
 * Main AG-Grid React component
 * 
 * This component wraps the AG-Grid React component with our custom configuration.
 * It handles the grid setup, column definitions, and data management using React patterns.
 */

import React, { useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// Import our modular components and utilities
import type { RowData } from '../types';
import { sampleData, getNonProductData } from '../data';
import { getIconSvg } from '../utils/icons';
import CustomTooltip from './CustomTooltip';

// Register AG-Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

/**
 * Custom cell renderer component for the description column
 * 
 * This React functional component renders the description text with a contextual icon,
 * using flexbox layout to ensure the icon remains visible even when text is truncated.
 * 
 * Features:
 * - Text truncation with ellipsis when content exceeds available width
 * - Contextual SVG icons that remain visible during truncation
 * - Flexbox layout for responsive design
 * - Type-safe integration with AG-Grid React
 * 
 * @param props - AG-Grid cell renderer parameters including value and row data
 * @returns JSX element with description text and icon
 */
const DescriptionCellRenderer: React.FC<ICellRendererParams<RowData>> = ({ value, data }) => {
  const iconSvg = getIconSvg(data?.badge || 'help');
  
  return (
    <div className="description-cell">
      <span className="description-text">{value}</span>
      <span 
        className="icon" 
        dangerouslySetInnerHTML={{ __html: iconSvg }}
      />
    </div>
  );
};

/**
 * Main Grid component that sets up and renders the AG-Grid
 */
const GridComponent: React.FC = () => {
  /**
   * Column definitions memoized for performance
   * Defines the structure and behavior of each grid column
   */
  const columnDefs = useMemo<ColDef[]>(() => [
    {
      field: 'category',
      headerName: 'Category',
      sortable: true,
      filter: true,
      resizable: true
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 300,
      sortable: true,
      filter: true,
      resizable: true,
      cellRenderer: DescriptionCellRenderer,
      tooltipField: 'description',
      tooltipComponent: CustomTooltip,
      wrapText: false,
      autoHeight: false
    }
  ], []);

  /**
   * Row data memoized for performance
   */
  const rowData = useMemo(() => sampleData, []);

  /**
   * Default column definition for consistent behavior
   */
  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true,
    flex: 0
  }), []);

  /**
   * Handles grid ready event to set up auto-sizing
   * 
   * This function calculates the optimal width for the description column
   * based on the longest non-Product category text.
   */
  const onGridReady = useCallback((params: GridReadyEvent) => {
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
      measurementElement.style.visibility = 'hidden';
      measurementElement.style.whiteSpace = 'nowrap';
      measurementElement.textContent = longestDescription;
      
      // Copy styling from actual grid cells for accurate measurement
      const existingGridCell = document.querySelector('.ag-cell') as HTMLElement;
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
      const finalWidth = Math.min(measuredWidth + 40, 600);
      
      params.api.setColumnWidths([{
        key: 'description',
        newWidth: finalWidth
      }]);
    }, 300);
  }, []);

  return (
    <div className="ag-grid-container ag-theme-alpine">
      <AgGridReact<RowData>
        columnDefs={columnDefs}
        rowData={rowData}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        rowSelection={{
          mode: 'singleRow',
          enableClickSelection: true
        }}
        animateRows={true}
        theme="legacy"
        tooltipShowDelay={500}
        tooltipHideDelay={0}
        tooltipMouseTrack={false}
      />
    </div>
  );
};

export default GridComponent;