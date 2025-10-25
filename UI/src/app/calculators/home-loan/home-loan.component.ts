import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions, ChartType } from 'chart.js';
import { MaterialModules } from '../../shared/material.standalone';

@Component({
  selector: 'app-home-loan',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModules, BaseChartDirective],
  templateUrl: './home-loan.component.html',
  styleUrl: './home-loan.component.scss',
})
export class HomeLoanCalculatorComponent {
  loanAmount: number = 500000; // Default ₹5L
  interestRate: number = 8.5; // Default 8.5%
  loanTenure: number = 20; // Default 20 years

  monthlyEMI: number = 0;
  totalInterest: number = 0;
  totalPayment: number = 0;
  emiCalculated: boolean = false;

  pieChartLabels: any = ['Principal Amount', 'Interest Amount'];
  pieChartData: any = [0, 0];
  pieChartType: any = 'doughnut';
  pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  calculateEMI() {
    const monthlyRate = this.interestRate / 12 / 100;
    const numberOfMonths = this.loanTenure * 12;

    this.monthlyEMI =
      (this.loanAmount *
        monthlyRate *
        Math.pow(1 + monthlyRate, numberOfMonths)) /
      (Math.pow(1 + monthlyRate, numberOfMonths) - 1);

    this.totalPayment = this.monthlyEMI * numberOfMonths;
    this.totalInterest = this.totalPayment - this.loanAmount;

    this.updateChart();
    this.emiCalculated = true;
  }

  updateChart() {
    this.pieChartData = [this.loanAmount, this.totalInterest];
  }

  updateCalculation() {
    if (this.emiCalculated) {
      this.calculateEMI();
    }
  }
}
