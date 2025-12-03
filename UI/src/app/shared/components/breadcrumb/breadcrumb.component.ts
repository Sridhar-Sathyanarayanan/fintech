import { Component, OnInit, signal, inject } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { filter, map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

export interface Breadcrumb {
  label: string;
  url: string;
  icon?: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs = signal<Breadcrumb[]>([]);

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private titleService = inject(Title);

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateBreadcrumbs();
      });

    // Initial load
    this.updateBreadcrumbs();
  }

  private updateBreadcrumbs(): void {
    // Don't show breadcrumbs on home page
    if (this.router.url === '/' || this.router.url === '') {
      this.breadcrumbs.set([]);
      return;
    }
    
    this.breadcrumbs.set(this.createBreadcrumbs(this.activatedRoute.root));
  }

  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map(segment => segment.path)
        .join('/');

      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      let label = child.snapshot.data['breadcrumb'];
      const icon = child.snapshot.data['breadcrumbIcon'];

      // For dynamic routes (like blog/:slug), try to get title from page title service
      if (label && child.snapshot.params && Object.keys(child.snapshot.params).length > 0) {
        const currentTitle = this.titleService.getTitle();
        // Extract article title from page title (format: "Article Title | AMKR Tech Blog")
        if (currentTitle && currentTitle.includes('|')) {
          const articleTitle = currentTitle.split('|')[0].trim();
          if (articleTitle && articleTitle !== label && articleTitle.length < 60) {
            label = articleTitle;
          }
        }
      }

      if (label) {
        breadcrumbs.push({
          label,
          url,
          icon
        });
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }

  isLastBreadcrumb(index: number): boolean {
    return index === this.breadcrumbs().length - 1;
  }
}
