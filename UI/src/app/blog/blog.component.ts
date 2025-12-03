import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModules } from '../shared/material.standalone';
import { BannerSectionComponent, BannerFeature, BannerVisualCard } from '../shared/components/banner-section/banner-section.component';
import { BlogService } from '../services/blog.service';
import { BlogArticleMetadata, BlogCategory } from '../models/blog.models';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MaterialModules,
    BannerSectionComponent,
    NgxSpinnerModule
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit {
  private blogService = inject(BlogService);
  private spinner = inject(NgxSpinnerService);

  // Signals for reactive state
  allArticles = signal<BlogArticleMetadata[]>([]);
  categories = signal<BlogCategory[]>([]);
  selectedCategory = signal<string>('all');
  searchQuery = signal<string>('');
  isLoading = signal<boolean>(true);

  // Computed filtered articles
  filteredArticles = computed(() => {
    let articles = this.allArticles();
    const category = this.selectedCategory();
    const search = this.searchQuery().toLowerCase();

    // Filter by category
    if (category !== 'all') {
      articles = articles.filter(a => a.category === category);
    }

    // Filter by search
    if (search) {
      articles = articles.filter(a =>
        a.title.toLowerCase().includes(search) ||
        a.excerpt.toLowerCase().includes(search) ||
        a.tags.some(tag => tag.toLowerCase().includes(search))
      );
    }

    return articles;
  });

  // Computed featured articles
  featuredArticles = computed(() => 
    this.allArticles().filter(a => a.featured).slice(0, 3)
  );

  readonly bannerFeatures: BannerFeature[] = [
    { icon: 'article', label: 'Expert Articles' },
    { icon: 'trending_up', label: 'Market Analysis' },
    { icon: 'school', label: 'Financial Education' },
    { icon: 'tips_and_updates', label: 'Actionable Tips' }
  ];

  readonly bannerVisualCards: BannerVisualCard[] = [
    { icon: 'library_books', label: 'Articles', value: '50+' },
    { icon: 'people', label: 'Readers', value: '10K+' }
  ];

  ngOnInit(): void {
    this.loadBlogData();
  }

  private loadBlogData(): void {
    this.isLoading.set(true);
    this.spinner.show();

    // Load articles
    this.blogService.getAllArticles().subscribe({
      next: (articles) => {
        this.allArticles.set(articles);
        this.isLoading.set(false);
        this.spinner.hide();
      },
      error: (error) => {
        console.error('Error loading articles:', error);
        this.isLoading.set(false);
        this.spinner.hide();
      }
    });

    // Load categories
    this.blogService.getCategories().subscribe({
      next: (categories) => {
        this.categories.set(categories);
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  onCategoryChange(category: string): void {
    this.selectedCategory.set(category);
  }

  onSearchChange(search: string): void {
    this.searchQuery.set(search);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getCategoryColor(categoryName: string): string {
    const category = this.categories().find(c => c.name === categoryName);
    return category?.color || 'primary';
  }

  getCategoryIcon(categoryName: string): string {
    const category = this.categories().find(c => c.name === categoryName);
    return category?.icon || 'article';
  }
}
