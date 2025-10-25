import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { MaterialModules } from '../../shared/material.standalone';

@Component({
  selector: 'app-ppf-calculator',
  templateUrl: './ppf-calculator.component.html',
  styleUrls: ['./ppf-calculator.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MaterialModules,
    BaseChartDirective,
  ],
})
export class PpfCalculatorComponent implements OnInit {
  frequency = 'yearly';
  investmentAmount = 15000;
  years = 15;

  totalInvested = 0;
  interestEarned = 0;
  maturityAmount = 0;

  doughnutChartLabels: any = ['Invested Amount', 'Interest Earned'];
  doughnutChartData: any = [0, 0];
  doughnutChartType: any = 'doughnut';

  ngOnInit() {
    // Initial calculation on load
    this.calculatePPF();
  }

  calculatePPF() {
    const rate = 8.1 / 100;

    // Simple interest calculation (you can improve for compounding & frequency)
    this.totalInvested = this.investmentAmount * this.years;
    this.interestEarned = this.totalInvested * rate * this.years;
    this.maturityAmount = this.totalInvested + this.interestEarned;

    this.doughnutChartData = [this.totalInvested, this.interestEarned];
  }
}
