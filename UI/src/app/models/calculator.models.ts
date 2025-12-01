/**
 * Calculator-specific Models
 * 
 * Contains interface definitions for all financial calculators
 * Including Tax, Investment, HRA, Gratuity, PPF, Home Loan, SIP, NPS
 */

// ==================== TAX CALCULATOR MODELS ====================
export interface TaxBreakdown {
  slab: string;
  rate: string;
  amount: number;
}

// ==================== INVESTMENT CALCULATOR MODELS ====================

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

// ==================== HOME LOAN MODELS ====================

export interface YearlyLoanBreakdown {
  year: number;
  openingBalance: number;
  emiPaid: number;
  principal: number;
  interest: number;
  closingBalance: number;
}

// ==================== PPF CALCULATOR MODELS ====================

export interface PPFYearlyBreakdown {
  year: number;
  opening: number;
  deposit: number;
  interest: number;
  closing: number;
}

export type FrequencyType = 'yearly' | 'halfyearly' | 'quarterly' | 'monthly';

// ==================== HRA CALCULATOR MODELS ====================

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

// ==================== GRATUITY CALCULATOR MODELS ====================

export interface GratuityResult {
  gratuityAmount: number;
  yearsOfService: number;
  monthsOfService: number;
  totalService: string;
  lastDrawnSalary: number;
  organizationType: string;
  isEligible: boolean;
  formula: string;
}
