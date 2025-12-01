/**
 * Code Configuration
 * 
 * This file contains configuration values that should remain in code.
 * These values rarely change and have legal/regulatory implications,
 * or are truly constant application settings.
 * 
 * Contents:
 * - Tax Slabs (Annual updates, regulatory compliance required)
 * - Tax Deduction Limits (Governed by Income Tax Act)
 * - Application Constants (Currency, country settings)
 * - SEO Configuration (Changes with major releases)
 */

import { TaxSlabs, SEOConfig, Constants } from './app-config.js';

/**
 * Code configuration interface
 * Contains data that should remain in codebase
 */
export interface CodeConfig {
  taxSlabs: TaxSlabs;
  seo: SEOConfig;
  constants: Constants;
}

/**
 * Indian Income Tax Configuration
 * Updated annually based on Union Budget
 * Last Updated: Budget 2025-26
 */
export const defaultCodeConfig: CodeConfig = {
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

export default defaultCodeConfig;
