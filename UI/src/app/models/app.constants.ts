/**
 * Application-wide constants and configuration values
 * Centralized location for all constant values used across the application
 */

// ==================== MARKET DATA CONSTANTS ====================

export const MARKET_CONSTANTS = {
  IST_OFFSET_MINUTES: 330, // IST is UTC+5:30
  MARKET_OPEN_TIME_MINUTES: 555, // 9:15 AM in minutes
  MARKET_CLOSE_TIME_MINUTES: 930, // 3:30 PM in minutes
  WEEKDAY_START: 1, // Monday
  WEEKDAY_END: 5, // Friday
  WEEKEND_SATURDAY: 6,
  WEEKEND_SUNDAY: 0,
} as const;

export const MARKET_INDEX_MAP = {
  'NIFTY 50': 'NIFTY 50',
  'NIFTY BANK': 'BANK NIFTY',
  'INDIA VIX': 'INDIA VIX',
  'NIFTY IT': 'NIFTY IT',
} as const;

export const FALLBACK_MARKET_DATA = [
  { name: 'NIFTY 50', value: '22,453.30', change: '+1.2%', isPositive: true, icon: 'trending_up' },
  { name: 'SENSEX', value: '74,119.39', change: '+0.8%', isPositive: true, icon: 'trending_up' },
  { name: 'BANK NIFTY', value: '48,567.25', change: '-0.3%', isPositive: false, icon: 'trending_down' },
  { name: 'NIFTY IT', value: '35,234.80', change: '+2.1%', isPositive: true, icon: 'trending_up' },
] as const;

// ==================== GRATUITY CALCULATOR CONSTANTS ====================

export const GRATUITY_CONSTANTS = {
  MIN_SERVICE_YEARS: 5,
  GRATUITY_CAP: 2000000, // 20 lakhs
  DAYS_IN_YEAR_COVERED: 26, // For organizations covered under the Act
  DAYS_IN_YEAR_UNCOVERED: 30, // For organizations not covered under the Act
  DEFAULT_LAST_SALARY: 50000,
  DEFAULT_SERVICE_YEARS: 5,
  DEFAULT_SERVICE_MONTHS: 0,
  MIN_YEARS: 0,
  MAX_YEARS: 50,
  MIN_MONTHS: 0,
  MAX_MONTHS: 11,
} as const;

// ==================== TAX CALCULATOR CONSTANTS ====================

export const TAX_CONSTANTS = {
  STANDARD_DEDUCTION: 50000,
  REBATE_AMOUNT_2025_26: 75000,
  REBATE_LIMIT_2025_26: 700000,
  REBATE_AMOUNT_DEFAULT: 50000,
  REBATE_LIMIT_DEFAULT: 500000,
  DEFAULT_ASSESSMENT_YEAR: '2025-26',
} as const;

// ==================== PRIVACY POLICY CONSTANTS ====================

export const PRIVACY_CONSTANTS = {
  LAST_UPDATED: 'December 1, 2025',
  DATA_RETENTION_YEARS: '7-10 years',
  RESPONSE_TIME_DAYS: 30,
} as const;

// ==================== UI SCROLL CONSTANTS ====================

export const UI_CONSTANTS = {
  SCROLL_OFFSET: 100, // Offset for smooth scrolling to sections
  SCROLL_THRESHOLD: 50, // Threshold for showing scroll indicator
  SCROLL_TOP_THRESHOLD: 300, // Threshold for showing scroll-to-top button
} as const;

// ==================== VALIDATION CONSTANTS ====================

export const VALIDATION_CONSTANTS = {
  MIN_SALARY: 0,
  MAX_SALARY: 100000000, // 10 crore
  MIN_INVESTMENT: 0,
  MAX_INVESTMENT: 100000000,
  MIN_INTEREST_RATE: 0,
  MAX_INTEREST_RATE: 50,
  MIN_YEARS: 0,
  MAX_YEARS: 50,
} as const;

// ==================== CHART CONFIGURATION CONSTANTS ====================

