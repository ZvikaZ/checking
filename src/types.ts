/**
 * Type definitions for the AG-Grid application
 * 
 * This file contains all TypeScript interfaces and types used throughout the application.
 * Centralizing types here improves maintainability and ensures type consistency.
 */

/**
 * Represents a single row of data in the grid
 * 
 * @interface RowData
 * @property {string} category - The category classification (Product, Service, Support)
 * @property {string} description - Detailed description text that may be truncated in the UI
 * @property {string} badge - Icon identifier used to display contextual SVG icons
 */
export interface RowData {
  category: string;
  description: string;
  badge: string;
}

/**
 * Available icon types for the badge system
 * Each icon corresponds to a specific SVG graphic
 */
export type IconType = 
  | 'star'      // Featured/premium items
  | 'check'     // Completed/verified items
  | 'alert'     // Urgent/warning items
  | 'settings'  // Configuration items
  | 'truck'     // Delivery/shipping items
  | 'message'   // Communication items
  | 'document'  // Documentation items
  | 'crown'     // VIP/premium items
  | 'help'      // Support/help items
  | 'book'      // Manual/guide items
  | 'lightning' // Fast/express items
  | 'phone'     // Phone support items
  | 'tool'      // Installation/setup items
  | 'mail'      // Email support items
  | 'wrench'    // Maintenance items
  | 'video'     // Video/tutorial items
  | 'user'      // Individual user items
  | 'users';    // Community/group items

/**
 * Category types available in the application
 */
export type CategoryType = 'Product' | 'Service' | 'Support';