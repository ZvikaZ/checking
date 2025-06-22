import { createGrid, GridOptions, ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

interface RowData {
  category: string;
  description: string;
}

const rowData: RowData[] = [
  { category: 'Product', description: 'This is a comprehensive product description that includes detailed specifications, features, benefits, and technical information. The text is intentionally long to demonstrate how the grid handles extensive content that spans multiple lines and requires proper text wrapping or truncation for optimal display.' },
  { category: 'Service', description: 'Quick service' },
  { category: 'Support', description: 'Brief help' },
  { category: 'Product', description: 'Another detailed product overview that contains extensive information about functionality, use cases, implementation details, and comprehensive documentation. This lengthy description showcases how different content lengths are managed within the grid interface.' },
  { category: 'Service', description: 'Fast delivery' },
  { category: 'Support', description: 'Online chat' },
  { category: 'Product', description: 'Complete product specification document that outlines all technical requirements, compatibility information, installation procedures, troubleshooting guides, and detailed usage instructions for optimal performance and user experience.' },
  { category: 'Service', description: 'Premium support' },
  { category: 'Support', description: 'FAQ section' },
  { category: 'Product', description: 'Comprehensive product manual containing step-by-step instructions, safety guidelines, maintenance procedures, warranty information, and detailed explanations of all features and capabilities available to users.' }
];

const columnDefs = [
  { field: 'category' },
  { field: 'description' }
];

const gridOptions: GridOptions = {
  columnDefs: columnDefs,
  rowData: rowData,
  theme: 'legacy'
};

const gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
createGrid(gridDiv, gridOptions);