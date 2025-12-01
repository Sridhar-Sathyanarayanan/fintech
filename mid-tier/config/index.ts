/**
 * Configuration Module Index
 * Central export point for all configuration modules
 */

// Environment configuration
export {
  environmentConfig,
  Environment,
  isProduction,
  isDevelopment,
  isTest,
  logConfig,
  type ServerConfig,
  type SmtpConfig,
  type NseConfig,
  type MarketHoursConfig,
  type ExternalApisConfig,
  type EnvironmentConfig
} from './environment.config.js';

// API Constants
export {
  NSE_CONSTANTS,
  NSE_HEADERS,
  MARKET_HOURS,
  EXTERNAL_APIS,
  VOLUME_CONSTANTS,
  HTTP_STATUS,
  CORS_ORIGINS,
  RATE_LIMIT,
  EMAIL_CONFIG,
  LOG_LEVELS,
  getCorsOrigins,
  formatVolume,
  type LogLevel,
  type HttpStatusCode
} from './api-constants.js';

// Application configuration
export {
  defaultConfig,
  getConfig,
  setConfig,
  type AppConfig,
  type CompanyInfo,
  type Statistics,
  type FinancialRates,
  type TaxSlabs,
  type TaxSlab,
  type MarketDefaults,
  type InvestmentProducts,
  type Quote,
  type EconomicIndicator,
  type SocialMedia,
  type SEOConfig,
  type Constants
} from './app-config.js';

// Database configuration (for DynamoDB migration)
export {
  defaultDbConfig,
  type DbConfig
} from './db-config.js';

// Code configuration (remains in code)
export {
  defaultCodeConfig,
  type CodeConfig
} from './code-config.js';

// Note: Default export removed to avoid circular dependencies
// Import modules directly as needed:
// import { environmentConfig } from './config/index.js';
// import { defaultConfig } from './config/index.js';
