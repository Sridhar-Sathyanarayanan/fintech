// app.routes.ts
import { RouterModule, Routes } from '@angular/router';
import { TaxSlabCalculatorComponent } from './calculators/tax-slab-calculator/tax-slab-calculator.component';
import { TaxCalculatorComponent } from './calculators/tax-calculator/tax-calculator.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { PrivacyComponent } from './privacy/privacy.component';
import { ContactComponent } from './contact/contact.component';
import { SipCalculatorComponent } from './calculators/sip-calculator/sip-calculator.component';
import { PpfCalculatorComponent } from './calculators/ppf-calculator/ppf-calculator.component';
import { CalculatorHomeComponent } from './calculators/calculator-home.component';
import { HomeLoanCalculatorComponent } from './calculators/home-loan/home-loan.component';
import { AboutUsComponent } from './about-us/about-us.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'tax-slabs',
    loadComponent: () => import('./calculators/tax-slab-calculator/tax-slab-calculator.component').then(m => m.TaxSlabCalculatorComponent)
  },
  {
    path: 'calculator',
    loadComponent: () => import('./calculators/calculator-home.component').then(m => m.CalculatorHomeComponent)
  },
  {
    path: 'income-tax-calculator',
    loadComponent: () => import('./calculators/tax-calculator/tax-calculator.component').then(m => m.TaxCalculatorComponent)
  },
  {
    path: 'sip-calculator',
    loadComponent: () => import('./calculators/sip-calculator/sip-calculator.component').then(m => m.SipCalculatorComponent)
  },
  {
    path: 'ppf-calculator',
    loadComponent: () => import('./calculators/ppf-calculator/ppf-calculator.component').then(m => m.PpfCalculatorComponent)
  },
  {
    path: 'home-loan-calculator',
    loadComponent: () => import('./calculators/home-loan/home-loan.component').then(m => m.HomeLoanCalculatorComponent)
  },
  {
    path: 'privacy-policy',
    loadComponent: () => import('./privacy/privacy.component').then(m => m.PrivacyComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: 'about-us',
    loadComponent: () => import('./about-us/about-us.component').then(m => m.AboutUsComponent)
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