export const CHART_CONSTANTS = {
  FONT_SIZE_SMALL: 10,
  FONT_SIZE_MEDIUM: 12,
  FONT_SIZE_LARGE: 14,
  FONT_WEIGHT_NORMAL: '400',
  FONT_WEIGHT_BOLD: '600',
  BORDER_RADIUS: 8,
  BAR_THICKNESS: 40,
  PADDING_SMALL: 10,
  PADDING_MEDIUM: 15,
  PADDING_LARGE: 20,
} as const;

// ==================== COLOR CONSTANTS ====================

export const COLOR_CONSTANTS = {
  PRIMARY: '#667eea',
  SECONDARY: '#f093fb',
  ACCENT: '#f55763',
  SUCCESS: '#4caf50',
  WARNING: '#ff9800',
  ERROR: '#f44336',
  INFO: '#2196f3',
  POSITIVE_GREEN: '#4caf50',
  NEGATIVE_RED: '#f44336',
  CHART_BLUE: '#3f51b5',
  CHART_PURPLE: '#9c27b0',
  CHART_GRADIENT_START: 'rgba(102, 126, 234, 0.8)',
  CHART_GRADIENT_END: 'rgba(240, 147, 251, 0.8)',
} as const;

// ==================== API CONSTANTS ====================

export const API_CONSTANTS = {
  REQUEST_TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
} as const;

// ==================== ANIMATION CONSTANTS ====================

export const ANIMATION_CONSTANTS = {
  DURATION_FAST: 200, // milliseconds
  DURATION_NORMAL: 300,
  DURATION_SLOW: 500,
  EASING_CUBIC: 'cubic-bezier(0.4, 0, 0.2, 1)',
  EASING_EASE_OUT: 'ease-out',
} as const;

// ==================== BREAKPOINT CONSTANTS ====================

export const BREAKPOINT_CONSTANTS = {
  MOBILE_MAX: 599,
  TABLET_MIN: 600,
  TABLET_MAX: 959,
  DESKTOP_MIN: 960,
  LARGE_DESKTOP_MIN: 1280,
} as const;

// ==================== FORMAT CONSTANTS ====================

export const FORMAT_CONSTANTS = {
  CURRENCY_LOCALE: 'en-IN',
  CURRENCY_CODE: 'INR',
  DATE_FORMAT: 'DD/MM/YYYY',
  FINANCIAL_YEAR_FORMAT: 'YYYY-YYYY',
  DECIMAL_PLACES_CURRENCY: 2,
  DECIMAL_PLACES_PERCENTAGE: 2,
} as const;

// ==================== SOCIAL MEDIA CONSTANTS ====================

export const SOCIAL_MEDIA_URLS = {
  LINKEDIN: 'https://www.linkedin.com/company/amkrtech',
  TWITTER: 'https://twitter.com/amkrtech',
  FACEBOOK: 'https://www.facebook.com/amkrtech',
  INSTAGRAM: 'https://www.instagram.com/amkrtech',
} as const;

// ==================== EXTERNAL LINKS CONSTANTS ====================

export const EXTERNAL_LINKS = {
  AWS_PRIVACY: 'https://aws.amazon.com/compliance/data-privacy-faq/',
  NSE_WEBSITE: 'https://www.nseindia.com',
  INCOME_TAX_INDIA: 'https://www.incometax.gov.in',
} as const;

// ==================== ERROR MESSAGES ====================

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error occurred. Please check your connection.',
  API_ERROR: 'Failed to fetch data from server.',
  VALIDATION_ERROR: 'Please check your input values.',
  GENERIC_ERROR: 'An error occurred. Please try again.',
  MARKET_DATA_ERROR: 'Failed to fetch market data, using fallback data.',
} as const;

// ==================== SUCCESS MESSAGES ====================

export const SUCCESS_MESSAGES = {
  CALCULATION_SUCCESS: 'Calculation completed successfully.',
  FORM_SUBMIT_SUCCESS: 'Form submitted successfully.',
  DATA_SAVED: 'Data saved successfully.',
} as const;

// Type exports for better type safety
export type MarketIndexName = keyof typeof MARKET_INDEX_MAP;
export type SocialMediaPlatform = keyof typeof SOCIAL_MEDIA_URLS;
export type ExternalLinkType = keyof typeof EXTERNAL_LINKS;
export type ErrorMessageType = keyof typeof ERROR_MESSAGES;
export type SuccessMessageType = keyof typeof SUCCESS_MESSAGES;
