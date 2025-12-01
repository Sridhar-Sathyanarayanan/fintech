/**
 * Core Application Models
 * 
 * Contains fundamental application-wide models
 * Used for SEO, feedback, schemas, and common utilities
 */

// ==================== SEO MODELS ====================

export interface SchemaMarkup {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonicalUrl?: string;
  schema?: SchemaMarkup;
}

// ==================== FEEDBACK & FORMS ====================

export interface FeedbackData {
  name?: string;
  email?: string;
  message?: string;
  subject?: string;
  [key: string]: any;
}
