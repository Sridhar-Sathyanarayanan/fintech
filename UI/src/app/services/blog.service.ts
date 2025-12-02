import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map, catchError } from 'rxjs';
import {
  BlogArticle,
  BlogArticleMetadata,
  BlogCategory,
  BlogDataResponse,
  BlogQueryParams,
  PaginatedBlogResponse,
  BlogArticleEnriched
} from '../models/blog.models';

/**
 * Blog Service with Abstraction Layer
 * 
 * IMPORTANT FOR DATABASE MIGRATION:
 * ===================================
 * This service is designed with a clean abstraction that allows seamless
 * switching between static files and database/API without ANY changes to components.
 * 
 * CURRENT: Loads from static JSON file (assets/blog/blog-data.json)
 * FUTURE: Switch to API calls by changing dataSource config
 * 
 * Migration Steps:
 * 1. Deploy backend API endpoints (already prepared in mid-tier/routes/blog.routes.ts)
 * 2. Change DATA_SOURCE constant from 'static' to 'api'
 * 3. Update API_BASE_URL to your backend URL
 * 4. Zero changes needed in components!
 * 
 * All methods return Observables for consistency whether using static files or API.
 */

// Configuration for easy migration
const DATA_SOURCE: 'static' | 'api' = 'static'; // Change to 'api' when ready
const API_BASE_URL = '/api/blog'; // Update when deploying backend
const STATIC_DATA_PATH = '/assets/blog/blog-data.json';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private http = inject(HttpClient);
  
  // Cache for static data (avoids multiple file reads)
  private cachedData = signal<BlogDataResponse | null>(null);
  
  /**
   * Get all articles (with optional filtering)
   * Works with both static files and API
   */
  getAllArticles(params?: BlogQueryParams): Observable<BlogArticleMetadata[]> {
    if (DATA_SOURCE === 'api') {
      // API mode (future)
      return this.http.get<PaginatedBlogResponse>(`${API_BASE_URL}/articles`, { params: params as any })
        .pipe(
          map(response => response.articles),
          catchError(this.handleError<BlogArticleMetadata[]>('getAllArticles', []))
        );
    } else {
      // Static file mode (current)
      return this.loadStaticData().pipe(
        map(data => {
          let articles = this.convertToMetadata(data.articles);
          
          // Client-side filtering
          if (params) {
            articles = this.filterArticles(articles, params);
          }
          
          return articles;
        })
      );
    }
  }

  /**
   * Get single article by slug
   */
  getArticleBySlug(slug: string): Observable<BlogArticle | null> {
    if (DATA_SOURCE === 'api') {
      // API mode (future)
      return this.http.get<BlogArticle>(`${API_BASE_URL}/articles/${slug}`)
        .pipe(
          catchError(this.handleError<BlogArticle | null>('getArticleBySlug', null))
        );
    } else {
      // Static file mode (current)
      return this.loadStaticData().pipe(
        map(data => {
          const article = data.articles.find(a => a.slug === slug);
          return article || null;
        })
      );
    }
  }

  /**
   * Get enriched article with additional computed fields
   */
  getEnrichedArticle(slug: string): Observable<BlogArticleEnriched | null> {
    return this.getArticleBySlug(slug).pipe(
      map(article => {
        if (!article) return null;
        
        const enriched: BlogArticleEnriched = {
          ...article,
          formattedDate: this.formatDate(article.publishDate),
          isNew: this.isArticleNew(article.publishDate)
        };
        
        return enriched;
      })
    );
  }

  /**
   * Get featured articles
   */
  getFeaturedArticles(limit: number = 3): Observable<BlogArticleMetadata[]> {
    return this.getAllArticles({ featured: true, limit });
  }

  /**
   * Get articles by category
   */
  getArticlesByCategory(category: string, limit?: number): Observable<BlogArticleMetadata[]> {
    return this.getAllArticles({ category, limit });
  }

  /**
   * Get articles by tag
   */
  getArticlesByTag(tag: string, limit?: number): Observable<BlogArticleMetadata[]> {
    return this.getAllArticles({ tag, limit });
  }

  /**
   * Search articles by keyword
   */
  searchArticles(searchTerm: string): Observable<BlogArticleMetadata[]> {
    return this.getAllArticles({ search: searchTerm });
  }

  /**
   * Get all categories
   */
  getCategories(): Observable<BlogCategory[]> {
    if (DATA_SOURCE === 'api') {
      // API mode (future)
      return this.http.get<BlogCategory[]>(`${API_BASE_URL}/categories`)
        .pipe(
          catchError(this.handleError<BlogCategory[]>('getCategories', []))
        );
    } else {
      // Static file mode (current)
      return this.loadStaticData().pipe(
        map(data => data.categories || [])
      );
    }
  }

  /**
   * Get related articles for a given article
   */
  getRelatedArticles(article: BlogArticle, limit: number = 3): Observable<BlogArticleMetadata[]> {
    if (article.relatedArticles && article.relatedArticles.length > 0) {
      // Use explicit related article slugs if provided
      return this.loadStaticData().pipe(
        map(data => {
          const related = data.articles
            .filter(a => article.relatedArticles!.includes(a.slug))
            .slice(0, limit);
          return this.convertToMetadata(related);
        })
      );
    } else {
      // Find related by category and tags
      return this.loadStaticData().pipe(
        map(data => {
          const related = data.articles
            .filter(a => 
              a.slug !== article.slug && 
              (a.category === article.category || 
               a.tags.some(tag => article.tags.includes(tag)))
            )
            .slice(0, limit);
          return this.convertToMetadata(related);
        })
      );
    }
  }

  /**
   * Get recent articles
   */
  getRecentArticles(limit: number = 5): Observable<BlogArticleMetadata[]> {
    return this.getAllArticles({ sortBy: 'date', sortOrder: 'desc', limit });
  }

  // ==================== PRIVATE HELPER METHODS ====================

  /**
   * Load static data from JSON file (with caching)
   */
  private loadStaticData(): Observable<BlogDataResponse> {
    const cached = this.cachedData();
    if (cached) {
      return of(cached);
    }

    return this.http.get<BlogDataResponse>(STATIC_DATA_PATH).pipe(
      map(data => {
        this.cachedData.set(data);
        return data;
      }),
      catchError(this.handleError<BlogDataResponse>('loadStaticData', {
        articles: [],
        categories: []
      }))
    );
  }

  /**
   * Convert full articles to metadata (for listing pages)
   */
  private convertToMetadata(articles: BlogArticle[]): BlogArticleMetadata[] {
    return articles.map(article => ({
      id: article.id,
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      author: article.author,
      publishDate: article.publishDate,
      category: article.category,
      tags: article.tags,
      thumbnail: article.thumbnail,
      readTime: article.readTime,
      featured: article.featured
    }));
  }

  /**
   * Client-side filtering for static mode
   */
  private filterArticles(
    articles: BlogArticleMetadata[], 
    params: BlogQueryParams
  ): BlogArticleMetadata[] {
    let filtered = [...articles];

    // Filter by category
    if (params.category) {
      filtered = filtered.filter(a => 
        a.category.toLowerCase() === params.category!.toLowerCase()
      );
    }

    // Filter by tag
    if (params.tag) {
      filtered = filtered.filter(a => 
        a.tags.some(tag => tag.toLowerCase() === params.tag!.toLowerCase())
      );
    }

    // Filter by featured
    if (params.featured !== undefined) {
      filtered = filtered.filter(a => a.featured === params.featured);
    }

    // Search in title, excerpt, and tags
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filtered = filtered.filter(a =>
        a.title.toLowerCase().includes(searchLower) ||
        a.excerpt.toLowerCase().includes(searchLower) ||
        a.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Sort
    const sortBy = params.sortBy || 'date';
    const sortOrder = params.sortOrder || 'desc';
    
    filtered.sort((a, b) => {
      let comparison = 0;
      
      if (sortBy === 'date') {
        comparison = new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime();
      } else if (sortBy === 'title') {
        comparison = a.title.localeCompare(b.title);
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    // Limit
    if (params.limit) {
      filtered = filtered.slice(0, params.limit);
    }

    return filtered;
  }

  /**
   * Format date for display
   */
  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  /**
   * Check if article is new (published within last 7 days)
   */
  private isArticleNew(publishDate: string): boolean {
    const articleDate = new Date(publishDate);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return articleDate >= weekAgo;
  }

  /**
   * Error handler with fallback values
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      return of(result as T);
    };
  }

  /**
   * Clear cache (useful when switching data sources or for refresh)
   */
  clearCache(): void {
    this.cachedData.set(null);
  }

  /**
   * Get data source info (for debugging)
   */
  getDataSourceInfo(): { source: string; apiUrl?: string; staticPath?: string } {
    return {
      source: DATA_SOURCE,
      apiUrl: DATA_SOURCE === 'api' ? API_BASE_URL : undefined,
      staticPath: DATA_SOURCE === 'static' ? STATIC_DATA_PATH : undefined
    };
  }
}
