/**
 * Custom tooltip component for AG-Grid React
 * 
 * This component provides a width-limited tooltip that displays the full text
 * content of grid cells. It's implemented as a React functional component
 * for use with AG-Grid React.
 */

import React from 'react';

/**
 * Props interface for the custom tooltip component
 */
interface CustomTooltipProps {
  value?: string;
  // Add other AG-Grid tooltip props as needed
  [key: string]: any;
}

/**
 * Custom tooltip React component
 * 
 * Features:
 * - Width-limited tooltips (max 300px via CSS)
 * - Word wrapping for long text
 * - Styled with dark theme for contrast
 * - Proper padding and typography
 * 
 * @param props - Props provided by AG-Grid React containing the cell value and other metadata
 * @returns JSX element representing the tooltip
 */
export const CustomTooltip: React.FC<CustomTooltipProps> = ({ value, ...props }) => {
  return (
    <div className="custom-tooltip">
      {value || ''}
    </div>
  );
};

export default CustomTooltip;