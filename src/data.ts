/**
 * Sample data for the AG-Grid application
 * 
 * This file contains the mock data used to populate the grid. The data is structured
 * to demonstrate various text lengths, categories, and icon types for testing
 * different UI scenarios including text truncation and tooltip functionality.
 */

import type { RowData, CategoryType, IconType } from './types';

/**
 * Sample dataset with 18 rows covering different categories and text lengths
 * 
 * The data is intentionally varied to test:
 * - Text truncation with very long descriptions (Product category)
 * - Short text that doesn't need truncation (Service/Support categories)
 * - Different icon types for visual variety
 * - Mix of categories for filtering demonstrations
 */
export const sampleData: RowData[] = [
  {
    category: 'Product' as CategoryType,
    description: 'This is a comprehensive product description that includes detailed specifications, features, benefits, and technical information. The text is intentionally long to demonstrate how the grid handles extensive content that spans multiple lines and requires proper text wrapping or truncation for optimal display.',
    badge: 'star' as IconType
  },
  {
    category: 'Service' as CategoryType,
    description: 'Quick service',
    badge: 'check' as IconType
  },
  {
    category: 'Support' as CategoryType,
    description: 'Brief help',
    badge: 'alert' as IconType
  },
  {
    category: 'Product' as CategoryType,
    description: 'Another detailed product overview that contains extensive information about functionality, use cases, implementation details, and comprehensive documentation. This lengthy description showcases how different content lengths are managed within the grid interface.',
    badge: 'settings' as IconType
  },
  {
    category: 'Service' as CategoryType,
    description: 'Fast delivery',
    badge: 'truck' as IconType
  },
  {
    category: 'Support' as CategoryType,
    description: 'Online chat',
    badge: 'message' as IconType
  },
  {
    category: 'Product' as CategoryType,
    description: 'Complete product specification document that outlines all technical requirements, compatibility information, installation procedures, troubleshooting guides, and detailed usage instructions for optimal performance and user experience.',
    badge: 'document' as IconType
  },
  {
    category: 'Service' as CategoryType,
    description: 'Premium support',
    badge: 'crown' as IconType
  },
  {
    category: 'Support' as CategoryType,
    description: 'FAQ section',
    badge: 'help' as IconType
  },
  {
    category: 'Product' as CategoryType,
    description: 'Comprehensive product manual containing step-by-step instructions, safety guidelines, maintenance procedures, warranty information, and detailed explanations of all features and capabilities available to users.',
    badge: 'book' as IconType
  },
  {
    category: 'Service' as CategoryType,
    description: 'Express shipping',
    badge: 'lightning' as IconType
  },
  {
    category: 'Support' as CategoryType,
    description: 'Phone assistance',
    badge: 'phone' as IconType
  },
  {
    category: 'Service' as CategoryType,
    description: 'Installation service',
    badge: 'tool' as IconType
  },
  {
    category: 'Support' as CategoryType,
    description: 'Email support',
    badge: 'mail' as IconType
  },
  {
    category: 'Service' as CategoryType,
    description: 'Maintenance package',
    badge: 'wrench' as IconType
  },
  {
    category: 'Support' as CategoryType,
    description: 'Video tutorials',
    badge: 'video' as IconType
  },
  {
    category: 'Service' as CategoryType,
    description: 'Custom consultation',
    badge: 'user' as IconType
  },
  {
    category: 'Support' as CategoryType,
    description: 'Community forum',
    badge: 'users' as IconType
  }
];

/**
 * Utility function to get data filtered by category
 * 
 * @param category - The category to filter by
 * @returns Array of RowData objects matching the specified category
 */
export const getDataByCategory = (category: CategoryType): RowData[] => {
  return sampleData.filter(row => row.category === category);
};

/**
 * Utility function to get non-Product category data
 * This is useful for column auto-sizing based on shorter text content
 * 
 * @returns Array of RowData objects excluding Product category
 */
export const getNonProductData = (): RowData[] => {
  return sampleData.filter(row => row.category !== 'Product');
};