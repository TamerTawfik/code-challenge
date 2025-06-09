/**
 * Application Constants
 * 
 * Centralized configuration values for the skip hire application.
 * These values can be easily modified without changing component code.
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://app.wewantwaste.co.uk',
  ENDPOINTS: {
    SKIPS_BY_LOCATION: '/api/skips/by-location',
  },
  HEADERS: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
} as const;

// Default Location Settings
export const DEFAULT_LOCATION = {
  POSTCODE: 'NR32',
  AREA: 'Lowestoft',
} as const;

// UI Configuration
export const UI_CONFIG = {
  // Number of skeleton cards to show while loading
  SKELETON_CARDS_COUNT: 8,
  
  // Responsive breakpoints for skip cards grid
  GRID_BREAKPOINTS: {
    MOBILE: 'grid-cols-1',
    TABLET: 'md:grid-cols-2',
    DESKTOP: 'lg:grid-cols-3',
    LARGE_DESKTOP: 'xl:grid-cols-4',
  },
  
  // Animation durations (in milliseconds)
  ANIMATIONS: {
    CARD_TRANSITION: 300,
    PROGRESS_LINE: 500,
    HOVER_SCALE: 200,
  },
} as const;

// Business Rules
export const BUSINESS_RULES = {
  // VAT calculation
  VAT_CALCULATION: {
    MULTIPLIER: 100,
    DECIMAL_PLACES: 2,
  },
  
  // Skip filtering
  SKIP_FILTERS: {
    EXCLUDE_FORBIDDEN: true,
    SORT_BY_SIZE: true,
  },
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Unable to connect to the server. Please check your internet connection.',
  NO_SKIPS_AVAILABLE: 'No skips available for this location.',
  GENERIC_ERROR: 'An unexpected error occurred. Please try again.',
  RETRY_SUGGESTION: 'Please check your internet connection and try again.',
} as const;

// Accessibility Labels
export const ARIA_LABELS = {
  SKIP_SIZE: (size: number) => `Skip size: ${size} yards`,
  SKIP_SELECTED: (size: number) => `${size} yard skip selected`,
  SELECT_SKIP: (size: number) => `Select ${size} yard skip`,
  TOTAL_PRICE: (price: string) => `Total price: £${price}`,
  WARNING_PERMIT_REQUIRED: 'Warning: Permit required',
  RETRY_LOADING: 'Retry loading skips',
  RETRYING_LOADING: 'Retrying to load skips',
} as const; 