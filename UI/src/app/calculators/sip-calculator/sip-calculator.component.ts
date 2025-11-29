import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MaterialModules } from '../../shared/material.standalone';

interface YearlyBreakdown {
  year: number;
  invested: number;
  value: number;
  gain: number;
}

interface FAQItem {
  question: string;
  answer: string;
  expanded: boolean;
}

@Component({
  selector: 'app-sip-calculator',
  templateUrl: './sip-calculator.component.html',
  styleUrls: ['./sip-calculator.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    BaseChartDirective,
    MaterialModules,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SipCalculatorComponent implements OnInit {
  amount = signal(5000);
  years = signal(10);
  interestRate = signal(12);
  investmentType = signal<'monthly' | 'lumpsum'>('monthly');

  investedAmount = signal(0);
  expectedReturn = signal(0);
  totalValue = signal(0);
  monthlyGrowth = signal(0);

  yearlyBreakdown: YearlyBreakdown[] = [];

  // FAQ Section
  faqs: FAQItem[] = [
    {
      question: 'What is SIP and how does it work?',
      answer: 'SIP (Systematic Investment Plan) is a method of investing a fixed amount regularly in mutual funds. It works by automatically deducting a set amount from your bank account at regular intervals (monthly, quarterly) and investing it in your chosen mutual fund scheme. This disciplined approach helps in wealth creation through the power of compounding and rupee cost averaging.',
      expanded: false
    },
    {
      question: 'What is the minimum amount required to start a SIP?',
      answer: 'Most mutual funds in India allow you to start a SIP with as little as ₹500 per month. However, some funds may have higher minimum amounts (₹1,000 or ₹5,000). The amount can be increased or decreased based on your financial capacity and investment goals.',
      expanded: false
    },
    {
      question: 'Can I stop or pause my SIP anytime?',
      answer: 'Yes, SIPs offer complete flexibility. You can pause, stop, or modify your SIP amount at any time without any penalty (subject to fund house guidelines). However, it\'s recommended to stay invested for the long term to maximize returns through compounding. You can also temporarily pause your SIP for a few months if needed.',
      expanded: false
    },
    {
      question: 'What returns can I expect from SIP investments?',
      answer: 'Returns on SIP investments depend on market performance and the type of mutual fund chosen. Historically, equity mutual funds have delivered 12-15% annual returns over long periods (10+ years). Debt funds typically offer 7-9% returns. However, past performance doesn\'t guarantee future returns. The calculator provides estimates based on expected returns, but actual returns may vary.',
      expanded: false
    },
    {
      question: 'Is SIP better than lumpsum investment?',
      answer: 'Both have their advantages. SIP is ideal for salaried individuals as it promotes disciplined investing, reduces market timing risk through rupee cost averaging, and requires smaller regular amounts. Lumpsum works better when you have a large amount available and markets are at lower levels. For most investors, SIP is recommended as it reduces the impact of market volatility.',
      expanded: false
    },
    {
      question: 'How is SIP taxed in India?',
      answer: 'Tax treatment depends on the fund type and holding period. For Equity Funds: Long-term gains (>1 year) above ₹1 lakh are taxed at 10%; short-term gains are taxed at 15%. For Debt Funds: Gains are taxed as per your income tax slab. ELSS (tax-saving) funds offer deduction up to ₹1.5 lakh under Section 80C with a 3-year lock-in period.',
      expanded: false
    },
    {
      question: 'Can I invest in multiple SIPs?',
      answer: 'Yes, you can invest in multiple SIPs across different mutual fund schemes. This helps in diversification and spreading risk. You can have SIPs in equity funds, debt funds, hybrid funds, and sector-specific funds based on your risk appetite and financial goals. However, ensure you don\'t over-diversify as it can dilute returns.',
      expanded: false
    },
    {
      question: 'What is Step-Up SIP?',
      answer: 'Step-Up SIP allows you to increase your SIP amount periodically (yearly or half-yearly) by a fixed percentage or amount. For example, if you start with ₹5,000 per month and increase it by 10% annually, your wealth accumulation accelerates significantly. This is ideal for salaried individuals expecting salary increments and helps achieve financial goals faster.',
      expanded: false
    }
  ];

  // Doughnut Chart
  doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Invested Amount', 'Expected Returns'],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ['#667eea', '#4caf50'],
        borderWidth: 0,
        hoverOffset: 10,
      },
    ],
  };

  doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 15,
          font: {
            size: 12,
            weight: 'bold',
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: ₹${value.toLocaleString('en-IN')}`;
          },
        },
      },
    },
  };

  // Line Chart for Growth
  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        label: 'Total Value',
        data: [],
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Invested Amount',
        data: [],
        borderColor: '#667eea',
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          padding: 15,
          font: {
            size: 12,
            weight: 'bold',
          },
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.parsed.y || 0;
            return `${label}: ₹${value.toLocaleString('en-IN', {
              maximumFractionDigits: 0,
            })}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) =>
            '₹' +
            Number(value).toLocaleString('en-IN', { maximumFractionDigits: 0 }),
        },
      },
    },
  };

  ngOnInit(): void {
    this.calculate();
  }

  onAmountChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.amount.set(Number(input.value));
    this.calculate();
  }

  onYearsChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.years.set(Number(input.value));
    this.calculate();
  }

  onInterestRateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.interestRate.set(Number(input.value));
    this.calculate();
  }

  onInvestmentTypeChange(type: 'monthly' | 'lumpsum'): void {
    this.investmentType.set(type);
    this.calculate();
  }

  calculate(): void {
    const amount = this.amount();
    const years = this.years();
    const rate = this.interestRate();

    if (amount <= 0 || years <= 0 || rate <= 0) {
      this.resetValues();
      return;
    }

    if (this.investmentType() === 'monthly') {
      this.calculateMonthlySIP(amount, years, rate);
    } else {
      this.calculateLumpsum(amount, years, rate);
    }

    this.updateCharts();
  }

  private calculateMonthlySIP(
    amount: number,
    years: number,
    rate: number
  ): void {
    const monthlyRate = rate / 100 / 12;
    const months = years * 12;

    // SIP Future Value Formula: FV = P × [((1 + r)^n - 1) / r] × (1 + r)
    // Where: P = Monthly investment, r = Monthly rate, n = Number of months
    const futureValue =
      amount *
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate);

    const invested = amount * months;
    const returns = futureValue - invested;

    this.investedAmount.set(Math.round(invested));
    this.expectedReturn.set(Math.round(returns));
    this.totalValue.set(Math.round(futureValue));
    this.monthlyGrowth.set(Math.round(returns / months));

    // Calculate yearly breakdown
    this.calculateYearlyBreakdown(amount, years, rate);
  }

  private calculateLumpsum(amount: number, years: number, rate: number): void {
    // Compound Interest Formula: FV = P × (1 + r)^n
    const futureValue = amount * Math.pow(1 + rate / 100, years);
    const returns = futureValue - amount;

    this.investedAmount.set(amount);
    this.expectedReturn.set(Math.round(returns));
    this.totalValue.set(Math.round(futureValue));
    this.monthlyGrowth.set(Math.round(returns / (years * 12)));

    // Calculate yearly breakdown for lumpsum
    this.calculateLumpsumYearlyBreakdown(amount, years, rate);
  }

  private calculateYearlyBreakdown(
    monthlyAmount: number,
    totalYears: number,
    annualRate: number
  ): void {
    const monthlyRate = annualRate / 100 / 12;
    this.yearlyBreakdown = [];

    for (let year = 1; year <= totalYears; year++) {
      const months = year * 12;
      const invested = monthlyAmount * months;
      const value =
        monthlyAmount *
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
        (1 + monthlyRate);
      const gain = value - invested;

      this.yearlyBreakdown.push({
        year,
        invested: Math.round(invested),
        value: Math.round(value),
        gain: Math.round(gain),
      });
    }
  }

  private calculateLumpsumYearlyBreakdown(
    amount: number,
    totalYears: number,
    annualRate: number
  ): void {
    this.yearlyBreakdown = [];

    for (let year = 1; year <= totalYears; year++) {
      const value = amount * Math.pow(1 + annualRate / 100, year);
      const gain = value - amount;

      this.yearlyBreakdown.push({
        year,
        invested: amount,
        value: Math.round(value),
        gain: Math.round(gain),
      });
    }
  }

  private updateCharts(): void {
    // Update Doughnut Chart
    this.doughnutChartData.datasets[0].data = [
      this.investedAmount(),
      this.expectedReturn(),
    ];

    // Update Line Chart
    this.lineChartData.labels = this.yearlyBreakdown.map(
      (item) => `Year ${item.year}`
    );
    this.lineChartData.datasets[0].data = this.yearlyBreakdown.map(
      (item) => item.value
    );
    this.lineChartData.datasets[1].data = this.yearlyBreakdown.map(
      (item) => item.invested
    );
  }

  private resetValues(): void {
    this.investedAmount.set(0);
    this.expectedReturn.set(0);
    this.totalValue.set(0);
    this.monthlyGrowth.set(0);
    this.yearlyBreakdown = [];
    this.doughnutChartData.datasets[0].data = [0, 0];
  }

  get returnPercentage(): number {
    if (this.investedAmount() === 0) return 0;
    return (this.expectedReturn() / this.investedAmount()) * 100;
  }

  get absoluteReturns(): number {
    return this.expectedReturn();
  }

  resetCalculator(): void {
    this.amount.set(5000);
    this.years.set(10);
    this.interestRate.set(12);
    this.investmentType.set('monthly');
    this.calculate();
  }

  toggleFAQ(index: number): void {
    this.faqs[index].expanded = !this.faqs[index].expanded;
  }
}