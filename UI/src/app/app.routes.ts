import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

/**
 * Application routes configuration (Angular 20 standalone)
 * All calculator routes are lazy-loaded for optimal performance
 */
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { 
      title: 'AMKR Tech - Financial Calculators & Tools', 
      description: 'Free financial calculators for tax, investments, and loans'
    }
  },
  {
    path: 'tax-slabs',
    loadComponent: () =>
      import('./calculators/tax-slab-calculator/tax-slab-calculator.component').then(
        (m) => m.TaxSlabCalculatorComponent
      ),
    data: { 
      title: 'Tax Slabs Calculator - Current Year', 
      description: 'Calculate your income tax slab based on current tax laws',
      breadcrumb: 'Tax Slabs',
      breadcrumbIcon: 'receipt_long'
    }
  },
  {
    path: 'income-tax-calculator',
    loadComponent: () =>
      import('./calculators/tax-calculator/tax-calculator.component').then(
        (m) => m.TaxCalculatorComponent
      ),
    data: { 
      title: 'Income Tax Calculator', 
      description: 'Calculate your income tax with deductions and exemptions',
      breadcrumb: 'Income Tax Calculator',
      breadcrumbIcon: 'calculate'
    }
  },
  {
    path: 'sip-calculator',
    loadComponent: () =>
      import('./calculators/sip-calculator/sip-calculator.component').then(
        (m) => m.SipCalculatorComponent
      ),
    data: { 
      title: 'SIP Calculator - Systematic Investment Plan', 
      description: 'Calculate returns on your SIP investments',
      breadcrumb: 'SIP Calculator',
      breadcrumbIcon: 'trending_up'
    }
  },
  {
    path: 'ppf-calculator',
    loadComponent: () =>
      import('./calculators/ppf-calculator/ppf-calculator.component').then(
        (m) => m.PpfCalculatorComponent
      ),
    data: { 
      title: 'PPF Calculator - Public Provident Fund', 
      description: 'Calculate maturity amount and interest on PPF investments',
      breadcrumb: 'PPF Calculator',
      breadcrumbIcon: 'lock'
    }
  },
  {
    path: 'home-loan-calculator',
    loadComponent: () =>
      import('./calculators/home-loan/home-loan.component').then(
        (m) => m.HomeLoanCalculatorComponent
      ),
    data: { 
      title: 'Home Loan Calculator - EMI & Amortization', 
      description: 'Calculate EMI, total interest, and loan amortization schedule',
      breadcrumb: 'Home Loan Calculator',
      breadcrumbIcon: 'home_work'
    }
  },
  {
    path: 'nps-calculator',
    loadComponent: () =>
      import('./calculators/nps-calculator/nps-calculator.component').then(
        (m) => m.NPSCalculatorComponent
      ),
    data: { 
      title: 'NPS Calculator - National Pension Scheme', 
      description: 'Calculate NPS corpus and retirement benefits',
      breadcrumb: 'NPS Calculator',
      breadcrumbIcon: 'elderly'
    }
  },
  {
    path: 'hra-calculator',
    loadComponent: () =>
      import('./calculators/hra-calculator/hra-calculator.component').then(
        (m) => m.HRACalculatorComponent
      ),
    data: { 
      title: 'HRA Calculator - House Rent Allowance', 
      description: 'Calculate HRA exemption and tax benefits',
      breadcrumb: 'HRA Calculator',
      breadcrumbIcon: 'savings'
    }
  },
  {
    path: 'gratuity-calculator',
    loadComponent: () =>
      import('./calculators/gratuity-calculator/gratuity-calculator.component').then(
        (m) => m.GratuityCalculatorComponent
      ),
    data: { 
      title: 'Gratuity Calculator - Retirement Benefits', 
      description: 'Calculate your gratuity amount based on salary and service',
      breadcrumb: 'Gratuity Calculator',
      breadcrumbIcon: 'business_center'
    }
  },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./privacy/privacy-policy.component').then(
        (m) => m.PrivacyPolicyComponent
      ),
    data: { 
      title: 'Privacy Policy', 
      description: 'Our privacy policy and data protection practices',
      breadcrumb: 'Privacy Policy',
      breadcrumbIcon: 'privacy_tip'
    }
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./contact/contact.component').then(
        (m) => m.ContactComponent
      ),
    data: { 
      title: 'Contact Us', 
      description: 'Get in touch with our team',
      breadcrumb: 'Contact Us',
      breadcrumbIcon: 'contact_mail'
    }
  },
  {
    path: 'about-us',
    loadComponent: () =>
      import('./about-us/about-us.component').then(
        (m) => m.AboutUsComponent
      ),
    data: { 
      title: 'About AMKR Tech', 
      description: 'Learn about AMKR Tech and our mission',
      breadcrumb: 'About Us',
      breadcrumbIcon: 'info'
    }
  },
  {
    path: 'terms',
    loadComponent: () =>
      import('./terms/terms.component').then(
        (m) => m.TermsComponent
      ),
    data: { 
      title: 'Terms of Service', 
      description: 'Terms and conditions for using AMKR Tech services',
      breadcrumb: 'Terms of Service',
      breadcrumbIcon: 'gavel'
    }
  },
  {
    path: 'glossary',
    loadComponent: () =>
      import('./glossary/glossary.component').then(
        (m) => m.GlossaryComponent
      ),
    data: { 
      title: 'Financial Glossary - Terms & Definitions', 
      description: 'Comprehensive guide to financial terms covering taxes, investments, loans, retirement, insurance, and banking',
      breadcrumb: 'Financial Glossary',
      breadcrumbIcon: 'menu_book'
    }
  },
  {
    path: 'market-insights',
    loadComponent: () =>
      import('./market-insights/market-insights.component').then(
        (m) => m.MarketInsightsComponent
      ),
    data: { 
      title: 'Market Insights - Live Data & Analysis', 
      description: 'Real-time market data, sectoral performance, and expert insights',
      breadcrumb: 'Market Insights',
      breadcrumbIcon: 'insights'
    }
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./blog/blog.component').then(
        (m) => m.BlogComponent
      ),
    data: { 
      title: 'Financial Blog - Expert Insights & Guides', 
      description: 'Expert articles on tax planning, investments, retirement, and wealth management',
      breadcrumb: 'Blog',
      breadcrumbIcon: 'article'
    }
  },
  {
    path: 'blog/:slug',
    loadComponent: () =>
      import('./blog-detail/blog-detail.component').then(
        (m) => m.BlogDetailComponent
      ),
    data: { 
      title: 'Article', 
      description: 'Read our latest financial insights and expert advice',
      breadcrumb: 'Article',
      breadcrumbIcon: 'article'
    }
  },
  {
    path: '**',
    loadComponent: () =>
      import('./page-not-found/page-not-found.component').then(
        (m) => m.PageNotFoundComponent
      ),
    data: { title: 'Page Not Found', description: 'The page you are looking for does not exist' }
  }
];
