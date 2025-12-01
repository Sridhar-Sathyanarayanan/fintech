/**
 * Environment Configuration
 * Centralized environment variable management with validation and type safety
 */

import dotenv from 'dotenv';

// Load .env file
dotenv.config();

/**
 * Environment types
 */
export enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test'
}

/**
 * Server Configuration
 */
export interface ServerConfig {
  nodeEnv: Environment;
  port: number;
  corsOrigin: string | string[];
}

/**
 * SMTP Email Configuration
 */
export interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  password: string;
  from: string;
}

/**
 * NSE Market API Configuration
 */
export interface NseConfig {
  baseUrl: string;
  apiTimeout: number;
  cacheDuration: number;
}

/**
 * Market Hours Configuration
 */
export interface MarketHoursConfig {
  openTimeMinutes: number;
  closeTimeMinutes: number;
  istOffsetMinutes: number;
}

/**
 * External API Configuration
 */
export interface ExternalApisConfig {
  exchangeRateApiKey?: string;
}

/**
 * Complete Environment Configuration Interface
 */
export interface EnvironmentConfig {
  server: ServerConfig;
  smtp: SmtpConfig;
  nse: NseConfig;
  marketHours: MarketHoursConfig;
  externalApis: ExternalApisConfig;
}

/**
 * Get optional environment variable
 */
function getEnv(key: string, defaultValue: string): string {
  return process.env[key] || defaultValue;
}

/**
 * Get environment variable as integer
 */
function getEnvAsInt(key: string, defaultValue: number): number {
  const value = process.env[key];
  return value ? parseInt(value, 10) : defaultValue;
}

/**
 * Get environment variable as boolean
 */
function getEnvAsBoolean(key: string, defaultValue: boolean): boolean {
  const value = process.env[key];
  if (value === undefined) return defaultValue;
  return value.toLowerCase() === 'true';
}

/**
 * Parse CORS origins (comma-separated string or single value)
 */
function parseCorsOrigin(origin: string): string | string[] {
  if (origin.includes(',')) {
    return origin.split(',').map(o => o.trim());
  }
  return origin;
}

/**
 * Validate environment
 */
function validateEnvironment(env: string): Environment {
  const validEnvs = Object.values(Environment);
  if (validEnvs.includes(env as Environment)) {
    return env as Environment;
  }
  console.warn(`Invalid NODE_ENV: ${env}. Defaulting to development.`);
  return Environment.DEVELOPMENT;
}

/**
 * Build and export the environment configuration
 */
export const environmentConfig: EnvironmentConfig = {
  server: {
    nodeEnv: validateEnvironment(getEnv('NODE_ENV', Environment.DEVELOPMENT)),
    port: getEnvAsInt('PORT', process.env.PORT ? parseInt(process.env.PORT, 10) : 8080),
    corsOrigin: parseCorsOrigin(getEnv('CORS_ORIGIN', 'http://localhost:4200'))
  },

  smtp: {
    host: getEnv('SMTP_HOST', 'smtpout.secureserver.net'),
    port: getEnvAsInt('SMTP_PORT', 465),
    secure: getEnvAsBoolean('SMTP_SECURE', true),
    user: getEnv('SMTP_USER', 'support@amkrtech.com'),
    password: getEnv('SMTP_PASS', ''),
    from: getEnv('SMTP_FROM', 'support@amkrtech.com')
  },

  nse: {
    baseUrl: getEnv('NSE_BASE_URL', 'https://www.nseindia.com'),
    apiTimeout: getEnvAsInt('NSE_API_TIMEOUT', 10000),
    cacheDuration: getEnvAsInt('MARKET_CACHE_DURATION', 60000)
  },

  marketHours: {
    openTimeMinutes: getEnvAsInt('MARKET_OPEN_TIME', 555), // 9:15 AM
    closeTimeMinutes: getEnvAsInt('MARKET_CLOSE_TIME', 930), // 3:30 PM
    istOffsetMinutes: 330 // IST is UTC+5:30
  },

  externalApis: {
    exchangeRateApiKey: process.env.EXCHANGE_RATE_API_KEY
  }
};

/**
 * Helper functions to access configuration
 */
export const isProduction = (): boolean => 
  environmentConfig.server.nodeEnv === Environment.PRODUCTION;

export const isDevelopment = (): boolean => 
  environmentConfig.server.nodeEnv === Environment.DEVELOPMENT;

export const isTest = (): boolean => 
  environmentConfig.server.nodeEnv === Environment.TEST;

/**
 * Log configuration on startup (hide sensitive data in production)
 */
export function logConfig(): void {
  if (isDevelopment()) {
    console.log('=== Environment Configuration ===');
    console.log(`Environment: ${environmentConfig.server.nodeEnv}`);
    console.log(`Port: ${environmentConfig.server.port}`);
    console.log(`CORS Origin: ${environmentConfig.server.corsOrigin}`);
    console.log(`NSE Base URL: ${environmentConfig.nse.baseUrl}`);
    console.log(`Cache Duration: ${environmentConfig.nse.cacheDuration}ms`);
    console.log('=================================');
  } else {
    console.log(`Server running in ${environmentConfig.server.nodeEnv} mode on port ${environmentConfig.server.port}`);
  }
}

export default environmentConfig;
