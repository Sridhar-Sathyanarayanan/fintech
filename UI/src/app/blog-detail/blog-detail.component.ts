import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { MaterialModules } from '../shared/material.standalone';
import { BlogService } from '../services/blog.service';
import { BlogArticleEnriched, BlogArticleMetadata } from '../models/blog.models';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MaterialModules
  ],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private blogService = inject(BlogService);
  private titleService = inject(Title);
  private metaService = inject(Meta);

  article = signal<BlogArticleEnriched | null>(null);
  relatedArticles = signal<BlogArticleMetadata[]>([]);
  isLoading = signal<boolean>(true);
  notFound = signal<boolean>(false);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      if (slug) {
        this.loadArticle(slug);
      }
    });
  }

  private loadArticle(slug: string): void {
    this.isLoading.set(true);
    this.notFound.set(false);

    this.blogService.getEnrichedArticle(slug).subscribe({
      next: (article) => {
        if (article) {
          this.article.set(article);
          this.updateMetaTags(article);
          this.loadRelatedArticles(article);
        } else {
          this.notFound.set(true);
        }
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading article:', error);
        this.notFound.set(true);
        this.isLoading.set(false);
      }
    });
  }

  private loadRelatedArticles(article: BlogArticleEnriched): void {
    this.blogService.getRelatedArticles(article, 3).subscribe({
      next: (articles) => {
        this.relatedArticles.set(articles);
      },
      error: (error) => {
        console.error('Error loading related articles:', error);
      }
    });
  }

  private updateMetaTags(article: BlogArticleEnriched): void {
    // Update page title
    const title = article.seoTitle || `${article.title} | AMKR Tech Blog`;
    this.titleService.setTitle(title);

    // Update meta description
    const description = article.seoDescription || article.excerpt;
    this.metaService.updateTag({ name: 'description', content: description });

    // Update Open Graph tags for social sharing
    this.metaService.updateTag({ property: 'og:title', content: article.title });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:image', content: article.thumbnail });
    this.metaService.updateTag({ property: 'og:type', content: 'article' });
    this.metaService.updateTag({ property: 'og:url', content: `https://amkrtech.com/blog/${article.slug}` });

    // Update Twitter Card tags
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: article.title });
    this.metaService.updateTag({ name: 'twitter:description', content: description });
    this.metaService.updateTag({ name: 'twitter:image', content: article.thumbnail });

    // Article specific tags
    if (article.publishDate) {
      this.metaService.updateTag({ property: 'article:published_time', content: article.publishDate });
    }
    if (article.updatedDate) {
      this.metaService.updateTag({ property: 'article:modified_time', content: article.updatedDate });
    }
    if (article.author) {
      this.metaService.updateTag({ property: 'article:author', content: article.author });
    }
    if (article.tags && article.tags.length > 0) {
      article.tags.forEach(tag => {
        this.metaService.updateTag({ property: 'article:tag', content: tag });
      });
    }

    // Keywords
    if (article.seoKeywords && article.seoKeywords.length > 0) {
      this.metaService.updateTag({ name: 'keywords', content: article.seoKeywords.join(', ') });
    }
  }

  goBack(): void {
    this.router.navigate(['/blog']);
  }

  shareArticle(platform: string): void {
    const article = this.article();
    if (!article) return;

    const url = `https://amkrtech.com/blog/${article.slug}`;
    const text = article.title;
    let shareUrl = '';

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  }

  copyLink(): void {
    const article = this.article();
    if (!article) return;

    const url = `https://amkrtech.com/blog/${article.slug}`;
    navigator.clipboard.writeText(url).then(() => {
      // Could show a snackbar notification here
      console.log('Link copied to clipboard');
    });
  }
}
