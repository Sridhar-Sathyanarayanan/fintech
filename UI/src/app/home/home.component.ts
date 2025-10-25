import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatRippleModule } from '@angular/material/core';
import { MaterialModules } from '../shared/material.standalone';

interface FinancialTool {
  icon: string;
  title: string;
  desc: string;
  color: string;
  route: string;
}

interface FinancialFact {
  title: string;
  content: string;
  icon: string;
}

interface Statistic {
  value: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MaterialModules
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  currentSlide = signal(0);
  intervalId: any;

  financeImages = [
    '/assets/images/slide1.jpg',
    '/assets/images/slide2.jpg',
    '/assets/images/slide3.jpg',
  ];

  financialTools: FinancialTool[] = [
    {
      icon: 'calculate',
      title: 'Tax Calculator',
      desc: 'Compare old vs new tax regimes instantly with detailed breakdowns and recommendations.',
      color: 'primary',
      route: '/calculator'
    },
    {
      icon: 'trending_up',
      title: 'Investment Tracker',
      desc: 'Monitor your portfolio performance and project future growth with advanced analytics.',
      color: 'accent',
      route: '/investments'
    },
    {
      icon: 'savings',
      title: 'Budget Planner',
      desc: 'Create smart budgets, track expenses, and achieve your savings goals faster.',
      color: 'primary',
      route: '/budget'
    },
    {
      icon: 'account_balance',
      title: 'Loan Calculator',
      desc: 'Calculate EMIs, compare loan options, and plan your repayment strategy.',
      color: 'accent',
      route: '/loans'
    },
  ];

  financialFacts: FinancialFact[] = [
    {
      icon: 'emergency',
      title: 'Emergency Fund Essential',
      content: 'Financial experts recommend maintaining 3–6 months of living expenses in an easily accessible emergency fund to protect against unexpected situations.'
    },
    {
      icon: 'receipt_long',
      title: 'Maximize Tax Savings',
      content: 'Section 80C allows up to ₹1.5 lakh deduction under the old tax regime through various investment options like PPF, ELSS, and life insurance.'
    },
    {
      icon: 'auto_graph',
      title: 'Power of Compounding',
      content: 'Starting investments early can dramatically increase wealth. A 25-year-old investing ₹5,000 monthly can accumulate significantly more than starting at 35.'
    },
    {
      icon: 'credit_card',
      title: 'Credit Score Matters',
      content: 'Maintaining a credit score above 750 can help you secure loans at lower interest rates and better terms, saving lakhs over the loan tenure.'
    },
  ];

  statistics: Statistic[] = [
    { value: '10K+', label: 'Active Users', icon: 'people' },
    { value: '₹50Cr+', label: 'Wealth Managed', icon: 'account_balance_wallet' },
    { value: '25K+', label: 'Calculations Done', icon: 'calculate' },
    { value: '4.8★', label: 'User Rating', icon: 'star' },
  ];

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startAutoSlide(): void {
    this.intervalId = setInterval(() => this.nextSlide(), 5000);
  }

  nextSlide(): void {
    this.currentSlide.update(val => (val + 1) % this.financeImages.length);
  }

  prevSlide(): void {
    this.currentSlide.update(val =>
      (val - 1 + this.financeImages.length) % this.financeImages.length
    );
  }

  onSlideIndicatorClick(index: number): void {
    this.currentSlide.set(index);
    clearInterval(this.intervalId);
    this.startAutoSlide();
  }
}