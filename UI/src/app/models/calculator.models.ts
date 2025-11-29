/**
 * Shared calculator models and interfaces
 */

// Tax Calculator Models
export interface TaxBreakdown {
  slab: string;
  rate: string;
  amount: number;
}

export interface ChartData {
  label: string;
  value: number;
  color: string;
}

// Investment Calculator Models
export interface YearlyBreakdown {
  year: number;
  invested?: number;
  value: number;
  gain?: number;
  openingBalance?: number;
  emiPaid?: number;
  principal?: number;
  interest?: number;
  closingBalance?: number;
  opening?: number;
  deposit?: number;
}

// Home Loan specific
export interface YearlyLoanBreakdown {
  year: number;
  openingBalance: number;
  emiPaid: number;
  principal: number;
  interest: number;
  closingBalance: number;
}

// PPF Calculator
export interface PPFYearlyBreakdown {
  year: number;
  opening: number;
  deposit: number;
  interest: number;
  closing: number;
}

export type FrequencyType = 'yearly' | 'halfyearly' | 'quarterly' | 'monthly';

// FAQ Models
export interface FAQItem {
  question: string;
  answer: string;
  expanded?: boolean;
  icon?: string;
}

// Contact Models
export interface ContactInfo {
  icon: string;
  title: string;
  value: string;
  link?: string;
}

export interface SocialLink {
  icon: string;
  name: string;
  url: string;
  color: string;
}

export interface HRAExample {
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface TaxTip {
  title: string;
  description: string;
  icon: string;
}

// HRA Calculation
export interface HRACalculation {
  actualHRA: number;
  rentPaid: number;
  tenPercentBasic: number;
  excessRent: number;
  fiftyPercentBasic: number;
  fortyPercentBasic: number;
  exemptHRA: number;
  taxableHRA: number;
  cityType: string;
}

// Navigation
export interface NavItem {
  label: string;
  route?: string;
  icon: string;
  children?: NavItem[];
}
