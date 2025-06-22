/**
 * Custom tooltip component for AG-Grid
 * 
 * This component provides a width-limited tooltip that displays the full text
 * content of grid cells. It implements AG-Grid's ITooltipComp interface
 * to integrate seamlessly with the grid's tooltip system.
 */

/**
 * Custom tooltip component class that implements AG-Grid's tooltip interface
 * 
 * Features:
 * - Width-limited tooltips (max 300px)
 * - Word wrapping for long text
 * - Styled with dark theme for contrast
 * - Proper padding and typography
 * 
 * @class CustomTooltip
 * @implements {ITooltipComp} (AG-Grid interface)
 */
export class CustomTooltip {
  /**
   * The DOM element that represents the tooltip
   * This is the root element that will be inserted into the DOM
   */
  private eGui!: HTMLElement;

  /**
   * Initializes the tooltip component with the provided parameters
   * 
   * This method is called by AG-Grid when the tooltip needs to be displayed.
   * It creates the DOM structure and sets the content based on the cell value.
   * 
   * @param params - Parameters provided by AG-Grid containing:
   *   - value: The cell value to display in the tooltip
   *   - location: Where the tooltip should be positioned
   *   - api: Reference to the grid API
   *   - columnApi: Reference to the column API
   *   - context: Grid context object
   *   - colDef: Column definition
   *   - column: Column instance
   *   - rowIndex: Index of the row
   *   - node: Row node data
   *   - data: The full row data object
   */
  init(params: any): void {
    // Create the root tooltip element
    this.eGui = document.createElement('div');
    
    // Apply CSS class for styling (defined in index.html)
    this.eGui.className = 'custom-tooltip';
    
    // Set the tooltip content to the cell value
    // Using textContent for security (prevents XSS from malicious data)
    this.eGui.textContent = params.value || '';
    
    // Optional: Add additional styling or content based on parameters
    // For example, you could add different styles based on the column:
    // if (params.colDef.field === 'description') {
    //   this.eGui.style.maxWidth = '400px';
    // }
  }

  /**
   * Returns the DOM element for the tooltip
   * 
   * This method is called by AG-Grid to get the DOM element that should
   * be inserted into the page when showing the tooltip.
   * 
   * @returns The HTMLElement representing the tooltip
   */
  getGui(): HTMLElement {
    return this.eGui;
  }

  /**
   * Optional cleanup method called when the tooltip is hidden
   * 
   * Use this method to perform any necessary cleanup, such as:
   * - Removing event listeners
   * - Clearing timers
   * - Releasing resources
   * 
   * Since our tooltip is simple and doesn't have persistent resources,
   * this method is not strictly necessary but included for completeness.
   */
  destroy?(): void {
    // No cleanup needed for this simple implementation
    // But you could add cleanup logic here if needed:
    // this.eGui.removeEventListener('click', this.handleClick);
  }
}