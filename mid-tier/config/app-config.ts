/**
 * Application Configuration
 * 
 * This file contains all varying/configurable values that should be
 * externalized and eventually fetched from a database.
 * 
 * Categories:
 * - Company/Brand Information
 * - Statistics & Metrics
 * - Financial Rates & Returns
 * - Tax Slabs & Regulations
 * - Market Data (Fallback/Default values)
 * - Investment Product Details
 * - Quotes & Testimonials
 * - Social Media & Contact Information
 * - SEO & Marketing Content
 */

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

// Default Configuration
export const defaultConfig: AppConfig = {
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

  taxSlabs: {
    years: {
      '2025-2026': {
        old: [
          { upTo: 250000, rate: 0, label: 'Up to ₹2.5L' },
          { upTo: 500000, rate: 5, label: '₹2.5L - ₹5L' },
          { upTo: 1000000, rate: 20, label: '₹5L - ₹10L' },
          { upTo: Infinity, rate: 30, label: 'Above ₹10L' }
        ],
        new: [
          { upTo: 400000, rate: 0, label: 'Up to ₹4L' },
          { upTo: 800000, rate: 5, label: '₹4L - ₹8L' },
          { upTo: 1000000, rate: 10, label: '₹8L - ₹10L' },
          { upTo: 1200000, rate: 15, label: '₹10L - ₹12L' },
          { upTo: 1500000, rate: 20, label: '₹12L - ₹15L' },
          { upTo: Infinity, rate: 30, label: 'Above ₹15L' }
        ]
      },
      '2024-2025': {
        old: [
          { upTo: 250000, rate: 0, label: 'Up to ₹2.5L' },
          { upTo: 500000, rate: 5, label: '₹2.5L - ₹5L' },
          { upTo: 1000000, rate: 20, label: '₹5L - ₹10L' },
          { upTo: Infinity, rate: 30, label: 'Above ₹10L' }
        ],
        new: [
          { upTo: 300000, rate: 0, label: 'Up to ₹3L' },
          { upTo: 600000, rate: 5, label: '₹3L - ₹6L' },
          { upTo: 900000, rate: 10, label: '₹6L - ₹9L' },
          { upTo: 1200000, rate: 15, label: '₹9L - ₹12L' },
          { upTo: 1500000, rate: 20, label: '₹12L - ₹15L' },
          { upTo: Infinity, rate: 30, label: 'Above ₹15L' }
        ]
      }
    },
    standardDeduction: {
      '2025-2026': 75000,
      '2024-2025': 50000
    },
    section80C: {
      limit: 150000
    },
    section80D: {
      self: 25000,
      parents: 25000,
      seniorCitizen: 50000
    },
    npsTaxBenefit: {
      section80CCD1B: 50000
    },
    maxTaxSavings: {
      total: '₹1.95L',
      breakdown: {
        section80C: 150000,
        section80D: 100000,
        nps: 50000
      }
    }
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
  },

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

  socialMedia: {
    linkedin: 'https://www.linkedin.com/company/amkrtech',
    twitter: 'https://twitter.com/amkrtech',
    facebook: 'https://www.facebook.com/amkrtech',
    instagram: 'https://www.instagram.com/amkrtech',
    youtube: 'https://www.youtube.com/@amkrtech'
  },

  seo: {
    defaultTitle: 'Income Tax Calculator 2025 | Free Tax Regime Comparison | AMKRTech',
    defaultDescription: 'Calculate your income tax for FY 2025-26 using AMKRTech\'s free online calculator. Compare old vs new regimes with accurate deductions, instant results & personalized recommendations.',
    defaultKeywords: [
      'income tax calculator',
      'tax calculator 2025',
      'old vs new regime',
      'tax regime calculator',
      'income tax calculator india',
      'tax slab 2025',
      'SIP calculator',
      'PPF calculator',
      'home loan calculator',
      'HRA calculator',
      'NPS calculator',
      'gratuity calculator'
    ],
    ogImageDefault: '/assets/images/og-tax-calculator.jpg',
    twitterImageDefault: '/assets/images/twitter-tax-card.jpg',
    twitterHandle: '@amkrtech'
  },

  constants: {
    currency: 'INR',
    currencySymbol: '₹',
    country: 'India',
    countryCode: 'IN',
    financialYearFormat: 'YYYY-YYYY'
  }
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
