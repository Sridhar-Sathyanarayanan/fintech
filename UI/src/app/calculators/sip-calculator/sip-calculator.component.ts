import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { MaterialModules } from '../../shared/material.standalone';

@Component({
  selector: 'app-sip-calculator',
  templateUrl: './sip-calculator.component.html',
  styleUrls: ['./sip-calculator.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MaterialModules,
    RouterLink,
    BaseChartDirective,
  ],
})
export class SipCalculatorComponent {
  amount: number = 10000;
  years: number = 10;
  interestRate: number = 12;
  investmentType: any = 'Monthly';
  investedAmount: number = 0;
  expectedReturn: number = 0;
  totalValue: number = 0;

  doughnutChartLabels = ['Invested Amount', 'Expected Return'];
  doughnutChartData: number[] = [];
  doughnutChartType: any = 'doughnut';

  calculate() {
    if (this.amount <= 0 || this.years <= 0 || this.interestRate <= 0) {
      this.investedAmount = this.expectedReturn = this.totalValue = 0;
      this.doughnutChartData = [];
      return;
    }

    // Calculate SIP Future Value for monthly investment
    const p = this.amount; // monthly investment
    const r = this.interestRate / 100 / 12; // monthly interest rate
    const n = this.years * 12; // total months

    const fv = p * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    this.investedAmount = p * n;
    this.expectedReturn = fv - this.investedAmount;
    this.totalValue = fv;

    this.doughnutChartData = [this.investedAmount, this.expectedReturn];
  }

  ngOnInit() {
    this.calculate();
  }
}
