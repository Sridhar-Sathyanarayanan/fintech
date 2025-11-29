import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModules } from '../../shared/material.standalone';
import { HRACalculation, FAQItem, HRAExample, TaxTip } from '../../models/calculator.models';

@Component({
  selector: 'app-hra-calculator',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, MaterialModules],
  templateUrl: './hra-calculator.component.html',
  styleUrls: ['./hra-calculator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HRACalculatorComponent implements OnInit {
  hraForm!: FormGroup;
  calculationResult = signal<HRACalculation | null>(null);
  showResult = signal(false);
  isMetroCity = signal(true);

  cityTypes = [
    {
      value: 'metro',
      label: 'Metro City (Delhi, Mumbai, Kolkata, Chennai)',
      percentage: 50,
    },
    { value: 'non-metro', label: 'Non-Metro City', percentage: 40 },
  ];

  faqs: FAQItem[] = [
    {
      question: 'What is HRA (House Rent Allowance)?',
      answer:
        'HRA is a component of salary provided by employers to employees for meeting accommodation expenses. It is partially or fully exempt from income tax under Section 10(13A) of the Income Tax Act.',
      icon: 'home',
    },
    {
      question: 'Who can claim HRA exemption?',
      answer:
        'Salaried employees who live in rented accommodation and receive HRA as part of their salary can claim HRA exemption. Self-employed individuals cannot claim HRA exemption but can claim deduction under Section 80GG.',
      icon: 'person',
    },
    {
      question: 'What documents are required for HRA exemption?',
      answer:
        "You need rent receipts, rental agreement, landlord's PAN (if annual rent exceeds ₹1 lakh), and proof of rent payment (bank statements/cancelled cheques) to claim HRA exemption.",
      icon: 'description',
    },
    {
      question: 'Can I claim HRA if I live in my own house?',
      answer:
        'No, HRA exemption can only be claimed if you are living in a rented accommodation. However, you can claim home loan interest deduction under Section 24(b) if you own a house.',
      icon: 'block',
    },
    {
      question: 'What is the difference between metro and non-metro cities?',
      answer:
        'Metro cities (Delhi, Mumbai, Kolkata, Chennai) allow 50% of basic salary as HRA exemption, while non-metro cities allow 40% of basic salary.',
      icon: 'location_city',
    },
    {
      question: 'Can I claim HRA and home loan interest together?',
      answer:
        'Yes, you can claim both HRA exemption for a rented house and home loan interest deduction for a house owned in a different city, subject to conditions.',
      icon: 'account_balance',
    },
  ];

  hraExamples: HRAExample[] = [
    {
      title: 'Metro City Example',
      description:
        'Living in Mumbai with ₹50,000 basic salary, ₹20,000 HRA, and ₹15,000 monthly rent',
      icon: 'apartment',
      color: 'primary',
    },
    {
      title: 'Non-Metro Example',
      description:
        'Living in Pune with ₹40,000 basic salary, ₹15,000 HRA, and ₹12,000 monthly rent',
      icon: 'home_work',
      color: 'accent',
    },
    {
      title: 'Maximum Exemption',
      description:
        'Higher rent with lower HRA can maximize your tax savings through proper calculation',
      icon: 'trending_up',
      color: 'primary',
    },
    {
      title: 'Shared Accommodation',
      description:
        'Even in shared accommodation, you can claim HRA based on your share of rent paid',
      icon: 'people',
      color: 'accent',
    },
  ];

  taxTips: TaxTip[] = [
    {
      title: 'Maintain Rent Receipts',
      description:
        'Keep all rent receipts organized and get them signed by your landlord each month',
      icon: 'receipt_long',
    },
    {
      title: "Landlord's PAN Required",
      description:
        "If annual rent exceeds ₹1 lakh, landlord's PAN is mandatory for claiming exemption",
      icon: 'credit_card',
    },
    {
      title: 'Declaration to Employer',
      description:
        'Submit HRA declaration and proofs to your employer at the beginning of financial year',
      icon: 'assignment',
    },
    {
      title: 'Calculate Quarterly',
      description:
        'Review your HRA calculations quarterly to optimize tax planning throughout the year',
      icon: 'calendar_today',
    },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.hraForm = this.fb.group({
      basicSalary: [50000, [Validators.required, Validators.min(0)]],
      dearnessAllowance: [0, [Validators.min(0)]],
      hraReceived: [20000, [Validators.required, Validators.min(0)]],
      rentPaid: [15000, [Validators.required, Validators.min(0)]],
      cityType: ['metro', Validators.required],
    });

    // Subscribe to city type changes
    this.hraForm.get('cityType')?.valueChanges.subscribe((value) => {
      this.isMetroCity.set(value === 'metro');
    });
  }

  calculateHRA(): void {
    if (this.hraForm.valid) {
      const formValue = this.hraForm.value;
      const basicSalary = Number(formValue.basicSalary) || 0;
      const da = Number(formValue.dearnessAllowance) || 0;
      const hraReceived = Number(formValue.hraReceived) || 0;
      const monthlyRent = Number(formValue.rentPaid) || 0;
      const cityType = formValue.cityType;

      const basicPlusDA = basicSalary + da;
      const annualRent = monthlyRent * 12;
      const tenPercentBasic = basicPlusDA * 0.1 * 12;
      const excessRent = Math.max(0, annualRent - tenPercentBasic);

      const cityPercentage = cityType === 'metro' ? 0.5 : 0.4;
      const percentageBasic = basicPlusDA * cityPercentage * 12;

      const actualHRAReceived = hraReceived * 12;

      const exemptHRA = Math.min(
        actualHRAReceived,
        excessRent,
        percentageBasic
      );
      const taxableHRA = Math.max(0, actualHRAReceived - exemptHRA);

      const calculation: HRACalculation = {
        actualHRA: actualHRAReceived,
        rentPaid: annualRent,
        tenPercentBasic: tenPercentBasic,
        excessRent: excessRent,
        fiftyPercentBasic: basicPlusDA * 0.5 * 12,
        fortyPercentBasic: basicPlusDA * 0.4 * 12,
        exemptHRA: exemptHRA,
        taxableHRA: taxableHRA,
        cityType: cityType,
      };

      this.calculationResult.set(calculation);
      this.showResult.set(true);

      // Smooth scroll to results
      setTimeout(() => {
        const element = document.getElementById('results-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      this.markFormGroupTouched(this.hraForm);
    }
  }

  resetForm(): void {
    this.hraForm.reset({
      basicSalary: 50000,
      dearnessAllowance: 0,
      hraReceived: 20000,
      rentPaid: 15000,
      cityType: 'metro',
    });
    this.showResult.set(false);
    this.calculationResult.set(null);
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  }

  getErrorMessage(fieldName: string): string {
    const control = this.hraForm.get(fieldName);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    if (control?.hasError('min')) {
      return 'Value must be greater than or equal to 0';
    }
    return '';
  }

  downloadReport(): void {
    // Implement PDF download logic
  }

  shareResults(): void {
    // Implement share logic
  }
}
