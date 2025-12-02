/**
 * Blog Models and Interfaces
 * 
 * These models are designed to work seamlessly with both:
 * 1. Static JSON files (current implementation)
 * 2. Database/API responses (future migration)
 * 
 * Migration Path:
 * - Keep these interfaces unchanged
 * - Only swap the data source in BlogService
 * - Zero changes needed in components
 */

/**
 * Main article interface
 * Matches both JSON structure and future DynamoDB schema
 */
export interface BlogArticle {
  id: string;                          // Unique identifier (UUID or slug-based)
  slug: string;                        // URL-friendly identifier
  title: string;                       // Article title
  excerpt: string;                     // Short description (150-200 chars)
  content: string;                     // Full HTML or Markdown content
  author: string;                      // Author name
  authorImage?: string;                // Optional author avatar
  publishDate: string;                 // ISO 8601 format (e.g., "2025-12-01T00:00:00Z")
  updatedDate?: string;                // Last modified date (optional)
  category: string;                    // Primary category
  tags: string[];                      // Array of tags for filtering
  thumbnail: string;                   // Featured image URL
  thumbnailAlt?: string;               // Alt text for accessibility
  readTime: number;                    // Estimated reading time in minutes
  featured: boolean;                   // Show in featured section
  status?: 'draft' | 'published' | 'archived';  // Publishing status
  views?: number;                      // View count (for DB analytics)
  likes?: number;                      // Like count (for DB analytics)
  relatedArticles?: string[];          // Array of related article slugs
  seoTitle?: string;                   // Custom SEO title
  seoDescription?: string;             // Custom SEO meta description
  seoKeywords?: string[];              // SEO keywords
}

/**
 * Category interface
 */
export interface BlogCategory {
  id: string;                          // Category identifier
  name: string;                        // Display name
  slug: string;                        // URL-friendly name
  description: string;                 // Category description
  icon?: string;                       // Material icon name
  color?: string;                      // Theme color
  articleCount?: number;               // Number of articles (computed)
}

/**
 * Tag interface
 */
export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  articleCount?: number;
}

/**
 * Blog metadata (for listing pages)
 * Lightweight version without full content
 */
export interface BlogArticleMetadata {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  publishDate: string;
  category: string;
  tags: string[];
  thumbnail: string;
  readTime: number;
  featured: boolean;
}

/**
 * Blog data response structure
 * Matches both JSON file and API response
 */
export interface BlogDataResponse {
  articles: BlogArticle[];
  categories: BlogCategory[];
  tags?: BlogTag[];
  metadata?: {
    totalArticles: number;
    lastUpdated: string;
    version: string;
  };
}

/**
 * Query parameters for filtering/searching
 * Works with both client-side and server-side filtering
 */
export interface BlogQueryParams {
  category?: string;
  tag?: string;
  search?: string;
  featured?: boolean;
  limit?: number;
  offset?: number;
  sortBy?: 'date' | 'views' | 'title';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Paginated response (for future API)
 */
export interface PaginatedBlogResponse {
  articles: BlogArticleMetadata[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

/**
 * DynamoDB item structure (for future reference)
 * Keep this as documentation for migration
 */
export interface BlogArticleDynamoDB {
  PK: string;                          // "ARTICLE#<slug>"
  SK: string;                          // "v1" or version number
  GSI1PK: string;                      // "CATEGORY#<category>"
  GSI1SK: string;                      // publishDate for sorting
  GSI2PK: string;                      // "STATUS#published"
  GSI2SK: string;                      // publishDate for sorting
  article: BlogArticle;                // Embedded article data
  createdAt: string;
  updatedAt: string;
}

/**
 * Helper type for article with computed fields
 */
export interface BlogArticleEnriched extends BlogArticle {
  formattedDate: string;               // Formatted date for display
  categoryData?: BlogCategory;         // Full category object
  isNew?: boolean;                     // Published within last 7 days
}
