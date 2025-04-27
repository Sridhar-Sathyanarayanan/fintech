import { Component } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-sip-calculator',
  templateUrl: './sip-calculator.component.html',
  styleUrls: ['./sip-calculator.component.scss'],
  standalone: false
})
export class SipCalculatorComponent {
  investmentType: 'lumpsum' | 'monthly' = 'monthly';
  amount: number = 0;
  years: number = 0;
  interestRate: number = 0;

  investedAmount: number = 0;
  expectedReturn: number = 0;
  totalValue: number = 0;

  // Chart
  public doughnutChartLabels = ['Invested Amount', 'Return'];
  public doughnutChartData: number[] = [0, 0];
  public doughnutChartType: ChartType = 'doughnut';
  constructor() {}

  calculate() {
    const n = this.years;
    const r = this.interestRate / 100;

    if (this.investmentType === 'monthly') {
      const futureValue = this.amount * (((Math.pow(1 + r / 12, 12 * n)) - 1) / (r / 12)) * (1 + r / 12);
      this.investedAmount = this.amount * 12 * n;
      this.totalValue = futureValue;
    } else {
      const futureValue = this.amount * Math.pow((1 + r), n);
      this.investedAmount = this.amount;
      this.totalValue = futureValue;
    }

    this.expectedReturn = this.totalValue - this.investedAmount;

    this.doughnutChartData = [this.investedAmount, this.expectedReturn];
  }
}
