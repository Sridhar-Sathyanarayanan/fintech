/**
 * UI Component Models
 * 
 * Contains interface definitions for reusable UI components and features
 * Used across multiple pages for consistent structure
 */

// ==================== COMMON UI MODELS ====================

export interface FAQItem {
  question: string;
  answer: string;
  expanded?: boolean;
  icon?: string;
}

export interface SelectOption {
  label: string;
  value: string | number | boolean;
}

// ==================== CONTACT & SOCIAL MODELS ====================

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

// ==================== HOME PAGE MODELS ====================

export interface FinancialTool {
  icon: string;
  title: string;
  desc: string;
  color: string;
  route: string;
}

export interface FinancialFact {
  title: string;
  content: string;
  icon: string;
}

export interface Statistic {
  value: string;
  label: string;
  icon: string;
}

export interface Quote {
  text: string;
  author: string;
  designation: string;
  imageUrl: string;
}

export interface EconomicIndicator {
  label: string;
  value: string;
  trend: string;
  icon: string;
  color: string;
}

export interface CarouselSlide {
  image: string;
  title: string;
  subtitle: string;
}

// ==================== ABOUT US MODELS ====================

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  social: {
    linkedin?: string;
    twitter?: string;
  };
}

export interface Value {
  icon: string;
  title: string;
  description: string;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
  color: string;
}

// ==================== PRIVACY POLICY MODELS ====================

export interface PolicySection {
  id: string;
  title: string;
  icon: string;
}

export interface InfoCategory {
  title: string;
  items: string[];
}

export interface UsageItem {
  title: string;
  desc: string;
}

export interface SecurityFeature {
  icon: string;
  title: string;
  desc: string;
}

export interface UserRight {
  title: string;
  desc: string;
}

export interface CookieInfo {
  title: string;
  desc: string;
  items?: string[];
  type: 'info' | 'analytics' | 'manage';
}

// ==================== NAVIGATION MODELS ====================

export interface NavItem {
  label: string;
  route?: string;
  icon: string;
  children?: NavItem[];
}
