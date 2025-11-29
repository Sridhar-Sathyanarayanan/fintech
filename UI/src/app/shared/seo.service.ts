import { Injectable, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { SEOConfig } from '../models/seo.models';
import { SchemaMarkup } from '../models/chart.models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SEOService implements OnDestroy {
  private destroy$ = new Subject<void>();
  private isBrowser: boolean;

  private defaultConfig: SEOConfig = {
    title: 'Income Tax Calculator 2025 | Free Tax Regime Comparison | AMKRTech',
    description: 'Calculate your income tax for FY 2025-26 using AMKRTech\'s free online tax calculator. Compare old vs new regimes with detailed breakdowns and personalized recommendations.',
    keywords: [
      'income tax calculator',
      'tax calculator 2025',
      'old vs new regime',
      'tax regime calculator',
      'income tax calculator india',
      'tax slab 2025',
      'income tax slab',
      'free tax calculator'
    ],
    ogImage: environment.seo.ogImage,
    ogUrl: environment.seo.domain,
    twitterImage: environment.seo.twitterImage
  };

  private pageConfigs: { [key: string]: SEOConfig } = {
    '': this.defaultConfig,
    '/income-tax-calculator': {
      title: 'Income Tax Calculator 2025 | Calculate Old & New Regime Tax | AMKRTech',
      description: 'Free income tax calculator for FY 2025-26. Compare old vs new tax regimes, calculate deductions, and get personalized tax-saving recommendations.',
      keywords: ['income tax calculator', 'tax calculator 2025', 'old regime', 'new regime', 'tax comparison', 'deductions calculator'],
      schema: this.getTaxCalculatorSchema()
    },
    '/tax-slabs': {
      title: 'Income Tax Slabs 2025-26 | Old & New Regime | AMKRTech',
      description: 'Complete income tax slabs for FY 2025-26. Compare tax rates for both old and new regimes. Clear, detailed breakdown with examples.',
      keywords: ['tax slabs', 'income tax slabs', 'tax slabs 2025', 'new tax regime slabs', 'old tax regime slabs'],
      schema: this.getTaxSlabSchema()
    },
    '/sip-calculator': {
      title: 'SIP Calculator | Systematic Investment Plan Calculator | AMKRTech',
      description: 'Calculate your SIP returns with our advanced SIP calculator. Estimate investments, analyze growth, and plan your financial future.',
      keywords: ['sip calculator', 'systematic investment plan', 'mutual fund calculator', 'investment calculator'],
      schema: this.getCalculatorSchema('SIP Calculator', 'Calculate your SIP returns')
    },
    '/ppf-calculator': {
      title: 'PPF Calculator | Public Provident Fund Calculator | AMKRTech',
      description: 'PPF calculator to estimate your Public Provident Fund returns. Plan your retirement with our accurate PPF investment calculator.',
      keywords: ['ppf calculator', 'public provident fund', 'ppf returns calculator', 'retirement calculator'],
      schema: this.getCalculatorSchema('PPF Calculator', 'Calculate PPF returns')
    },
    '/home-loan-calculator': {
      title: 'Home Loan Calculator | EMI Calculator | Mortgage Calculator | AMKRTech',
      description: 'Calculate home loan EMI, total interest, and amortization schedule. Compare loan options with our comprehensive home loan calculator.',
      keywords: ['home loan calculator', 'emi calculator', 'mortgage calculator', 'loan calculator', 'housing loan'],
      schema: this.getCalculatorSchema('Home Loan Calculator', 'Calculate home loan EMI')
    },
    '/nps-calculator': {
      title: 'NPS Calculator | National Pension Scheme Calculator | AMKRTech',
      description: 'National Pension Scheme calculator to estimate your retirement corpus. Plan your NPS investments for a secure financial future.',
      keywords: ['nps calculator', 'national pension scheme', 'pension calculator', 'retirement planning'],
      schema: this.getCalculatorSchema('NPS Calculator', 'Calculate NPS retirement corpus')
    },
    '/hra-calculator': {
      title: 'HRA Calculator | House Rent Allowance Calculator | AMKRTech',
      description: 'Calculate your HRA exemption and income tax benefit. Maximize your HRA deduction with our accurate HRA calculator.',
      keywords: ['hra calculator', 'house rent allowance', 'hra exemption', 'rent deduction calculator'],
      schema: this.getCalculatorSchema('HRA Calculator', 'Calculate HRA exemption')
    },
    '/gratuity-calculator': {
      title: 'Gratuity Calculator | Gratuity Calculation Calculator | AMKRTech',
      description: 'Calculate your gratuity amount at retirement. Understand your gratuity entitlement with our comprehensive gratuity calculator.',
      keywords: ['gratuity calculator', 'gratuity amount', 'retirement benefits', 'employee gratuity'],
      schema: this.getCalculatorSchema('Gratuity Calculator', 'Calculate gratuity amount')
    }
  };

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.setupRouteListener();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupRouteListener(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects || event.url;
        const route = this.normalizeRoute(url);
        this.updateSEO(this.pageConfigs[route] || this.defaultConfig);
      });
  }

  private normalizeRoute(url: string): string {
    return url.split('?')[0].split('#')[0];
  }

  updateSEO(config: SEOConfig): void {
    // Update title
    this.titleService.setTitle(config.title);

    // Update meta tags
    this.updateMetaTag('name', 'description', config.description);
    this.updateMetaTag('name', 'keywords', config.keywords.join(', '));

    // Update Open Graph tags
    this.updateMetaTag('property', 'og:title', config.ogTitle || config.title);
    this.updateMetaTag('property', 'og:description', config.ogDescription || config.description);
    if (config.ogImage) this.updateMetaTag('property', 'og:image', config.ogImage);
    if (config.ogUrl) this.updateMetaTag('property', 'og:url', config.ogUrl);

    // Update Twitter tags
    this.updateMetaTag('name', 'twitter:title', config.twitterTitle || config.title);
    this.updateMetaTag('name', 'twitter:description', config.twitterDescription || config.description);
    if (config.twitterImage) this.updateMetaTag('name', 'twitter:image', config.twitterImage);

    // Update canonical URL
    if (config.canonicalUrl) {
      this.updateCanonicalTag(config.canonicalUrl);
    }

    // Update schema markup
    if (config.schema) {
      this.updateSchema(config.schema);
    }
  }

  private updateMetaTag(attrName: string, attrValue: string, content: string): void {
    const tag = this.metaService.getTag(`${attrName}='${attrValue}'`);
    if (tag) {
      this.metaService.updateTag({ [attrName]: attrValue, content });
    } else {
      this.metaService.addTag({ [attrName]: attrValue, content });
    }
  }

  private updateCanonicalTag(url: string): void {
    if (!this.isBrowser) return;
    
    let tag = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (tag) {
      tag.href = url;
    } else {
      tag = this.document.createElement('link');
      tag.rel = 'canonical';
      tag.href = url;
      this.document.head.appendChild(tag);
    }
  }

  private updateSchema(schema: SchemaMarkup): void {
    if (!this.isBrowser) return;
    
    try {
      let scriptTag = this.document.querySelector('script[type="application/ld+json"][data-app="amkrtech"]') as HTMLScriptElement;
      if (scriptTag) {
        scriptTag.innerHTML = JSON.stringify(schema);
      } else {
        scriptTag = this.document.createElement('script');
        scriptTag.type = 'application/ld+json';
        scriptTag.setAttribute('data-app', 'amkrtech');
        scriptTag.innerHTML = JSON.stringify(schema);
        this.document.head.appendChild(scriptTag);
      }
    } catch (error) {
      console.error('Error updating schema markup:', error);
    }
  }

  // Schema markup generators
  private getTaxCalculatorSchema(): SchemaMarkup {
    return {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': 'AMKRTech Income Tax Calculator',
      'description': 'Free online income tax calculator for FY 2025-26. Compare old vs new tax regimes.',
      'url': `${environment.seo.domain}/income-tax-calculator`,
      'applicationCategory': 'FinanceApplication',
      'operatingSystem': 'Web',
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '4.8',
        'ratingCount': '2450'
      },
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'INR'
      }
    };
  }

  private getTaxSlabSchema(): SchemaMarkup {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': 'Income Tax Slabs 2025-26 | Old & New Regime',
      'description': 'Complete income tax slabs for FY 2025-26 with detailed comparison.',
      'author': {
        '@type': 'Organization',
        'name': 'AMKRTech'
      },
      'datePublished': new Date().toISOString(),
      'mainEntity': {
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'What are the income tax slabs for 2025-26?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Tax slabs vary by regime and age. Use our calculator for precise calculations.'
            }
          }
        ]
      }
    };
  }

  private getCalculatorSchema(name: string, description: string): SchemaMarkup {
    return {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': name,
      'description': description,
      'url': `${environment.seo.domain}${name.toLowerCase().replace(/ /g, '-')}`,
      'applicationCategory': 'FinanceApplication',
      'operatingSystem': 'Web',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'INR'
      }
    };
  }

  addBreadcrumbs(breadcrumbs: { name: string; url: string }[]): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': crumb.name,
        'item': crumb.url
      }))
    };

    this.updateSchema(schema);
  }

  addFAQSchema(faqs: { question: string; answer: string }[]): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqs.map(faq => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer
        }
      }))
    };

    this.updateSchema(schema);
  }
}

