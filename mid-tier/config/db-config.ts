/**
 * Database Configuration
 * 
 * This file contains configuration values that will be migrated to DynamoDB.
 * These are frequently changing values that benefit from runtime updates
 * without requiring application redeployment.
 * 
 * Migration Priority:
 * - Phase 1 (High Priority): statistics, economicIndicators, financialRates
 * - Phase 2 (Medium Priority): quotes, company contact info
 * - Phase 3 (Low Priority): socialMedia, marketDefaults
 * 
 * Note: Tax slabs and constants remain in static config due to
 * legal/regulatory requirements and infrequent changes.
 */

import {
  Statistics,
  FinancialRates,
  EconomicIndicator,
  Quote,
  CompanyInfo,
  SocialMedia,
  MarketDefaults,
  InvestmentProducts
} from './app-config.js';

/**
 * Database configuration interface
 * Contains all data that should eventually live in DynamoDB
 */
export interface DbConfig {
  statistics: Statistics;
  financialRates: FinancialRates;
  economicIndicators: EconomicIndicator[];
  quotes: Quote[];
  company: CompanyInfo;
  socialMedia: SocialMedia;
  marketDefaults: MarketDefaults;
  investmentProducts: InvestmentProducts;
}

/**
 * Default database configuration values
 * These serve as fallback when database is unavailable
 */
