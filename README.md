# AG-Grid TypeScript Demo

A comprehensive demonstration of AG-Grid Community Edition with TypeScript, featuring custom cell renderers, tooltips, and modular architecture.

## Features

### 🎯 Core Functionality
- **AG-Grid Integration**: Complete setup with AG-Grid Community Edition
- **TypeScript Support**: Full type safety with comprehensive type definitions
- **Custom Cell Renderers**: Text with contextual SVG icons and ellipsis truncation
- **Smart Tooltips**: Width-limited tooltips that display full content on hover
- **Column Auto-sizing**: Intelligent width calculation based on non-Product category content

### 🎨 UI/UX Features
- **Text Truncation**: Long descriptions are truncated with ellipsis while keeping icons visible
- **Contextual Icons**: 18 different SVG icons representing different content types
- **Responsive Layout**: Flexbox-based cell layout that adapts to content
- **Hover Interactions**: Rich tooltips with proper timing and positioning

### 🏗️ Architecture
- **Modular Design**: Clean separation of concerns across multiple files
- **Type Safety**: Comprehensive TypeScript interfaces and type definitions
- **Utility Functions**: Reusable icon and data management utilities
- **Configuration-driven**: Centralized grid configuration for easy maintenance

## Project Structure

```
src/
├── main.ts                    # Application entry point
├── types.ts                   # TypeScript type definitions
├── data.ts                    # Sample data and data utilities
├── components/
│   └── CustomTooltip.ts       # Custom tooltip component
├── config/
│   └── gridConfig.ts          # Grid configuration and column definitions
└── utils/
    └── icons.ts               # SVG icon definitions and utilities
```

## File Descriptions

### `src/main.ts`
The main application entry point that:
- Initializes AG-Grid modules
- Sets up the grid instance
- Handles DOM ready state
- Provides error handling for grid initialization

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

### `src/components/CustomTooltip.ts`
Custom tooltip component that:
- Implements AG-Grid's tooltip interface
- Provides width-limited display (300px max)
- Includes proper word wrapping and styling

### `src/config/gridConfig.ts`
Centralized grid configuration containing:
- Column definitions with custom renderers
- Grid options and behavior settings
- Auto-sizing logic for optimal column widths
- Event handlers and performance settings

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

### Text Truncation with Icons
The description column uses a sophisticated layout system:

```typescript
// Flexbox layout ensures icon visibility even with text overflow
<div class="description-cell">
  <span class="description-text">${text}</span>  <!-- flex: 1, truncates -->
  <span class="icon">${iconSvg}</span>           <!-- flex-shrink: 0, always visible -->
</div>
```

### Smart Column Auto-sizing
Column width is calculated based on non-Product category content to prevent extremely wide columns:

```typescript
// Filter out long Product descriptions
const nonProductData = data.filter(row => row.category !== 'Product');
// Calculate optimal width based on shorter content
const optimalWidth = measureTextWidth(longestNonProductText);
```

### Type-Safe Icon System
Icons are managed through a comprehensive type system:

```typescript
type IconType = 'star' | 'check' | 'alert' | ... // 18 total icons
const getIconSvg = (iconName: IconType): string => { ... }
```

## Browser Compatibility

- **Modern Browsers**: Chrome 88+, Firefox 84+, Safari 14+, Edge 88+
- **Mobile**: iOS Safari 14+, Chrome Mobile 88+
- **Development**: Tested primarily on Chrome with Vite dev server

## Customization

### Adding New Icons
1. Add new icon type to `IconType` in `src/types.ts`
2. Add SVG definition to `iconDefinitions` in `src/utils/icons.ts`
3. Use the new icon in your data

### Modifying Grid Behavior
- Update `src/config/gridConfig.ts` for column definitions and grid options
- Modify `src/data.ts` to change sample data structure
- Adjust CSS in `index.html` for styling changes

### Extending Tooltip Functionality
- Modify `src/components/CustomTooltip.ts` to add new tooltip behaviors
- Update CSS classes for different tooltip styles
- Add conditional logic for context-specific tooltips

## Development Notes

### WSL Compatibility
For Windows users running WSL, the dev server includes `--host` flag for cross-platform access:
```json
"scripts": {
  "dev": "vite --host"
}
```

### Performance Considerations
- Icons are inline SVGs for optimal performance
- Column auto-sizing uses efficient DOM measurement techniques
- Tooltip rendering is optimized with AG-Grid's component lifecycle

### Code Style
- Comprehensive JSDoc comments throughout codebase
- Consistent TypeScript typing with strict mode enabled
- Modular architecture for maintainability and testing

## License

This project is a demonstration/educational example. Feel free to use it as a starting point for your own AG-Grid applications.