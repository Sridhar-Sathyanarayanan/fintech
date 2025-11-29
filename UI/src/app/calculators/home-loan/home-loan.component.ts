import { Component, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { MaterialModules } from '../../shared/material.standalone';

interface YearlyBreakdown {
  year: number;
  openingBalance: number;
  emiPaid: number;
  principal: number;
  interest: number;
  closingBalance: number;
}

@Component({
  selector: 'app-home-loan-calculator',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    BaseChartDirective,
    MaterialModules,
  ],
  templateUrl: './home-loan.component.html',
  styleUrls: ['./home-loan.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeLoanCalculatorComponent implements OnInit {
  loanAmount = signal(5000000);
  interestRate = signal(8.5);
  loanTenure = signal(20);

  monthlyEMI = signal(0);
  totalInterest = signal(0);
  totalPayment = signal(0);

  yearlyBreakdown: YearlyBreakdown[] = [];

  // Doughnut Chart
  doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Principal Amount', 'Total Interest'],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ['#ff9800', '#f44336'],
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

  // Line Chart for Principal vs Interest
  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        label: 'Outstanding Principal',
        data: [],
        borderColor: '#ff9800',
        backgroundColor: 'rgba(255, 152, 0, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
      {
        label: 'Cumulative Interest',
        data: [],
        borderColor: '#f44336',
        backgroundColor: 'rgba(244, 67, 54, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5,
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
    this.calculateEMI();
  }

  onAmountChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.loanAmount.set(
      Math.max(100000, Math.min(100000000, Number(input.value)))
    );
    this.calculateEMI();
  }

  onRateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.interestRate.set(Math.max(5, Math.min(20, Number(input.value))));
    this.calculateEMI();
  }

  onTenureChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.loanTenure.set(Math.max(1, Math.min(30, Number(input.value))));
    this.calculateEMI();
  }

  calculateEMI(): void {
    const principal = this.loanAmount();
    const monthlyRate = this.interestRate() / 12 / 100;
    const months = this.loanTenure() * 12;

    // EMI Formula: P × r × (1 + r)^n / ((1 + r)^n - 1)
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    this.monthlyEMI.set(Math.round(emi));
    this.totalPayment.set(Math.round(emi * months));
    this.totalInterest.set(Math.round(emi * months - principal));

    this.calculateYearlyBreakdown();
    this.updateCharts();
  }

  private calculateYearlyBreakdown(): void {
    this.yearlyBreakdown = [];
    const monthlyRate = this.interestRate() / 12 / 100;
    const emi = this.monthlyEMI();
    let balance = this.loanAmount();
    let cumulativeInterest = 0;

    for (let year = 1; year <= this.loanTenure(); year++) {
      const openingBalance = balance;
      let yearlyPrincipal = 0;
      let yearlyInterest = 0;

      // Calculate for 12 months
      for (let month = 1; month <= 12; month++) {
        const interest = balance * monthlyRate;
        const principal = emi - interest;

        yearlyPrincipal += principal;
        yearlyInterest += interest;
        balance -= principal;
        cumulativeInterest += interest;

        if (balance < 0.01) {
          balance = 0;
          break;
        }
      }

      this.yearlyBreakdown.push({
        year,
        openingBalance: Math.round(openingBalance),
        emiPaid: Math.round(emi * 12),
        principal: Math.round(yearlyPrincipal),
        interest: Math.round(yearlyInterest),
        closingBalance: Math.round(Math.max(0, balance)),
      });

      if (balance <= 0) break;
    }
  }

  private updateCharts(): void {
    // Update Doughnut Chart
    this.doughnutChartData.datasets[0].data = [
      this.loanAmount(),
      this.totalInterest(),
    ];

    // Update Line Chart
    this.lineChartData.labels = this.yearlyBreakdown.map(
      (item) => `Year ${item.year}`
    );
    this.lineChartData.datasets[0].data = this.yearlyBreakdown.map(
      (item) => item.closingBalance
    );

    // Calculate cumulative interest
    let cumulative = 0;
    const cumulativeInterest = this.yearlyBreakdown.map((item) => {
      cumulative += item.interest;
      return cumulative;
    });
    this.lineChartData.datasets[1].data = cumulativeInterest;
  }

  get principalPercentage(): number {
    if (this.totalPayment() === 0) return 0;
    return (this.loanAmount() / this.totalPayment()) * 100;
  }

  get interestPercentage(): number {
    if (this.totalPayment() === 0) return 0;
    return (this.totalInterest() / this.totalPayment()) * 100;
  }

  resetCalculator(): void {
    this.loanAmount.set(5000000);
    this.interestRate.set(8.5);
    this.loanTenure.set(20);
    this.calculateEMI();
  }
}
