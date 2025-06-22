import { createGrid, GridOptions, ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

interface RowData {
  category: string;
  description: string;
  badge: string;
}

const rowData: RowData[] = [
  { category: 'Product', description: 'This is a comprehensive product description that includes detailed specifications, features, benefits, and technical information. The text is intentionally long to demonstrate how the grid handles extensive content that spans multiple lines and requires proper text wrapping or truncation for optimal display.', badge: 'star' },
  { category: 'Service', description: 'Quick service', badge: 'check' },
  { category: 'Support', description: 'Brief help', badge: 'alert' },
  { category: 'Product', description: 'Another detailed product overview that contains extensive information about functionality, use cases, implementation details, and comprehensive documentation. This lengthy description showcases how different content lengths are managed within the grid interface.', badge: 'settings' },
  { category: 'Service', description: 'Fast delivery', badge: 'truck' },
  { category: 'Support', description: 'Online chat', badge: 'message' },
  { category: 'Product', description: 'Complete product specification document that outlines all technical requirements, compatibility information, installation procedures, troubleshooting guides, and detailed usage instructions for optimal performance and user experience.', badge: 'document' },
  { category: 'Service', description: 'Premium support', badge: 'crown' },
  { category: 'Support', description: 'FAQ section', badge: 'help' },
  { category: 'Product', description: 'Comprehensive product manual containing step-by-step instructions, safety guidelines, maintenance procedures, warranty information, and detailed explanations of all features and capabilities available to users.', badge: 'book' },
  { category: 'Service', description: 'Express shipping', badge: 'lightning' },
  { category: 'Support', description: 'Phone assistance', badge: 'phone' },
  { category: 'Service', description: 'Installation service', badge: 'tool' },
  { category: 'Support', description: 'Email support', badge: 'mail' },
  { category: 'Service', description: 'Maintenance package', badge: 'wrench' },
  { category: 'Support', description: 'Video tutorials', badge: 'video' },
  { category: 'Service', description: 'Custom consultation', badge: 'user' },
  { category: 'Support', description: 'Community forum', badge: 'users' }
];

const getIconSvg = (iconName: string): string => {
  const icons: { [key: string]: string } = {
    star: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
    check: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',
    alert: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>',
    settings: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/></svg>',
    truck: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20,8h-3V4H3C1.9,4,1,4.9,1,6v11h2c0,1.66,1.34,3,3,3s3-1.34,3-3h6c0,1.66,1.34,3,3,3s3-1.34,3-3h2v-5L20,8z M6,18.5 c-0.83,0-1.5-0.67-1.5-1.5s0.67-1.5,1.5-1.5s1.5,0.67,1.5,1.5S6.83,18.5,6,18.5z M18,18.5c-0.83,0-1.5-0.67-1.5-1.5 s0.67-1.5,1.5-1.5s1.5,0.67,1.5,1.5S18.83,18.5,18,18.5z M17,12V9.5h2.5L21,12H17z"/></svg>',
    message: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>',
    document: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/></svg>',
    crown: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm2.7-2h8.6l.9-5.4-2.1 1.7L12 8l-3.1 2.3-2.1-1.7L7.7 14z"/></svg>',
    help: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2ZM13,19H11V17H13V19ZM15.07,11.25L14.17,12.17C13.45,12.9 13,13.5 13,15H11V14.5C11,13.4 11.45,12.4 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.9 13.1,7 12,7C10.9,7 10,7.9 10,9H8C8,6.79 9.79,5 12,5C14.21,5 16,6.79 16,9C16,9.88 15.64,10.68 15.07,11.25Z"/></svg>',
    book: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V4A2,2 0 0,0 18,2ZM18,20H6V4H18V20Z"/></svg>',
    lightning: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M11,21H9L13,2H15L11,21Z"/></svg>',
    phone: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/></svg>',
    tool: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.7,19L13.6,9.9C14.5,7.6 14,4.9 12.1,3C10.1,1 7.1,0.6 4.7,1.7L9,6L6,9L1.6,4.7C0.4,7.1 0.9,10.1 2.9,12.1C4.8,14 7.5,14.5 9.8,13.6L18.9,22.7C19.3,23.1 19.9,23.1 20.3,22.7L22.6,20.4C23.1,20 23.1,19.3 22.7,19Z"/></svg>',
    mail: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/></svg>',
    wrench: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.7,19L13.6,9.9C14.5,7.6 14,4.9 12.1,3C10.1,1 7.1,0.6 4.7,1.7L9,6L6,9L1.6,4.7C0.4,7.1 0.9,10.1 2.9,12.1C4.8,14 7.5,14.5 9.8,13.6L18.9,22.7C19.3,23.1 19.9,23.1 20.3,22.7L22.6,20.4C23.1,20 23.1,19.3 22.7,19Z"/></svg>',
    video: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5Z"/></svg>',
    user: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/></svg>',
    users: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16,4C18.21,4 20,5.79 20,8C20,10.21 18.21,12 16,12C13.79,12 12,10.21 12,8C12,5.79 13.79,4 16,4M16,14C18.67,14 24,15.34 24,18V20H8V18C8,15.34 13.33,14 16,14M8.5,4C10.71,4 12.5,5.79 12.5,8C12.5,10.21 10.71,12 8.5,12C6.29,12 4.5,10.21 4.5,8C4.5,5.79 6.29,4 8.5,4M8.5,14C11.17,14 16.5,15.34 16.5,18V20H0.5V18C0.5,15.34 5.83,14 8.5,14Z"/></svg>'
  };
  return icons[iconName] || icons.help;
};

class CustomTooltip {
  eGui!: HTMLElement;

  init(params: any) {
    this.eGui = document.createElement('div');
    this.eGui.className = 'custom-tooltip';
    this.eGui.textContent = params.value;
  }

  getGui() {
    return this.eGui;
  }
}

const columnDefs = [
  { field: 'category' },
  { 
    field: 'description',
    width: 300,
    cellRenderer: (params: any) => {
      const iconSvg = getIconSvg(params.data.badge);
      return `
        <div class="description-cell">
          <span class="description-text">${params.value}</span>
          <span class="icon">${iconSvg}</span>
        </div>
      `;
    },
    tooltipField: 'description',
    tooltipComponent: CustomTooltip
  }
];

const gridOptions: GridOptions = {
  columnDefs: columnDefs,
  rowData: rowData,
  theme: 'legacy',
  onGridReady: (params) => {
    setTimeout(() => {
      // Find longest description among non-Product rows
      const nonProductDescriptions = rowData
        .filter(row => row.category !== 'Product')
        .map(row => row.description);
      
      const longestDesc = nonProductDescriptions
        .reduce((longest, current) => current.length > longest.length ? current : longest, '');
      
      // Create temporary element to measure width with actual grid styling
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.visibility = 'hidden';
      tempDiv.style.whiteSpace = 'nowrap';
      tempDiv.textContent = longestDesc;
      
      // Copy grid cell styling
      const gridElement = document.querySelector('#myGrid .ag-cell') as HTMLElement;
      if (gridElement) {
        const computedStyle = window.getComputedStyle(gridElement);
        tempDiv.style.font = computedStyle.font;
        tempDiv.style.padding = computedStyle.padding;
      }
      
      document.body.appendChild(tempDiv);
      const measuredWidth = tempDiv.offsetWidth;
      document.body.removeChild(tempDiv);
      
      // Apply calculated width
      params.api.setColumnWidths([{
        key: 'description',
        newWidth: Math.min(measuredWidth + 40, 600) // Add padding, cap at 600px
      }]);
    }, 300);
  }
};

const gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
createGrid(gridDiv, gridOptions);