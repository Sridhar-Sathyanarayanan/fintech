import { Component, inject, signal, ViewChild, effect } from '@angular/core';
import { RouterOutlet, RouterModule, RouterLink, RouterLinkActive, ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { MatSidenav } from '@angular/material/sidenav';
import { MaterialModules } from './shared/material.standalone';
import { SEOService } from './shared/seo.service';
import { NavItem } from './models/ui.models';
import { BlogService } from './services/blog.service';
import { BlogArticleMetadata } from './models/blog.models';
import { filter, map } from 'rxjs/operators';
import { CookieConsentComponent, BreadcrumbComponent } from './shared/components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    RouterLink,
    RouterLinkActive,
    MaterialModules,
    CookieConsentComponent,
    BreadcrumbComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  
  private breakpointObserver = inject(BreakpointObserver);
  private seoService = inject(SEOService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private blogService = inject(BlogService);
  
  title = 'tax-calculator';
  isMobile = signal(false);
  isScrolled = signal(false);
  showScrollTop = signal(false);
  recentArticles = signal<BlogArticleMetadata[]>([]);

  navItems: NavItem[] = [
    {
      label: 'Home',
      route: '/',
      icon: 'home'
    },
    {
      label: 'Calculators',
      icon: 'calculate',
      children: [
        {
          label: 'Income Tax Calculator',
          route: '/income-tax-calculator',
          icon: 'account_balance_wallet'
        },
        {
          label: 'Tax Slabs',
          route: '/tax-slabs',
          icon: 'receipt_long'
        },
        {
          label: 'HRA Calculator',
          route: '/hra-calculator',
          icon: 'savings'
        },
        {
          label: 'Gratuity Calculator',
          route: '/gratuity-calculator',
          icon: 'business_center'
        },
        {
          label: 'SIP Calculator',
          route: '/sip-calculator',
          icon: 'trending_up'
        },
        {
          label: 'PPF Calculator',
          route: '/ppf-calculator',
          icon: 'lock'
        },
        {
          label: 'NPS Calculator',
          route: '/nps-calculator',
          icon: 'elderly'
        },
        {
          label: 'Home Loan Calculator',
          route: '/home-loan-calculator',
          icon: 'home_work'
        }
      ]
    },
    {
      label: 'Market Insights',
      route: '/market-insights',
      icon: 'insights'
    },
    {
      label: 'Resources',
      icon: 'library_books',
      children: [
        {
          label: 'Blog',
          route: '/blog',
          icon: 'article'
        },
        {
          label: 'Financial Glossary',
          route: '/glossary',
          icon: 'menu_book'
        }
      ]
    },
    {
      label: 'About',
      icon: 'info',
      children: [
        {
          label: 'About Us',
          route: '/about-us',
          icon: 'info'
        },
        {
          label: 'Contact',
          route: '/contact',
          icon: 'contact_mail'
        }
      ]
    }
  ];

  constructor() {
    // Load recent articles for blog menu
    this.loadRecentArticles();

    // Monitor screen size
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
      .subscribe(result => {
        this.isMobile.set(result.matches);
      });

    // Monitor scroll position
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        this.isScrolled.set(window.scrollY > 50);
        this.showScrollTop.set(window.scrollY > 300);
      });
    }

    // Update page title and meta tags based on route data
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
      )
      .subscribe(route => {
        const data = route.snapshot.data;
        if (data['title'] && data['description']) {
          this.seoService.updateSEO({
            title: data['title'],
            description: data['description'],
            keywords: []
          });
        }
      });
  }

  private loadRecentArticles(): void {
    this.blogService.getAllArticles().subscribe({
      next: (articles) => {
        this.recentArticles.set(articles.slice(0, 5));
        // Update Resources -> Blog nav item with recent articles
        const resourcesNavItem = this.navItems.find(item => item.label === 'Resources');
        if (resourcesNavItem && resourcesNavItem.children) {
          const blogNavItem = resourcesNavItem.children.find(item => item.label === 'Blog');
          if (blogNavItem) {
            blogNavItem.children = this.recentArticles().map(article => ({
              label: article.title.length > 40 ? article.title.substring(0, 40) + '...' : article.title,
              route: `/blog/${article.slug}`,
              icon: 'article'
            }));
          }
        }
      },
      error: (error) => {
        console.error('Error loading articles for menu:', error);
      }
    });
  }

  toggleSidenav(): void {
    this.sidenav.toggle();
  }

  closeSidenav(): void {
    if (this.isMobile()) {
      this.sidenav.close();
    }
  }

  scrollToTop(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
}