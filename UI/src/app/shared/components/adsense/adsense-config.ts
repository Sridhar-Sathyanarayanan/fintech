/**
 * Google AdSense Configuration
 * 
 * Centralized configuration for all AdSense ad units.
 * Update these values after creating ad units in your AdSense account.
 */

export interface AdUnit {
  name: string;
  slotId: string;
  format?: string;
  width?: number;
  height?: number;
  responsive?: boolean;
}

export class AdsenseConfig {
  /** 
   * Your AdSense Publisher ID
   * Replace with your actual publisher ID from Google AdSense
   * Format: ca-pub-XXXXXXXXXXXXXXXX
   */
  static readonly PUBLISHER_ID = 'ca-pub-XXXXXXXXXXXXXXXX'; // TODO: Replace with actual ID

  /**
   * Ad Unit Definitions
   * Create these ad units in your AdSense account and update the slot IDs
   */
  static readonly AD_UNITS: { [key: string]: AdUnit } = {
    // Homepage Ads
    HOME_TOP_BANNER: {
      name: 'Home Top Banner',
      slotId: '1234567890', // TODO: Replace with actual slot ID
      format: 'auto',
      responsive: true
    },
    
    HOME_SIDEBAR: {
      name: 'Home Sidebar',
      slotId: '1234567891', // TODO: Replace with actual slot ID
      format: 'auto',
      responsive: true
    },
    
    // Calculator Ads
    CALCULATOR_RESULTS: {
      name: 'Calculator Results Ad',
      slotId: '1234567892', // TODO: Replace with actual slot ID
      format: 'rectangle',
      width: 336,
      height: 280
    },
    
    CALCULATOR_SIDEBAR: {
      name: 'Calculator Sidebar',
      slotId: '1234567893', // TODO: Replace with actual slot ID
      format: 'vertical',
      width: 160,
      height: 600
    },
    
    // Blog Ads
    BLOG_TOP: {
      name: 'Blog Top Banner',
      slotId: '1234567894', // TODO: Replace with actual slot ID
      format: 'horizontal',
      width: 728,
      height: 90
    },
    
    BLOG_INLINE: {
      name: 'Blog Inline Ad',
      slotId: '1234567895', // TODO: Replace with actual slot ID
      format: 'auto',
      responsive: true
    },
    
    BLOG_SIDEBAR: {
      name: 'Blog Sidebar',
      slotId: '1234567896', // TODO: Replace with actual slot ID
      format: 'auto',
      responsive: true
    },
    
    // Market Insights
    MARKET_INSIGHTS: {
      name: 'Market Insights Ad',
      slotId: '1234567897', // TODO: Replace with actual slot ID
      format: 'auto',
      responsive: true
    },
    
    // Generic In-Content
    IN_CONTENT: {
      name: 'In-Content Ad',
      slotId: '1234567898', // TODO: Replace with actual slot ID
      format: 'auto',
      responsive: true
    },
    
    // Footer
    FOOTER_BANNER: {
      name: 'Footer Banner',
      slotId: '1234567899', // TODO: Replace with actual slot ID
      format: 'horizontal',
      width: 728,
      height: 90
    }
  };

  /**
   * Get ad unit configuration by key
   */
  static getAdUnit(key: string): AdUnit | undefined {
    return this.AD_UNITS[key];
  }

  /**
   * Check if AdSense is properly configured
   */
  static isConfigured(): boolean {
    return this.PUBLISHER_ID !== 'ca-pub-XXXXXXXXXXXXXXXX';
  }
}
