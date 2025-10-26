import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
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

    // SIP Future Value Formula
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
}