export const defaultDbConfig: DbConfig = {
  statistics: {
    activeUsers: 25000,
    activeUsersLabel: '25,000+ investors',
    totalCalculations: 150000,
    wealthCreated: '₹2.4Cr+',
    averageReturns: '+18.2%',
    happyUsers: '25K+',
    toolsAvailable: 8
  },

  financialRates: {
    ppf: {
      currentRate: 7.1,
      rateLabel: '7.1% p.a.',
      lockInYears: 15,
      maxAnnualInvestment: 150000,
      taxBenefit: 'EEE (Exempt-Exempt-Exempt)',
      extensionYears: 5
    },
    nps: {
      expectedReturn: 10,
      taxBenefit: 50000,
      additionalBenefit: 150000
    },
    nifty50: {
      cagr20Years: 12.6,
      cagrLabel: 'NIFTY 50 CAGR (20 years)'
    },
    realEstate: {
      appreciationMin: 8,
      appreciationMax: 10,
      registrationCost: '7-8%'
    },
    sip: {
      defaultReturnRate: 12,
      conservativeReturn: 8,
      moderateReturn: 12,
      aggressiveReturn: 15
    },
    homeLoan: {
      averageInterestRate: 8.5,
      maxTenure: 30
    }
  },

  economicIndicators: [
    {
      label: 'GDP Growth',
      value: '7.2%',
      trend: 'up',
      icon: 'trending_up',
      color: 'primary',
      description: 'Quarterly GDP growth rate'
    },
    {
      label: 'Inflation Rate',
      value: '5.4%',
      trend: 'down',
      icon: 'trending_down',
      color: 'accent',
      description: 'Consumer Price Index'
    },
    {
      label: 'Repo Rate',
      value: '6.5%',
      trend: 'stable',
      icon: 'account_balance',
      color: 'warn',
      description: 'RBI policy rate'
    },
    {
      label: 'USD/INR',
      value: '₹83.42',
      trend: 'up',
      icon: 'currency_exchange',
      color: 'primary',
      description: 'Exchange rate'
    },
    {
      label: 'Gold Price',
      value: '₹62,450',
      trend: 'up',
      icon: 'diamond',
      color: 'accent',
      description: 'Per 10 grams'
    },
    {
      label: 'FD Interest',
      value: '7.0%',
      trend: 'stable',
      icon: 'savings',
      color: 'warn',
      description: 'Average bank FD rate'
    }
  ],

  quotes: [
    {
      text: 'Risk comes from not knowing what you are doing.',
      author: 'Warren Buffett',
      designation: 'CEO, Berkshire Hathaway',
      imageUrl: '/assets/images/warren_buffet.png',
      category: 'Investment'
    },
    {
      text: 'The stock market is a device for transferring money from the impatient to the patient.',
      author: 'Warren Buffett',
      designation: 'CEO, Berkshire Hathaway',
      imageUrl: '/assets/images/warren_buffet.png',
      category: 'Investment'
    },
    {
      text: 'In investing, what is comfortable is rarely profitable.',
      author: 'Robert Arnott',
      designation: 'Founder, Research Affiliates',
      imageUrl: '/assets/images/robert_arnott.png',
      category: 'Investment'
    },
    {
      text: 'The individual investor should act consistently as an investor and not as a speculator.',
      author: 'Ben Graham',
      designation: 'Father of Value Investing',
      imageUrl: '/assets/images/ben_graham.png',
      category: 'Investment'
    }
  ],

  company: {
    name: 'AMKRTech',
    website: 'https://amkrtech.com',
    domain: 'amkrtech.com',
    email: 'contact@amkrtech.com',
    phone: '+91-XXXXXXXXXX',
    address: 'India',
    establishedYear: 2024,
    tagline: 'Empowering Financial Decisions',
    description: 'Professional financial planning tools backed by real-time data and expert insights.'
  },

  socialMedia: {
    linkedin: 'https://www.linkedin.com/company/amkrtech',
    twitter: 'https://twitter.com/amkrtech',
    facebook: 'https://www.facebook.com/amkrtech',
    instagram: 'https://www.instagram.com/amkrtech',
    youtube: 'https://www.youtube.com/@amkrtech'
  },

  marketDefaults: {
    indices: [
      { name: 'NIFTY 50', fallbackValue: 22453.30, fallbackChange: 1.2, description: 'National Stock Exchange' },
      { name: 'SENSEX', fallbackValue: 74119.39, fallbackChange: 0.8, description: 'Bombay Stock Exchange' },
      { name: 'NIFTY BANK', fallbackValue: 48234.65, fallbackChange: -0.26, description: 'Banking Sector Index' },
      { name: 'NIFTY IT', fallbackValue: 35812.50, fallbackChange: 1.26, description: 'Information Technology' },
      { name: 'NIFTY NEXT 50', fallbackValue: 68345.80, fallbackChange: 0.46, description: 'Next 50 Companies' },
      { name: 'NIFTY MIDCAP', fallbackValue: 52678.90, fallbackChange: 0.36, description: 'Mid Cap Companies' }
    ],
    currencies: [
      { pair: 'USD/INR', description: 'US Dollar', fallbackRate: '₹83.42' },
      { pair: 'EUR/INR', description: 'Euro', fallbackRate: '₹90.87' },
      { pair: 'GBP/INR', description: 'British Pound', fallbackRate: '₹106.34' },
      { pair: 'JPY/INR', description: 'Japanese Yen', fallbackRate: '₹0.56' }
    ],
    commodities: [
      { name: 'Gold', unit: 'per 10g', fallbackPrice: '₹62,450' },
      { name: 'Silver', unit: 'per kg', fallbackPrice: '₹74,230' },
      { name: 'Crude Oil', unit: 'per barrel', fallbackPrice: '$82.45' },
      { name: 'Natural Gas', unit: 'per MMBtu', fallbackPrice: '$2.87' }
    ],
    pollingIntervals: {
      marketOpen: 60000,
      marketClosed: 300000
    }
  },

  investmentProducts: {
    gratuity: {
      minServiceYears: 5,
      gratuityCap: 2000000,
      daysInYearCovered: 26,
      daysInYearUncovered: 30
    }
  }
};

/**
 * DynamoDB table structure for reference
 * 
 * Table Name: amkrtech-app-config
 * Primary Key: PK (Partition Key), SK (Sort Key)
 * 
 * Example Items:
 * 
 * 1. Statistics:
 *    PK: "CONFIG#statistics"
 *    SK: "current"
 *    value: { activeUsers: 25000, ... }
 *    updatedAt: "2025-12-01T10:30:00Z"
 *    version: "v1"
 * 
 * 2. Financial Rates:
 *    PK: "CONFIG#financial-rates"
 *    SK: "ppf#2025-12-01"
 *    value: { currentRate: 7.1, ... }
 *    effectiveFrom: "2025-04-01"
 *    effectiveTo: "2026-03-31"
 * 
 * 3. Economic Indicators:
 *    PK: "CONFIG#economic-indicators"
 *    SK: "2025-12-01T10:00:00Z"
 *    value: [{ label: "GDP Growth", ... }]
 *    isActive: true
 * 
 * GSI1: ConfigType-UpdatedAt-index
 *   GSI1PK: configType (e.g., "statistics")
 *   GSI1SK: updatedAt (timestamp for sorting)
 */

export default defaultDbConfig;
