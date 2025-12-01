/**
 * Market Data Models
 * 
 * Contains interface definitions for market-related data
 * Including indices, stocks, sectors, currencies, and commodities
 */

// ==================== MARKET INDEX MODELS ====================

export interface MarketIndex {
  name: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: string;
  description?: string;
  changePercent?: string;
  timestamp?: string;
}

// ==================== STOCK MODELS ====================

export interface Stock {
  symbol: string;
  name: string;
  price: string;
  change: string;
  volume?: string;
}

// ==================== MARKET STATISTICS MODELS ====================

export interface MarketStats {
  advances: number;
  declines: number;
  unchanged: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  marketCap: string;
}

export interface MarketStat {
  label: string;
  value: string;
  description: string;
  icon: string;
  color: string;
}

// ==================== SECTOR MODELS ====================

export interface Sector {
  name: string;
  index: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon?: string;
}

// ==================== CURRENCY MODELS ====================

export interface Currency {
  pair: string;
  description: string;
  rate: string;
  change: string;
  isPositive: boolean;
}

// ==================== COMMODITY MODELS ====================

export interface Commodity {
  name: string;
  unit: string;
  price: string;
  change: string;
  isPositive: boolean;
}

// ==================== MARKET INSIGHTS MODELS ====================

export interface MarketInsight {
  title: string;
  content: string;
  category: string;
  icon: string;
  author: string;
  date: string;
}

// ==================== API RESPONSE MODELS ====================

export interface NSEIndexResponse {
  success: boolean;
  data?: Array<{
    index: string;
    last: number;
    variation: number;
    percentChange: number;
  }>;
  error?: string;
  message?: string;
  timestamp?: string;
}

export interface StockMoversResponse {
  success: boolean;
  data?: {
    topGainers: Stock[];
    topLosers: Stock[];
    mostActive: Stock[];
  };
  error?: string;
  message?: string;
  timestamp?: string;
}
