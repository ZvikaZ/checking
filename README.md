# AG-Grid React TypeScript Demo

A comprehensive demonstration of AG-Grid with React and TypeScript, featuring custom cell renderers, tooltips, and modular architecture.

## Features

### 🎯 Core Functionality
- **AG-Grid React Integration**: Complete setup with AG-Grid Community Edition and React wrapper
- **TypeScript Support**: Full type safety with comprehensive type definitions
- **Custom Cell Renderers**: React components for text with contextual SVG icons and ellipsis truncation
- **Smart Tooltips**: Width-limited React tooltip components that display full content on hover
- **Column Auto-sizing**: Intelligent width calculation based on non-Product category content

### 🎨 UI/UX Features
- **Text Truncation**: Long descriptions are truncated with ellipsis while keeping icons visible
- **Contextual Icons**: 18 different SVG icons representing different content types
- **Responsive Layout**: Flexbox-based cell layout that adapts to content
- **Hover Interactions**: Rich React tooltips with proper timing and positioning

### 🏗️ Architecture
- **React Components**: Modern functional components with hooks and TypeScript
- **Modular Design**: Clean separation of concerns across multiple files
- **Type Safety**: Comprehensive TypeScript interfaces and type definitions
- **Configuration-driven**: Centralized grid configuration within React components

## Project Structure

```
src/
├── main.tsx                   # React application entry point
├── App.tsx                    # Root React component
├── types.ts                   # TypeScript type definitions
├── data.ts                    # Sample data and data utilities
├── components/
│   ├── GridComponent.tsx      # Main AG-Grid React component
│   └── CustomTooltip.tsx      # Custom React tooltip component
└── utils/
    └── icons.ts               # SVG icon definitions and utilities
```

## File Descriptions

### `src/main.tsx`
The React application entry point that:
- Creates React root using React 18+ createRoot API
- Initializes the React application
- Handles DOM ready state
- Provides error handling for React initialization

### `src/App.tsx`
The root React component that:
- Provides the overall application layout
- Renders the main heading
- Contains the GridComponent

### `src/components/GridComponent.tsx`
The main AG-Grid React component that:
- Wraps AgGridReact with custom configuration
- Implements React hooks for performance optimization
- Contains the custom cell renderer for description column
- Handles grid ready events and auto-sizing logic
- Manages column definitions and grid options

### `src/components/CustomTooltip.tsx`
React functional component for custom tooltips that:
- Implements AG-Grid React tooltip interface
- Provides width-limited display (300px max via CSS)
- Uses React patterns for component lifecycle

### `src/types.ts`
Comprehensive type definitions including:
- `RowData` interface for grid row structure
- `IconType` union type for available icons
- `CategoryType` for data categorization

### `src/data.ts`
Sample data management with:
- 18 varied data rows for testing different scenarios
- Utility functions for data filtering
- Mix of short and long text content for truncation testing

### `src/utils/icons.ts`
Icon management system featuring:
- 18 contextual SVG icons with semantic meanings
- Type-safe icon retrieval functions
- Utility functions for icon validation and listing

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   Navigate to `http://localhost:5173` (or the URL shown in terminal)

### Available Scripts

- `npm run dev` - Start Vite development server with hot reload
- `npm run build` - Build for production using Vite
- `npm run preview` - Preview production build locally

## Technical Implementation

### React Text Truncation with Icons
The description column uses a React functional component with sophisticated layout:

```tsx
const DescriptionCellRenderer: React.FC<ICellRendererParams<RowData>> = ({ value, data }) => {
  const iconSvg = getIconSvg(data?.badge || 'help');
  
  return (
    <div className="description-cell">
      <span className="description-text">{value}</span>  {/* flex: 1, truncates */}
      <span 
        className="icon" 
        dangerouslySetInnerHTML={{ __html: iconSvg }}    /* flex-shrink: 0, always visible */
      />
    </div>
  );
};
```

**CSS Implementation:**
```css
.description-cell {
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
}

.description-text {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 8px;
}

.icon {
  flex-shrink: 0;
  color: #666;
  display: inline-flex;
  align-items: center;
}
```

### React Smart Column Auto-sizing
Column width is calculated using React useCallback hook based on non-Product category content:

```tsx
const onGridReady = useCallback((params: GridReadyEvent) => {
  // Filter out long Product descriptions
  const nonProductData = getNonProductData();
  // Calculate optimal width based on shorter content
  const optimalWidth = measureTextWidth(longestNonProductText);
  // Apply width with React's API integration
}, []);
```

### React Tooltip System
Tooltips are implemented as React functional components:

```tsx
export const CustomTooltip: React.FC<CustomTooltipProps> = ({ value }) => {
  return (
    <div className="custom-tooltip">
      {value || ''}
    </div>
  );
};
```

**Integration with AG-Grid React:**
```tsx
{
  field: 'description',
  tooltipField: 'description',
  tooltipComponent: CustomTooltip,  // React component reference
  cellRenderer: DescriptionCellRenderer
}
```

### Type-Safe Icon System
Icons are managed through a comprehensive type system with React integration:

```typescript
type IconType = 'star' | 'check' | 'alert' | ... // 18 total icons
const getIconSvg = (iconName: IconType): string => { ... }
```

## React Patterns Used

### Hooks and Performance Optimization
- **useMemo**: Column definitions and row data are memoized
- **useCallback**: Event handlers are memoized to prevent unnecessary re-renders
- **React.FC**: Proper typing for functional components

### Component Architecture
- **Functional Components**: Modern React patterns throughout
- **Props Interfaces**: TypeScript interfaces for all component props
- **Component Composition**: Clean separation between App, Grid, and Tooltip components

### AG-Grid React Integration
- **AgGridReact**: Uses the official React wrapper component
- **React Cell Renderers**: Custom components that integrate with AG-Grid's rendering system
- **React Tooltips**: Custom tooltip components using React patterns

## Browser Compatibility

- **Modern Browsers**: Chrome 88+, Firefox 84+, Safari 14+, Edge 88+
- **Mobile**: iOS Safari 14+, Chrome Mobile 88+
- **Development**: Tested with React 19 and Vite dev server

## Customization

### Adding New Icons
1. Add new icon type to `IconType` in `src/types.ts`
2. Add SVG definition to `iconDefinitions` in `src/utils/icons.ts`
3. Use the new icon in your data

### Modifying Grid Behavior
- Update `src/components/GridComponent.tsx` for column definitions and grid options
- Modify `src/data.ts` to change sample data structure
- Adjust CSS in `index.html` for styling changes

### Extending Tooltip Functionality
- Modify `src/components/CustomTooltip.tsx` to add new React tooltip behaviors
- Update props interface for additional tooltip data
- Add conditional logic for context-specific tooltips

## Development Notes

### WSL Compatibility
For Windows users running WSL, the dev server includes `--host` flag for cross-platform access:
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  server: {
    host: true // Enable access from WSL to Windows
  }
})
```

### Performance Considerations
- Icons are inline SVGs for optimal performance
- Column auto-sizing uses efficient DOM measurement techniques
- React components are optimized with proper memoization
- AG-Grid styles are imported once in the main grid component

### Code Style
- Comprehensive JSDoc comments throughout codebase
- Consistent TypeScript typing with strict mode enabled
- React functional components with hooks
- Modular architecture for maintainability and testing

## License

This project is a demonstration/educational example. Feel free to use it as a starting point for your own React AG-Grid applications.