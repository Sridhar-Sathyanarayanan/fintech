import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaxCalculatorComponent } from './tax-calculator/tax-calculator.component';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule, routes } from './app.routes';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import {
  MatChip,
  MatChipListbox,
  MatChipsModule,
} from '@angular/material/chips';
import { TaxSlabCalculatorComponent } from './tax-slab-calculator/tax-slab-calculator.component';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PrivacyComponent } from './privacy/privacy.component';
import { ContactComponent } from './contact/contact.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import {
  BaseChartDirective,
  provideCharts,
  withDefaultRegisterables,
} from 'ng2-charts';
import { SipCalculatorComponent } from './sip-calculator/sip-calculator.component';
import { MatDivider } from '@angular/material/divider';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TaxCalculatorComponent,
    TaxSlabCalculatorComponent,
    SipCalculatorComponent,
    HomeComponent,
    PrivacyComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatRadioModule,
    MatIconModule,
    MatTabsModule,
    MatChipListbox,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatStepperModule,
    MatSnackBarModule,
    MatChip,
    MatTooltipModule,
    MatProgressSpinner,
    MatTableModule,
    BaseChartDirective,
    MatDivider
  ],
  providers: [provideRouter(routes), provideCharts(withDefaultRegisterables()), provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
