// app.routes.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'tax-slabs',
    loadComponent: () =>
      import(
        './calculators/tax-slab-calculator/tax-slab-calculator.component'
      ).then((m) => m.TaxSlabCalculatorComponent),
  },
  {
    path: 'calculator',
    loadComponent: () =>
      import('./calculators/calculator-home.component').then(
        (m) => m.CalculatorHomeComponent
      ),
  },
  {
    path: 'income-tax-calculator',
    loadComponent: () =>
      import('./calculators/tax-calculator/tax-calculator.component').then(
        (m) => m.TaxCalculatorComponent
      ),
  },
  {
    path: 'sip-calculator',
    loadComponent: () =>
      import('./calculators/sip-calculator/sip-calculator.component').then(
        (m) => m.SipCalculatorComponent
      ),
  },
  {
    path: 'ppf-calculator',
    loadComponent: () =>
      import('./calculators/ppf-calculator/ppf-calculator.component').then(
        (m) => m.PpfCalculatorComponent
      ),
  },
  {
    path: 'home-loan-calculator',
    loadComponent: () =>
      import('./calculators/home-loan/home-loan.component').then(
        (m) => m.HomeLoanCalculatorComponent
      ),
  },
  {
    path: 'nps-calculator',
    loadComponent: () =>
      import('./calculators/nps-calculator/nps-calculator.component').then(
        (m) => m.NPSCalculatorComponent
      ),
  },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./privacy/privacy-policy.component').then((m) => m.PrivacyPolicyComponent),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./contact/contact.component').then((m) => m.ContactComponent),
  },
  {
    path: 'about-us',
    loadComponent: () =>
      import('./about-us/about-us.component').then((m) => m.AboutUsComponent),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
