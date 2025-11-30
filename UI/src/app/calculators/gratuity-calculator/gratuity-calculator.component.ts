import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MaterialModules } from '../../shared/material.standalone';
import { BannerSectionComponent, BannerFeature, BannerVisualCard } from '../../shared/components/banner-section/banner-section.component';

interface GratuityResult {
  gratuityAmount: number;
  yearsOfService: number;
  monthsOfService: number;
  totalService: string;
  lastDrawnSalary: number;
  organizationType: string;
  isEligible: boolean;
  formula: string;
}

@Component({
  selector: 'app-gratuity-calculator',
  templateUrl: './gratuity-calculator.component.html',
  styleUrls: ['./gratuity-calculator.component.scss'],
  imports: [MaterialModules, BannerSectionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GratuityCalculatorComponent implements OnInit {
  readonly bannerFeatures: BannerFeature[] = [
    { icon: 'gavel', label: 'Act Compliant' },
    { icon: 'calculate', label: 'Accurate Formula' },
    { icon: 'verified_user', label: '20L Cap Applied' }
  ];

  readonly bannerVisualCards: BannerVisualCard[] = [
    { icon: 'account_balance_wallet', label: 'Max Gratuity', value: '₹20L' },
    { icon: 'schedule', label: 'Min Service', value: '5 Years' }
  ];

  // Form Controls
  lastSalaryControl = new FormControl(50000, [
    Validators.required,
    Validators.min(0),
  ]);
  yearsControl = new FormControl(5, [
    Validators.required,
    Validators.min(0),
    Validators.max(50),
  ]);
  monthsControl = new FormControl(0, [
    Validators.required,
    Validators.min(0),
    Validators.max(11),
  ]);
  organizationTypeControl = new FormControl('covered', [Validators.required]);

  // Slider configurations
  yearsMin = 0;
  yearsMax = 50;
  monthsMin = 0;
  monthsMax = 11;

  // Results
  result: GratuityResult | null = null;
  showResults = false;

  // Constants
  readonly MIN_SERVICE_YEARS = 5;
  readonly GRATUITY_CAP = 2000000; // 20 lakhs
  readonly DAYS_IN_YEAR_COVERED = 26;
  readonly DAYS_IN_YEAR_UNCOVERED = 30;

  ngOnInit(): void {
    // Calculate on load with default values
    this.calculateGratuity();
  }

  calculateGratuity(): void {
    if (
      this.lastSalaryControl.invalid ||
      this.yearsControl.invalid ||
      this.monthsControl.invalid
    ) {
      return;
    }

    const lastSalary = this.lastSalaryControl.value || 0;
    const years = this.yearsControl.value || 0;
    const months = this.monthsControl.value || 0;
    const orgType = this.organizationTypeControl.value || 'covered';

    // Calculate total service in years
    const totalServiceYears = years + months / 12;

    // Check eligibility
    const isEligible = totalServiceYears >= this.MIN_SERVICE_YEARS;

    let gratuityAmount = 0;
    let formula = '';

    if (isEligible) {
      if (orgType === 'covered') {
        // For organizations covered under Gratuity Act
        // Formula: (Last Drawn Salary × 15 × Years of Service) / 26
        gratuityAmount =
          (lastSalary * 15 * totalServiceYears) / this.DAYS_IN_YEAR_COVERED;
        formula = '(Last Drawn Salary × 15 × Years of Service) / 26';
      } else {
        // For organizations not covered under Gratuity Act
        // Formula: (Last Drawn Salary × 15 × Years of Service) / 30
        gratuityAmount =
          (lastSalary * 15 * totalServiceYears) / this.DAYS_IN_YEAR_UNCOVERED;
        formula = '(Last Drawn Salary × 15 × Years of Service) / 30';
      }

      // Apply cap if gratuity exceeds maximum limit
      if (gratuityAmount > this.GRATUITY_CAP) {
        gratuityAmount = this.GRATUITY_CAP;
      }
    }

    this.result = {
      gratuityAmount: Math.round(gratuityAmount),
      yearsOfService: years,
      monthsOfService: months,
      totalService: this.formatServicePeriod(years, months),
      lastDrawnSalary: lastSalary,
      organizationType:
        orgType === 'covered' ? 'Covered under Act' : 'Not Covered under Act',
      isEligible,
      formula,
    };

    this.showResults = true;
  }

  formatServicePeriod(years: number, months: number): string {
    const yearText = years === 1 ? 'year' : 'years';
    const monthText = months === 1 ? 'month' : 'months';

    if (years > 0 && months > 0) {
      return `${years} ${yearText} ${months} ${monthText}`;
    } else if (years > 0) {
      return `${years} ${yearText}`;
    } else if (months > 0) {
      return `${months} ${monthText}`;
    }
    return '0 years';
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  }

  formatNumber(num: number): string {
    return new Intl.NumberFormat('en-IN').format(num);
  }

  resetCalculator(): void {
    this.lastSalaryControl.setValue(50000);
    this.yearsControl.setValue(5);
    this.monthsControl.setValue(0);
    this.organizationTypeControl.setValue('covered');
    this.showResults = false;
    this.result = null;
  }

  onSalaryInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value);
    if (!isNaN(value) && value >= 0) {
      this.lastSalaryControl.setValue(value);
    }
  }

  onYearsChange(value: number): void {
    this.yearsControl.setValue(value);
  }

  onMonthsChange(value: number): void {
    this.monthsControl.setValue(value);
  }

  getEligibilityText(): string {
    if (!this.result) return '';

    const totalYears =
      this.result.yearsOfService + this.result.monthsOfService / 12;

    if (totalYears >= this.MIN_SERVICE_YEARS) {
      return 'Eligible for Gratuity';
    } else {
      const remaining = this.MIN_SERVICE_YEARS - totalYears;
      return `Need ${remaining.toFixed(1)} more years for eligibility`;
    }
  }

  getFormulaBreakdown(): { label: string; value: string }[] {
    if (!this.result) return [];

    const daysInYear =
      this.organizationTypeControl.value === 'covered'
        ? this.DAYS_IN_YEAR_COVERED
        : this.DAYS_IN_YEAR_UNCOVERED;

    return [
      {
        label: 'Last Drawn Salary',
        value: this.formatCurrency(this.result.lastDrawnSalary),
      },
      {
        label: 'Service Period',
        value: this.result.totalService,
      },
      {
        label: 'Working Days per Year',
        value: `${daysInYear} days`,
      },
      {
        label: 'Multiplier',
        value: '15 days',
      },
    ];
  }

  getMaxGratuityInfo(): string {
    return `Maximum gratuity payable is ${this.formatCurrency(
      this.GRATUITY_CAP
    )} (20 Lakhs)`;
  }

  isGratuityCapped(): boolean {
    if (!this.result) return false;

    const lastSalary = this.lastSalaryControl.value || 0;
    const years = this.yearsControl.value || 0;
    const months = this.monthsControl.value || 0;
    const totalServiceYears = years + months / 12;
    const orgType = this.organizationTypeControl.value || 'covered';

    let calculatedAmount = 0;
    if (orgType === 'covered') {
      calculatedAmount =
        (lastSalary * 15 * totalServiceYears) / this.DAYS_IN_YEAR_COVERED;
    } else {
      calculatedAmount =
        (lastSalary * 15 * totalServiceYears) / this.DAYS_IN_YEAR_UNCOVERED;
    }

    return calculatedAmount > this.GRATUITY_CAP;
  }

  scrollToCalculator(): void {
    const calculatorSection = document.querySelector('.calculator-section');
    if (calculatorSection) {
      calculatorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
