// app.routes.ts
import { RouterModule, Routes } from '@angular/router';
import { TaxSlabCalculatorComponent } from './tax-slab-calculator/tax-slab-calculator.component';
import { TaxCalculatorComponent } from './tax-calculator/tax-calculator.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { PrivacyComponent } from './privacy/privacy.component';
import { ContactComponent } from './contact/contact.component';
import { SipCalculatorComponent } from './sip-calculator/sip-calculator.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'tax-slabs',
    component: TaxSlabCalculatorComponent,
  },
  {
    path: 'income-tax-calculator',
    component: TaxCalculatorComponent,
  },
  {
    path: 'sip',
    component: SipCalculatorComponent,
  },
  { path: 'privacy-policy', component: PrivacyComponent },
  { path: 'contact', component: ContactComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
