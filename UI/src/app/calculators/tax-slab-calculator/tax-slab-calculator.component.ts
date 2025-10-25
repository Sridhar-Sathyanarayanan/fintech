import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { MaterialModules } from '../../shared/material.standalone';

@Component({
  selector: 'app-tax-slab-calculator',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModules,
    BaseChartDirective,
  ],
  templateUrl: './tax-slab-calculator.component.html',
  styleUrls: ['./tax-slab-calculator.component.scss'],
})
export class TaxSlabCalculatorComponent {
  years = ['2023–2024', '2024–2025', '2025–2026'];
  selectedYear = '2025–2026';
  columns = ['range', 'rate'];
  comparisonColumns = ['range', 'oldRate', 'newRate'];
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  comparisonData: any = {
    '2023-2024': [
      { range: 'Up to ₹2,50,000', oldRate: 'Nil', newRate: 'Nil' },
      { range: '₹2,50,001 – ₹5,00,000', oldRate: '5%', newRate: '5%' },
      { range: '₹5,00,001 – ₹7,50,000', oldRate: '20%', newRate: '10%' },
      { range: '₹7,50,001 – ₹10,00,000', oldRate: '20%', newRate: '15%' },
      { range: '₹10,00,001 – ₹12,50,000', oldRate: 'Nil', newRate: '20%' },
      { range: '₹12,50,001 – ₹15,00,000', oldRate: 'Nil', newRate: '25%' },
      { range: 'Above ₹15,00,000', oldRate: '30%', newRate: '30%' },
    ],
    '2024-2025': [
      { range: 'Up to ₹2,50,000', oldRate: 'Nil', newRate: 'Nil' },
      { range: '₹2,50,001 – ₹5,00,000', oldRate: '5%', newRate: '5%' },
      { range: '₹5,00,001 – ₹7,50,000', oldRate: '20%', newRate: '10%' },
      { range: '₹7,50,001 – ₹10,00,000', oldRate: '20%', newRate: '15%' },
      { range: '₹10,00,001 – ₹12,50,000', oldRate: 'Nil', newRate: '20%' },
      { range: '₹12,50,001 – ₹15,00,000', oldRate: 'Nil', newRate: '25%' },
      { range: 'Above ₹15,00,000', oldRate: '30%', newRate: '30%' },
    ],
    '2025-2026': [
      { range: 'Up to ₹2,50,000', oldRate: 'Nil', newRate: 'Nil' },
      { range: '₹2,50,001 – ₹5,00,000', oldRate: '5%', newRate: '5%' },
      { range: '₹5,00,001 – ₹7,50,000', oldRate: '20%', newRate: '10%' },
      { range: '₹7,50,001 – ₹10,00,000', oldRate: '20%', newRate: '15%' },
      { range: '₹10,00,001 – ₹12,50,000', oldRate: 'Nil', newRate: '20%' },
      { range: '₹12,50,001 – ₹15,00,000', oldRate: 'Nil', newRate: '25%' },
      { range: 'Above ₹15,00,000', oldRate: '30%', newRate: '30%' },
    ],
  };

  slabData: any = {
    '2023–2024': {
      old: [
        { range: '₹0 - ₹2.5L', rate: '0%' },
        { range: '₹2.5L - ₹5L', rate: '5%' },
        { range: '₹5L - ₹10L', rate: '20%' },
        { range: '₹10L+', rate: '30%' },
      ],
      new: [
        { range: '₹0 - ₹3L', rate: '0%' },
        { range: '₹3L - ₹6L', rate: '5%' },
        { range: '₹6L - ₹9L', rate: '10%' },
        { range: '₹9L - ₹12L', rate: '15%' },
        { range: '₹12L - ₹15L', rate: '20%' },
        { range: '₹15L+', rate: '30%' },
      ],
    },
    '2024–2025': {
      old: [
        { range: '₹0 - ₹2.5L', rate: '0%' },
        { range: '₹2.5L - ₹5L', rate: '5%' },
        { range: '₹5L - ₹10L', rate: '20%' },
        { range: '₹10L+', rate: '30%' },
      ],
      new: [
        { range: '₹0 - ₹3L', rate: '0%' },
        { range: '₹3L - ₹6L', rate: '5%' },
        { range: '₹6L - ₹9L', rate: '10%' },
        { range: '₹9L - ₹12L', rate: '15%' },
        { range: '₹12L - ₹15L', rate: '20%' },
        { range: '₹15L+', rate: '30%' },
      ],
    },
    '2025–2026': {
      old: [
        { range: '₹0 - ₹2.5L', rate: '0%' },
        { range: '₹2.5L - ₹5L', rate: '5%' },
        { range: '₹5L - ₹10L', rate: '20%' },
        { range: '₹10L+', rate: '30%' },
      ],
      new: [
        { range: '₹0 - ₹4L', rate: '0%' },
        { range: '₹4L - ₹8L', rate: '5%' },
        { range: '₹8L - ₹12L', rate: '10%' },
        { range: '₹12L - ₹16L', rate: '15%' },
        { range: '₹16L - ₹20L', rate: '20%' },
        { range: '₹20L - ₹24L', rate: '25%' },
        { range: '₹24L+', rate: '30%' },
      ],
    },
  };
  comparisonChartType: any = 'bar';
  public chartType: string = 'bar';

  comparisonChartData: any = {
    labels: [],
    datasets: [],
  };

  comparisonChartOptions: any = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Tax Rate Comparison (%)' },
    },
    scales: {
      y: { beginAtZero: true, max: 35, ticks: { stepSize: 5 } },
    },
  };

  constructor() {
    this.updateComparisonChart();
  }

  updateComparisonChart() {
    const oldSlabs: any = this.slabData[this.selectedYear].old;
    const newSlabs: any = this.slabData[this.selectedYear].new;

    // Use the union of all ranges for labels
    const labelsSet = new Set<string>();
    oldSlabs.forEach((s: { range: string }) => labelsSet.add(s.range));
    newSlabs.forEach((s: { range: string }) => labelsSet.add(s.range));
    const labels = Array.from(labelsSet);

    // Helper to convert rate string "5%" => number 5
    const rateToNumber = (rate: string) =>
      parseFloat(rate.replace('%', '')) || 0;

    // Map labels to rates, default 0 if not found
    const oldRates = labels.map((label) => {
      const slab = oldSlabs.find((s: { range: string }) => s.range === label);
      return slab ? rateToNumber(slab.rate) : 0;
    });

    const newRates = labels.map((label) => {
      const slab = newSlabs.find((s: { range: string }) => s.range === label);
      return slab ? rateToNumber(slab.rate) : 0;
    });

    this.comparisonChartData = {
      labels: labels,
      datasets: [
        {
          label: 'Old Regime',
          data: oldRates,
          backgroundColor: '#3f51b5',
        },
        {
          label: 'New Regime',
          data: newRates,
          backgroundColor: '#e91e63',
        },
      ],
    };
  }

  exportChart() {
    if (!this.chart) return;
    const base64Image = this.chart.toBase64Image();
    const link: any = document.createElement('a');
    link.href = base64Image;
    link.download = `tax-comparison-${this.selectedYear}.png`;
    link.click();
  }
}
