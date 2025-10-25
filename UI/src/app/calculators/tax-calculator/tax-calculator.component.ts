import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MaterialModules } from '../../shared/material.standalone';
import { MatStepper } from '@angular/material/stepper';

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
  selectedYear: string | null = null;

  oldRegimeTax: number = 0;
  newRegimeTax: number = 0;
  currentStep = 0; // Step navigation: 0 = Basic, 1 = Income, 2 = Deductions

  taxCalcForm: FormGroup;
  showTaxDetails = false;
  deductionFields = [
    { label: 'Section 80C (max ₹1,50,000)', control: 'deductions80C' },
    { label: 'Section 80D (Medical Insurance)', control: 'deductions80D' },
    {
      label: 'Section 80TTA (Interest on Savings)',
      control: 'deductions80TTA',
    },
    { label: 'Section 80G (Donations to Charity)', control: 'deductions80G' },
    { label: 'Section 80CCD(2) (Employer’s NPS)', control: 'deductions80CCD2' },
    {
      label: 'Section 80EEA (Housing Loan Interest)',
      control: 'deductions80EEA',
    },
    { label: 'Section 80CCD (Employee’s NPS)', control: 'deductions80CCD' },
    { label: 'Other Deductions', control: 'deductionsOther' },
  ];
  isSmallScreen = false;

  get deductionsFormGroup(): FormGroup {
    return this.taxCalcForm.get('deductions') as FormGroup;
  }

  get incomeFormGroup(): FormGroup {
    return this.taxCalcForm.get('incomeDetails') as FormGroup;
  }

  get basicFormGroup(): FormGroup {
    return this.taxCalcForm.get('basicDetails') as FormGroup;
  }

  resetCalculator() {
    // Reset all form groups
    this.taxCalcForm.reset();
    this.basicFormGroup.reset();
    this.incomeFormGroup.reset();
    this.deductionsFormGroup.reset();

    this.showTaxDetails = false;

    // Go back to the first step
    this.stepper.reset();
    // Reset deduction fields
    for (let field of this.deductionFields) {
      this.deductionsFormGroup.get(field.control)?.setValue(null);
    }
  }

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isSmallScreen = result.matches;
      });
  }
  ngOnInit(): void {
    this.showTaxDetails = false;
    this.taxCalcForm = new FormGroup({
      basicDetails: new FormGroup({
        assessmentYear: new FormControl('', Validators.required),
        ageGroup: new FormControl('', Validators.required),
      }),
      incomeDetails: new FormGroup({
        income: new FormControl('', Validators.required),
        otherIncome: new FormControl(''),
      }),
      deductions: new FormGroup({
        deductions80C: new FormControl(''),
        deductions80D: new FormControl(''),
        deductions80TTA: new FormControl(''),
        deductions80G: new FormControl(''),
        deductions80CCD2: new FormControl(''),
        deductions80EEA: new FormControl(''),
        deductions80CCD: new FormControl(''),
        deductionsOther: new FormControl(''),
      }),
    });
  }

  nextStep(): void {
    if (this.currentStep < 2) this.currentStep++;
    this.showTaxDetails = false;
  }

  prevStep(): void {
    if (this.currentStep > 0) this.currentStep--;
    this.showTaxDetails = false;
  }

  calculateTax(): void {
    const totalDeductions = this.getOldRegimeDeductions();
    this.showTaxDetails = true;
    const taxableOld = Math.max(
      0,
      this.taxCalcForm.value.incomeDetails.income - totalDeductions
    );

    this.oldRegimeTax = this.getTaxForYear(
      this.taxCalcForm.value.basicDetails.assessmentYear,
      taxableOld,
      'old'
    );
    this.newRegimeTax = this.getTaxForYear(
      this.taxCalcForm.value.basicDetails.assessmentYear,
      this.taxCalcForm.value.incomeDetails.income,
      'new'
    );

    this.scrollToResults();
  }

  private getOldRegimeDeductions(): number {
    const {
      deductions80C = 0,
      deductions80D = 0,
      deductions80TTA = 0,
      deductions80G = 0,
      deductions80CCD = 0,
      deductions80CCD2 = 0,
      deductions80EEA = 0,
      deductionsOther = 0,
    } = this.taxCalcForm.value.deductions;
    const standardDeduction: number = 50000;

    return (
      Math.min(deductions80C, 150000) +
      Math.min(deductions80D, 100000) +
      Math.min(deductions80TTA, 50000) +
      Math.min(deductions80CCD, 50000) +
      Math.min(deductions80CCD2, 100000) +
      Number(deductions80G) +
      Number(deductions80EEA) +
      Number(deductionsOther) +
      Number(standardDeduction)
    );
  }

  getTaxForYear(year: string, income: number, regime: 'old' | 'new'): number {
    const oldRegimeSlabsByYear: any = {
      '2023-24': {
        below60: [
          { upTo: 250000, rate: 0 },
          { upTo: 500000, rate: 0.05 },
          { upTo: 1000000, rate: 0.2 },
          { upTo: Infinity, rate: 0.3 },
        ],
        senior: [
          { upTo: 300000, rate: 0 },
          { upTo: 500000, rate: 0.05 },
          { upTo: 1000000, rate: 0.2 },
          { upTo: Infinity, rate: 0.3 },
        ],
      },
      '2024-25': {
        below60: [
          { upTo: 250000, rate: 0 },
          { upTo: 500000, rate: 0.05 },
          { upTo: 1000000, rate: 0.2 },
          { upTo: Infinity, rate: 0.3 },
        ],
        senior: [
          { upTo: 300000, rate: 0 },
          { upTo: 500000, rate: 0.05 },
          { upTo: 1000000, rate: 0.2 },
          { upTo: Infinity, rate: 0.3 },
        ],
      },
      '2025-26': {
        below60: [
          { upTo: 250000, rate: 0 },
          { upTo: 500000, rate: 0.05 },
          { upTo: 1000000, rate: 0.2 },
          { upTo: Infinity, rate: 0.3 },
        ],
        senior: [
          { upTo: 300000, rate: 0 },
          { upTo: 500000, rate: 0.05 },
          { upTo: 1000000, rate: 0.2 },
          { upTo: Infinity, rate: 0.3 },
        ],
      },
    };

    const newRegimeSlabsByYear: any = {
      '2023-24': [
        { upTo: 300000, rate: 0 },
        { upTo: 600000, rate: 0.05 },
        { upTo: 900000, rate: 0.1 },
        { upTo: 1200000, rate: 0.15 },
        { upTo: 1500000, rate: 0.2 },
        { upTo: Infinity, rate: 0.3 },
      ],
      '2024-25': [
        { upTo: 300000, rate: 0 },
        { upTo: 600000, rate: 0.05 },
        { upTo: 900000, rate: 0.1 },
        { upTo: 1200000, rate: 0.15 },
        { upTo: 1500000, rate: 0.2 },
        { upTo: Infinity, rate: 0.3 },
      ],
      '2025-26': [
        { upTo: 400000, rate: 0 },
        { upTo: 800000, rate: 0.05 },
        { upTo: 1200000, rate: 0.1 },
        { upTo: 1600000, rate: 0.15 },
        { upTo: 2000000, rate: 0.2 },
        { upTo: 2400000, rate: 0.25 },
        { upTo: Infinity, rate: 0.3 },
      ],
    };

    const slabs =
      regime === 'old'
        ? oldRegimeSlabsByYear[year]?.[
            this.taxCalcForm.value.basicDetails.ageGroup
          ] || []
        : newRegimeSlabsByYear[year] || [];

    return Math.max(
      0,
      this.applyRebate(
        income,
        this.calculateTaxBySlabs(income, slabs),
        year,
        regime
      )
    );
  }

  private applyRebate(
    income: number,
    tax: number,
    year: string,
    regime: 'old' | 'new'
  ): number {
    if (regime === 'old' && income <= 500000) return Math.max(0, tax - 12500);
    if (regime === 'new') {
      const rebateYears = ['2023-24', '2024-25', '2025-26'];
      const taxForNew = year === '2025-26' ? 75000 : 50000;
      if (rebateYears.includes(year)) {
        return Math.max(0, tax - taxForNew);
      }
    }
    return tax;
  }

  private calculateTaxBySlabs(
    income: number,
    slabRates: { upTo: number; rate: number }[]
  ): number {
    let tax = 0;
    let prevLimit = 0;

    for (const slab of slabRates) {
      if (income > prevLimit) {
        const taxable = Math.min(income, slab.upTo) - prevLimit;
        tax += taxable * slab.rate;
        prevLimit = slab.upTo;
      } else break;
    }

    return Math.round(tax);
  }

  scrollToResults(): void {
    setTimeout(() => {
      if (this.resultSection) {
        this.resultSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }

  get taxDifference(): number {
    return Math.abs(this.oldRegimeTax - this.newRegimeTax);
  }
  ngAfterViewInit() {
    // In Angular Material 20, steppers use number indicators by default
    // No need to manually set the indicator type
  }
}
