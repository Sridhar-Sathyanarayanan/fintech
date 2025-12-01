/**
 * Backend API Constants
 * Centralized location for all API-related constants
 * Uses environment configuration for dynamic values
 */

import { environmentConfig } from './environment.config.js';

// ==================== NSE API CONSTANTS ====================

export const NSE_CONSTANTS = {
  BASE_URL: environmentConfig.nse.baseUrl,
  get INDICES_URL() { return `${this.BASE_URL}/api/allIndices`; },
  get STOCK_GAINERS_URL() { return `${this.BASE_URL}/api/live-analysis-variations?index=gainers`; },
  get STOCK_LOSERS_URL() { return `${this.BASE_URL}/api/live-analysis-variations?index=losers`; },
  get ACTIVE_STOCKS_URL() { return `${this.BASE_URL}/api/live-analysis-volume-gainers`; },
  get ADVANCE_DECLINE_URL() { return `${this.BASE_URL}/api/market-data-pre-open?key=ALL`; },
  API_TIMEOUT: environmentConfig.nse.apiTimeout,
  CACHE_DURATION: environmentConfig.nse.cacheDuration,
} as const;

export const NSE_HEADERS = {
  'Accept': 'application/json, text/plain, */*',
  'Accept-Language': 'en-US,en;q=0.9',
  'Accept-Encoding': 'gzip, deflate, br',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Referer': 'https://www.nseindia.com/',
  'Origin': 'https://www.nseindia.com',
  'Connection': 'keep-alive',
  'Cache-Control': 'no-cache',
  'Pragma': 'no-cache',
} as const;

// ==================== MARKET HOURS CONSTANTS ====================

export const MARKET_HOURS = {
  OPEN_TIME_MINUTES: environmentConfig.marketHours.openTimeMinutes,
  CLOSE_TIME_MINUTES: environmentConfig.marketHours.closeTimeMinutes,
  IST_OFFSET_MINUTES: environmentConfig.marketHours.istOffsetMinutes,
  WEEKDAY_START: 1, // Monday
  WEEKDAY_END: 5, // Friday
  OPEN_TIME_LABEL: '09:15 AM IST',
  CLOSE_TIME_LABEL: '03:30 PM IST',
  DAYS_LABEL: 'Monday - Friday',
} as const;

// ==================== EXTERNAL API CONSTANTS ====================

export const EXTERNAL_APIS = {
  EXCHANGE_RATE_URL: 'https://api.exchangerate-api.com/v4/latest/INR',
  EXCHANGE_RATE_API_KEY: environmentConfig.externalApis.exchangeRateApiKey,
} as const;

// ==================== VOLUME FORMATTING CONSTANTS ====================

export const VOLUME_CONSTANTS = {
  CRORE_THRESHOLD: 10000000,
  LAKH_THRESHOLD: 100000,
  THOUSAND_THRESHOLD: 1000,
  CRORE_DIVISOR: 10000000,
  LAKH_DIVISOR: 100000,
  THOUSAND_DIVISOR: 1000,
  CRORE_LABEL: 'Cr',
  LAKH_LABEL: 'L',
  THOUSAND_LABEL: 'K',
} as const;

/**
 * Helper function to format volume numbers
 */
export function formatVolume(volume: number): string {
  if (volume >= VOLUME_CONSTANTS.CRORE_THRESHOLD) {
    return `${(volume / VOLUME_CONSTANTS.CRORE_DIVISOR).toFixed(1)}${VOLUME_CONSTANTS.CRORE_LABEL}`;
  } else if (volume >= VOLUME_CONSTANTS.LAKH_THRESHOLD) {
    return `${(volume / VOLUME_CONSTANTS.LAKH_DIVISOR).toFixed(1)}${VOLUME_CONSTANTS.LAKH_LABEL}`;
  }
  return `${(volume / VOLUME_CONSTANTS.THOUSAND_DIVISOR).toFixed(1)}${VOLUME_CONSTANTS.THOUSAND_LABEL}`;
}

// ==================== HTTP STATUS CODES ====================

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

// ==================== CORS CONFIGURATION ====================

/**
 * Get CORS origins from environment config
 */
export function getCorsOrigins(): string | string[] {
  return environmentConfig.server.corsOrigin;
}

export const CORS_ORIGINS = [
  'http://localhost:4200',
  'http://localhost:3010',
  'https://amkrtech.com',
  'https://www.amkrtech.com',
  'https://api.amkrtech.com',
] as const;

// ==================== RATE LIMITING ====================

export const RATE_LIMIT = {
  WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  MAX_REQUESTS: 100, // limit each IP to 100 requests per windowMs
} as const;

// ==================== EMAIL CONFIGURATION ====================

export const EMAIL_CONFIG = {
  get FROM_ADDRESS() { return environmentConfig.smtp.from; },
  get SMTP_HOST() { return environmentConfig.smtp.host; },
  get SMTP_PORT() { return environmentConfig.smtp.port; },
  get SMTP_SECURE() { return environmentConfig.smtp.secure; },
  get SMTP_USER() { return environmentConfig.smtp.user; },
  get SMTP_PASSWORD() { return environmentConfig.smtp.password; },
  SUPPORT_ADDRESS: 'support@amkrtech.com',
  CONTACT_ADDRESS: 'contact@amkrtech.com',
  MAX_ATTACHMENT_SIZE: 5 * 1024 * 1024, // 5MB
} as const;

// ==================== LOGGING CONSTANTS ====================

export const LOG_LEVELS = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug',
} as const;

// Type exports
export type LogLevel = typeof LOG_LEVELS[keyof typeof LOG_LEVELS];
export type HttpStatusCode = typeof HTTP_STATUS[keyof typeof HTTP_STATUS];
