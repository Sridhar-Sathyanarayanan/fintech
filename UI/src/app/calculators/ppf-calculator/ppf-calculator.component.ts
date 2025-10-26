import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MaterialModules } from '../../shared/material.standalone';

interface YearlyBreakdown {
  year: number;
  opening: number;
  deposit: number;
  interest: number;
  closing: number;
}

type FrequencyType = 'yearly' | 'halfyearly' | 'quarterly' | 'monthly';

@Component({
  selector: 'app-ppf-calculator',
  templateUrl: './ppf-calculator.component.html',
  styleUrls: ['./ppf-calculator.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    BaseChartDirective,
    MaterialModules,
  ],
})
export class PpfCalculatorComponent implements OnInit {
  frequency = signal<FrequencyType>('yearly');
  investmentAmount = signal(150000);
  years = signal(15);
  interestRate = signal(7.1); // Current PPF rate

  totalInvested = signal(0);
  interestEarned = signal(0);
  maturityAmount = signal(0);

  yearlyBreakdown: YearlyBreakdown[] = [];

  frequencyOptions = [
    {
      value: 'yearly' as FrequencyType,
      label: 'Yearly',
      icon: 'calendar_today',
    },
    {
      value: 'halfyearly' as FrequencyType,
      label: 'Half Yearly',
      icon: 'event_repeat',
    },
    {
      value: 'quarterly' as FrequencyType,
      label: 'Quarterly',
      icon: 'date_range',
    },
    {
      value: 'monthly' as FrequencyType,
      label: 'Monthly',
      icon: 'calendar_month',
    },
  ];

  // Doughnut Chart
  doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Total Invested', 'Interest Earned'],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ['#2196f3', '#4caf50'],
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
        label: 'PPF Balance',
        data: [],
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Total Invested',
        data: [],
        borderColor: '#2196f3',
        backgroundColor: 'rgba(33, 150, 243, 0.1)',
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
    this.calculatePPF();
  }

  onAmountChange(event: Event): void {
    // Ensure amount is within limits
    const input = event.target as HTMLInputElement;
    const clampedValue = Math.max(500, Math.min(150000, Number(input.value)));
    this.investmentAmount.set(clampedValue);
    this.calculatePPF();
  }

  onYearsChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.years.set(Number(input.value));
    this.calculatePPF();
  }

  onFrequencyChange(freq: FrequencyType): void {
    this.frequency.set(freq);
    this.calculatePPF();
  }

  calculatePPF(): void {
    const amount = this.investmentAmount();
    const years = this.years();
    const rate = this.interestRate() / 100;
    const freq = this.frequency();

    // Calculate deposits per year based on frequency
    const depositsPerYear = this.getDepositsPerYear(freq);
    const depositAmount = amount / depositsPerYear;

    this.yearlyBreakdown = [];
    let balance = 0;
    let totalDeposited = 0;

    for (let year = 1; year <= years; year++) {
      const openingBalance = balance;
      let yearlyInterest = 0;
      let yearlyDeposit = 0;

      // Simulate deposits throughout the year
      for (let i = 0; i < depositsPerYear; i++) {
        balance += depositAmount;
        yearlyDeposit += depositAmount;
        totalDeposited += depositAmount;

        // Interest calculated on balance at end of each month
        // PPF interest is compounded annually but calculated monthly
        const monthsRemaining = 12 - i * (12 / depositsPerYear);
        yearlyInterest +=
          (balance * rate * (monthsRemaining / 12)) / depositsPerYear;
      }

      // Add annual interest
      balance += yearlyInterest;

      this.yearlyBreakdown.push({
        year,
        opening: Math.round(openingBalance),
        deposit: Math.round(yearlyDeposit),
        interest: Math.round(yearlyInterest),
        closing: Math.round(balance),
      });
    }

    this.totalInvested.set(Math.round(totalDeposited));
    this.maturityAmount.set(Math.round(balance));
    this.interestEarned.set(Math.round(balance - totalDeposited));

    this.updateCharts();
  }

  private getDepositsPerYear(freq: FrequencyType): number {
    switch (freq) {
      case 'yearly':
        return 1;
      case 'halfyearly':
        return 2;
      case 'quarterly':
        return 4;
      case 'monthly':
        return 12;
      default:
        return 1;
    }
  }

  private updateCharts(): void {
    // Update Doughnut Chart
    this.doughnutChartData.datasets[0].data = [
      this.totalInvested(),
      this.interestEarned(),
    ];

    // Update Line Chart
    this.lineChartData.labels = this.yearlyBreakdown.map(
      (item) => `Year ${item.year}`
    );
    this.lineChartData.datasets[0].data = this.yearlyBreakdown.map(
      (item) => item.closing
    );
    this.lineChartData.datasets[1].data = this.yearlyBreakdown.map(
      (item, index) => this.investmentAmount() * (index + 1)
    );
  }

  get returnPercentage(): number {
    if (this.totalInvested() === 0) return 0;
    return (this.interestEarned() / this.totalInvested()) * 100;
  }

  get averageAnnualReturn(): number {
    if (this.years() === 0) return 0;
    return this.interestEarned() / this.years();
  }

  resetCalculator(): void {
    this.frequency.set('yearly');
    this.investmentAmount.set(150000);
    this.years.set(15);
    this.calculatePPF();
  }
}
