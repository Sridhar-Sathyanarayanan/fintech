/**
 * Application Configuration - Main Entry Point
 * 
 * This file combines code and database configurations.
 * 
 * Architecture:
 * - code-config.ts: Values that remain in code (tax slabs, constants, SEO)
 * - db-config.ts: Values to be migrated to DynamoDB (rates, statistics, quotes)
 * 
 * Usage:
 * - Import `defaultConfig` for complete application configuration
 * - Use getConfig() for path-based access
 * - Future: Replace dynamic values with database calls
 */

import { defaultCodeConfig } from './code-config.js';
import { defaultDbConfig } from './db-config.js';

export interface AppConfig {
  company: CompanyInfo;
  statistics: Statistics;
  financialRates: FinancialRates;
  taxSlabs: TaxSlabs;
  marketDefaults: MarketDefaults;
  investmentProducts: InvestmentProducts;
  quotes: Quote[];
  economicIndicators: EconomicIndicator[];
  socialMedia: SocialMedia;
  seo: SEOConfig;
  constants: Constants;
}

export interface CompanyInfo {
  name: string;
  website: string;
  domain: string;
  email: string;
  phone: string;
  address: string;
  establishedYear: number;
  tagline: string;
  description: string;
}

export interface Statistics {
  activeUsers: number;
  activeUsersLabel: string;
  totalCalculations: number;
  wealthCreated: string;
  averageReturns: string;
  happyUsers: string;
  toolsAvailable: number;
}

export interface FinancialRates {
  ppf: {
    currentRate: number;
    rateLabel: string;
    lockInYears: number;
    maxAnnualInvestment: number;
    taxBenefit: string;
    extensionYears: number;
  };
  nps: {
    expectedReturn: number;
    taxBenefit: number;
    additionalBenefit: number;
  };
  nifty50: {
    cagr20Years: number;
    cagrLabel: string;
  };
  realEstate: {
    appreciationMin: number;
    appreciationMax: number;
    registrationCost: string;
  };
  sip: {
    defaultReturnRate: number;
    conservativeReturn: number;
    moderateReturn: number;
    aggressiveReturn: number;
  };
  homeLoan: {
    averageInterestRate: number;
    maxTenure: number;
  };
}

export interface TaxSlabs {
  years: {
    [key: string]: {
      old: TaxSlab[];
      new: TaxSlab[];
    };
  };
  standardDeduction: {
    [key: string]: number;
  };
  section80C: {
    limit: number;
  };
  section80D: {
    self: number;
    parents: number;
    seniorCitizen: number;
  };
  npsTaxBenefit: {
    section80CCD1B: number;
  };
  maxTaxSavings: {
    total: string;
    breakdown: {
      section80C: number;
      section80D: number;
      nps: number;
    };
  };
}

export interface TaxSlab {
  upTo: number;
  rate: number;
  label: string;
}

export interface MarketDefaults {
  indices: {
    name: string;
    fallbackValue: number;
    fallbackChange: number;
    description: string;
  }[];
  currencies: {
    pair: string;
    description: string;
    fallbackRate: string;
  }[];
  commodities: {
    name: string;
    unit: string;
    fallbackPrice: string;
  }[];
  pollingIntervals: {
    marketOpen: number;
    marketClosed: number;
  };
}

export interface InvestmentProducts {
  gratuity: {
    minServiceYears: number;
    gratuityCap: number;
    daysInYearCovered: number;
    daysInYearUncovered: number;
  };
}

export interface Quote {
  text: string;
  author: string;
  designation: string;
  imageUrl: string;
  category?: string;
}

export interface EconomicIndicator {
  label: string;
  value: string;
  trend: 'up' | 'down' | 'stable';
  icon: string;
  color: string;
  description: string;
}

export interface SocialMedia {
  linkedin: string;
  twitter: string;
  facebook: string;
  instagram?: string;
  youtube?: string;
}

export interface SEOConfig {
  defaultTitle: string;
  defaultDescription: string;
  defaultKeywords: string[];
  ogImageDefault: string;
  twitterImageDefault: string;
  twitterHandle: string;
}

export interface Constants {
  currency: string;
  currencySymbol: string;
  country: string;
  countryCode: string;
  financialYearFormat: string;
}

/**
 * Complete Application Configuration
 * Merges static and dynamic configurations
 */
export const defaultConfig: AppConfig = {
  // Database configuration (to be migrated to DynamoDB)
  company: defaultDbConfig.company,
  statistics: defaultDbConfig.statistics,
  financialRates: defaultDbConfig.financialRates,
  marketDefaults: defaultDbConfig.marketDefaults,
  investmentProducts: defaultDbConfig.investmentProducts,
  quotes: defaultDbConfig.quotes,
  economicIndicators: defaultDbConfig.economicIndicators,
  socialMedia: defaultDbConfig.socialMedia,
  
  // Code configuration (remains in code)
  taxSlabs: defaultCodeConfig.taxSlabs,
  seo: defaultCodeConfig.seo,
  constants: defaultCodeConfig.constants
};

/**
 * Get configuration value by path
 * Example: getConfig('financialRates.ppf.currentRate') returns 7.1
 */
export function getConfig(path: string, config: AppConfig = defaultConfig): any {
  return path.split('.').reduce((obj, key) => obj?.[key], config as any);
}

/**
 * Update configuration value by path
 * Example: setConfig('statistics.activeUsers', 30000)
 */
export function setConfig(path: string, value: any, config: AppConfig = defaultConfig): void {
  const keys = path.split('.');
  const lastKey = keys.pop()!;
  const target = keys.reduce((obj, key) => obj[key], config as any);
  target[lastKey] = value;
}

export default defaultConfig;
