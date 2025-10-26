import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { MaterialModules } from '../../shared/material.standalone';

interface TaxBreakdown {
  slab: string;
  rate: string;
  amount: number;
}

interface ChartData {
  label: string;
  value: number;
  color: string;
}

@Component({
  selector: 'app-tax-calculator',
  templateUrl: './tax-calculator.component.html',
  styleUrls: ['./tax-calculator.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModules],
})
export class TaxCalculatorComponent implements OnInit {
  @ViewChild('resultSection') resultSection!: ElementRef;
  @ViewChild('stepper') stepper!: MatStepper;

  years: string[] = ['2023-24', '2024-25', '2025-26'];

  oldRegimeTax = signal(0);
  newRegimeTax = signal(0);
  showTaxDetails = signal(false);
  isSmallScreen = signal(false);

  taxCalcForm!: FormGroup;
  oldRegimeBreakdown: TaxBreakdown[] = [];
  newRegimeBreakdown: TaxBreakdown[] = [];

  deductionFields = [
    {
      label: 'Section 80C (max ₹1,50,000)',
      control: 'deductions80C',
      icon: 'savings',
      max: 150000,
    },
    {
      label: 'Section 80D (Medical Insurance)',
      control: 'deductions80D',
      icon: 'health_and_safety',
      max: 100000,
    },
    {
      label: 'Section 80TTA (Interest on Savings)',
      control: 'deductions80TTA',
      icon: 'account_balance',
      max: 50000,
    },
    {
      label: 'Section 80G (Donations to Charity)',
      control: 'deductions80G',
      icon: 'volunteer_activism',
      max: null,
    },
    {
      label: "Section 80CCD(2) (Employer's NPS)",
      control: 'deductions80CCD2',
      icon: 'work',
      max: 100000,
    },
    {
      label: 'Section 80EEA (Housing Loan Interest)',
      control: 'deductions80EEA',
      icon: 'home',
      max: null,
    },
    {
      label: "Section 80CCD (Employee's NPS)",
      control: 'deductions80CCD',
      icon: 'account_balance_wallet',
      max: 50000,
    },
    {
      label: 'Other Deductions',
      control: 'deductionsOther',
      icon: 'more_horiz',
      max: null,
    },
  ];

  get deductionsFormGroup(): FormGroup {
    return this.taxCalcForm.get('deductions') as FormGroup;
  }

  get incomeFormGroup(): FormGroup {
    return this.taxCalcForm.get('incomeDetails') as FormGroup;
  }

  get basicFormGroup(): FormGroup {
    return this.taxCalcForm.get('basicDetails') as FormGroup;
  }

  get taxDifference(): number {
    return Math.abs(this.oldRegimeTax() - this.newRegimeTax());
  }

  get savingsPercentage(): number {
    const totalIncome = this.incomeFormGroup.get('income')?.value || 0;
    if (totalIncome === 0) return 0;
    return (this.taxDifference / totalIncome) * 100;
  }

  get recommendedRegime(): string {
    if (this.oldRegimeTax() < this.newRegimeTax()) return 'Old Regime';
    if (this.newRegimeTax() < this.oldRegimeTax()) return 'New Regime';
    return 'Either Regime';
  }

  get comparisonChartData(): ChartData[] {
    const total = this.oldRegimeTax() + this.newRegimeTax();
    return [
      {
        label: 'Old Regime',
        value: total > 0 ? (this.oldRegimeTax() / total) * 100 : 50,
        color: '#ff9800',
      },
      {
        label: 'New Regime',
        value: total > 0 ? (this.newRegimeTax() / total) * 100 : 50,
        color: '#4caf50',
      },
    ];
  }

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isSmallScreen.set(result.matches);
      });
  }

  ngOnInit(): void {
    this.taxCalcForm = new FormGroup({
      basicDetails: new FormGroup({
        assessmentYear: new FormControl('2025-26', Validators.required),
        ageGroup: new FormControl('below60', Validators.required),
      }),
      incomeDetails: new FormGroup({
        income: new FormControl('', [Validators.required, Validators.min(0)]),
        otherIncome: new FormControl(0, Validators.min(0)),
      }),
      deductions: new FormGroup({
        deductions80C: new FormControl(0, Validators.min(0)),
        deductions80D: new FormControl(0, Validators.min(0)),
        deductions80TTA: new FormControl(0, Validators.min(0)),
        deductions80G: new FormControl(0, Validators.min(0)),
        deductions80CCD2: new FormControl(0, Validators.min(0)),
        deductions80EEA: new FormControl(0, Validators.min(0)),
        deductions80CCD: new FormControl(0, Validators.min(0)),
        deductionsOther: new FormControl(0, Validators.min(0)),
      }),
    });
  }

  resetCalculator(): void {
    this.taxCalcForm.reset({
      basicDetails: { assessmentYear: '2025-26', ageGroup: 'below60' },
      incomeDetails: { income: '', otherIncome: 0 },
      deductions: {
        deductions80C: 0,
        deductions80D: 0,
        deductions80TTA: 0,
        deductions80G: 0,
        deductions80CCD2: 0,
        deductions80EEA: 0,
        deductions80CCD: 0,
        deductionsOther: 0,
      },
    });
    this.showTaxDetails.set(false);
    this.stepper.reset();
  }

  calculateTax(): void {
    const income = Number(this.incomeFormGroup.get('income')?.value || 0);
    const otherIncome = Number(
      this.incomeFormGroup.get('otherIncome')?.value || 0
    );
    const totalIncome = income + otherIncome;

    const totalDeductions = this.getOldRegimeDeductions();
    const taxableOld = Math.max(0, totalIncome - totalDeductions);
    const year = this.basicFormGroup.get('assessmentYear')?.value;

    const oldTaxResult = this.getTaxForYear(year, taxableOld, 'old');
    const newTaxResult = this.getTaxForYear(year, totalIncome, 'new');

    this.oldRegimeTax.set(oldTaxResult.tax);
    this.newRegimeTax.set(newTaxResult.tax);
    this.oldRegimeBreakdown = oldTaxResult.breakdown;
    this.newRegimeBreakdown = newTaxResult.breakdown;

    this.showTaxDetails.set(true);
    this.scrollToResults();
  }

  private getOldRegimeDeductions(): number {
    const deductions = this.deductionsFormGroup.value;
    const standardDeduction = 50000;

    return (
      Math.min(Number(deductions.deductions80C || 0), 150000) +
      Math.min(Number(deductions.deductions80D || 0), 100000) +
      Math.min(Number(deductions.deductions80TTA || 0), 50000) +
      Math.min(Number(deductions.deductions80CCD || 0), 50000) +
      Math.min(Number(deductions.deductions80CCD2 || 0), 100000) +
      Number(deductions.deductions80G || 0) +
      Number(deductions.deductions80EEA || 0) +
      Number(deductions.deductionsOther || 0) +
      standardDeduction
    );
  }

  getTaxForYear(
    year: string,
    income: number,
    regime: 'old' | 'new'
  ): { tax: number; breakdown: TaxBreakdown[] } {
    const oldRegimeSlabsByYear: any = {
      '2023-24': {
        below60: [
          { upTo: 250000, rate: 0, label: 'Up to ₹2.5L' },
          { upTo: 500000, rate: 0.05, label: '₹2.5L - ₹5L' },
          { upTo: 1000000, rate: 0.2, label: '₹5L - ₹10L' },
          { upTo: Infinity, rate: 0.3, label: 'Above ₹10L' },
        ],
        senior: [
          { upTo: 300000, rate: 0, label: 'Up to ₹3L' },
          { upTo: 500000, rate: 0.05, label: '₹3L - ₹5L' },
          { upTo: 1000000, rate: 0.2, label: '₹5L - ₹10L' },
          { upTo: Infinity, rate: 0.3, label: 'Above ₹10L' },
        ],
      },
      '2024-25': {
        below60: [
          { upTo: 250000, rate: 0, label: 'Up to ₹2.5L' },
          { upTo: 500000, rate: 0.05, label: '₹2.5L - ₹5L' },
          { upTo: 1000000, rate: 0.2, label: '₹5L - ₹10L' },
          { upTo: Infinity, rate: 0.3, label: 'Above ₹10L' },
        ],
        senior: [
          { upTo: 300000, rate: 0, label: 'Up to ₹3L' },
          { upTo: 500000, rate: 0.05, label: '₹3L - ₹5L' },
          { upTo: 1000000, rate: 0.2, label: '₹5L - ₹10L' },
          { upTo: Infinity, rate: 0.3, label: 'Above ₹10L' },
        ],
      },
      '2025-26': {
        below60: [
          { upTo: 250000, rate: 0, label: 'Up to ₹2.5L' },
          { upTo: 500000, rate: 0.05, label: '₹2.5L - ₹5L' },
          { upTo: 1000000, rate: 0.2, label: '₹5L - ₹10L' },
          { upTo: Infinity, rate: 0.3, label: 'Above ₹10L' },
        ],
        senior: [
          { upTo: 300000, rate: 0, label: 'Up to ₹3L' },
          { upTo: 500000, rate: 0.05, label: '₹3L - ₹5L' },
          { upTo: 1000000, rate: 0.2, label: '₹5L - ₹10L' },
          { upTo: Infinity, rate: 0.3, label: 'Above ₹10L' },
        ],
      },
    };

    const newRegimeSlabsByYear: any = {
      '2023-24': [
        { upTo: 300000, rate: 0, label: 'Up to ₹3L' },
        { upTo: 600000, rate: 0.05, label: '₹3L - ₹6L' },
        { upTo: 900000, rate: 0.1, label: '₹6L - ₹9L' },
        { upTo: 1200000, rate: 0.15, label: '₹9L - ₹12L' },
        { upTo: 1500000, rate: 0.2, label: '₹12L - ₹15L' },
        { upTo: Infinity, rate: 0.3, label: 'Above ₹15L' },
      ],
      '2024-25': [
        { upTo: 300000, rate: 0, label: 'Up to ₹3L' },
        { upTo: 600000, rate: 0.05, label: '₹3L - ₹6L' },
        { upTo: 900000, rate: 0.1, label: '₹6L - ₹9L' },
        { upTo: 1200000, rate: 0.15, label: '₹9L - ₹12L' },
        { upTo: 1500000, rate: 0.2, label: '₹12L - ₹15L' },
        { upTo: Infinity, rate: 0.3, label: 'Above ₹15L' },
      ],
      '2025-26': [
        { upTo: 400000, rate: 0, label: 'Up to ₹4L' },
        { upTo: 800000, rate: 0.05, label: '₹4L - ₹8L' },
        { upTo: 1200000, rate: 0.1, label: '₹8L - ₹12L' },
        { upTo: 1600000, rate: 0.15, label: '₹12L - ₹16L' },
        { upTo: 2000000, rate: 0.2, label: '₹16L - ₹20L' },
        { upTo: 2400000, rate: 0.25, label: '₹20L - ₹24L' },
        { upTo: Infinity, rate: 0.3, label: 'Above ₹24L' },
      ],
    };

    const slabs =
      regime === 'old'
        ? oldRegimeSlabsByYear[year]?.[
            this.basicFormGroup.get('ageGroup')?.value
          ] || []
        : newRegimeSlabsByYear[year] || [];

    const result = this.calculateTaxBySlabs(income, slabs);
    const taxAfterRebate = this.applyRebate(income, result.tax, year, regime);

    return {
      tax: Math.max(0, taxAfterRebate),
      breakdown: result.breakdown,
    };
  }

  private applyRebate(
    income: number,
    tax: number,
    year: string,
    regime: 'old' | 'new'
  ): number {
    if (regime === 'old' && income <= 500000) return Math.max(0, tax - 12500);
    if (regime === 'new') {
      const rebateAmount = year === '2025-26' ? 75000 : 50000;
      const rebateLimit = year === '2025-26' ? 700000 : 500000;
      if (income <= rebateLimit) {
        return Math.max(0, tax - rebateAmount);
      }
    }
    return tax;
  }

  private calculateTaxBySlabs(
    income: number,
    slabRates: { upTo: number; rate: number; label: string }[]
  ): { tax: number; breakdown: TaxBreakdown[] } {
    let tax = 0;
    let prevLimit = 0;
    const breakdown: TaxBreakdown[] = [];

    for (const slab of slabRates) {
      if (income > prevLimit) {
        const taxable = Math.min(income, slab.upTo) - prevLimit;
        const slabTax = taxable * slab.rate;
        tax += slabTax;

        if (taxable > 0) {
          breakdown.push({
            slab: slab.label,
            rate: `${(slab.rate * 100).toFixed(0)}%`,
            amount: Math.round(slabTax),
          });
        }

        prevLimit = slab.upTo;
      } else break;
    }

    return {
      tax: Math.round(tax),
      breakdown,
    };
  }

  scrollToResults(): void {
    setTimeout(() => {
      if (this.resultSection) {
        this.resultSection.nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, 100);
  }
}
