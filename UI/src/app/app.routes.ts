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
    data: { title: 'AMKR Tech - Financial Calculators & Tools', description: 'Free financial calculators for tax, investments, and loans' }
  },
  {
    path: 'tax-slabs',
    loadComponent: () =>
      import('./calculators/tax-slab-calculator/tax-slab-calculator.component').then(
        (m) => m.TaxSlabCalculatorComponent
      ),
    data: { title: 'Tax Slabs Calculator - Current Year', description: 'Calculate your income tax slab based on current tax laws' }
  },
  {
    path: 'income-tax-calculator',
    loadComponent: () =>
      import('./calculators/tax-calculator/tax-calculator.component').then(
        (m) => m.TaxCalculatorComponent
      ),
    data: { title: 'Income Tax Calculator', description: 'Calculate your income tax with deductions and exemptions' }
  },
  {
    path: 'sip-calculator',
    loadComponent: () =>
      import('./calculators/sip-calculator/sip-calculator.component').then(
        (m) => m.SipCalculatorComponent
      ),
    data: { title: 'SIP Calculator - Systematic Investment Plan', description: 'Calculate returns on your SIP investments' }
  },
  {
    path: 'ppf-calculator',
    loadComponent: () =>
      import('./calculators/ppf-calculator/ppf-calculator.component').then(
        (m) => m.PpfCalculatorComponent
      ),
    data: { title: 'PPF Calculator - Public Provident Fund', description: 'Calculate maturity amount and interest on PPF investments' }
  },
  {
    path: 'home-loan-calculator',
    loadComponent: () =>
      import('./calculators/home-loan/home-loan.component').then(
        (m) => m.HomeLoanCalculatorComponent
      ),
    data: { title: 'Home Loan Calculator - EMI & Amortization', description: 'Calculate EMI, total interest, and loan amortization schedule' }
  },
  {
    path: 'nps-calculator',
    loadComponent: () =>
      import('./calculators/nps-calculator/nps-calculator.component').then(
        (m) => m.NPSCalculatorComponent
      ),
    data: { title: 'NPS Calculator - National Pension Scheme', description: 'Calculate NPS corpus and retirement benefits' }
  },
  {
    path: 'hra-calculator',
    loadComponent: () =>
      import('./calculators/hra-calculator/hra-calculator.component').then(
        (m) => m.HRACalculatorComponent
      ),
    data: { title: 'HRA Calculator - House Rent Allowance', description: 'Calculate HRA exemption and tax benefits' }
  },
  {
    path: 'gratuity-calculator',
    loadComponent: () =>
      import('./calculators/gratuity-calculator/gratuity-calculator.component').then(
        (m) => m.GratuityCalculatorComponent
      ),
    data: { title: 'Gratuity Calculator - Retirement Benefits', description: 'Calculate your gratuity amount based on salary and service' }
  },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./privacy/privacy-policy.component').then(
        (m) => m.PrivacyPolicyComponent
      ),
    data: { title: 'Privacy Policy', description: 'Our privacy policy and data protection practices' }
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./contact/contact.component').then(
        (m) => m.ContactComponent
      ),
    data: { title: 'Contact Us', description: 'Get in touch with our team' }
  },
  {
    path: 'about-us',
    loadComponent: () =>
      import('./about-us/about-us.component').then(
        (m) => m.AboutUsComponent
      ),
    data: { title: 'About AMKR Tech', description: 'Learn about AMKR Tech and our mission' }
  },
  {
    path: 'market-insights',
    loadComponent: () =>
      import('./market-insights/market-insights.component').then(
        (m) => m.MarketInsightsComponent
      ),
    data: { title: 'Market Insights - Live Data & Analysis', description: 'Real-time market data, sectoral performance, and expert insights' }
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
