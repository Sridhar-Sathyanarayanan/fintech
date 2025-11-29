import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { MaterialModules } from '../../shared/material.standalone';
import { Router } from '@angular/router';
import { ChartData, ChartOptions, TaxSlab, ComparisonData } from '../../models/chart.models';

@Component({
  selector: 'app-tax-slab-calculator',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModules,
    BaseChartDirective,
  ],
  templateUrl: './nps-calculator.component.html',
  styleUrls: ['./nps-calculator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NPSCalculatorComponent {
  years = ['2023–2024', '2024–2025', '2025–2026'];
  selectedYear = '2025–2026';
  
  @ViewChild('comparisonChart') chart!: BaseChartDirective;

  comparisonData: Record<string, ComparisonData[]> = {
    '2023-2024': [
      { range: 'Up to ₹2,50,000', oldRate: 'Nil', newRate: 'Nil' },
      { range: '₹2,50,001 – ₹5,00,000', oldRate: '5%', newRate: '5%' },
      { range: '₹5,00,001 – ₹7,50,000', oldRate: '20%', newRate: '10%' },
      { range: '₹7,50,001 – ₹10,00,000', oldRate: '20%', newRate: '15%' },
      { range: '₹10,00,001 – ₹12,50,000', oldRate: '30%', newRate: '20%' },
      { range: '₹12,50,001 – ₹15,00,000', oldRate: '30%', newRate: '25%' },
      { range: 'Above ₹15,00,000', oldRate: '30%', newRate: '30%' },
    ],
    '2024-2025': [
      { range: 'Up to ₹2,50,000', oldRate: 'Nil', newRate: 'Nil' },
      { range: '₹2,50,001 – ₹5,00,000', oldRate: '5%', newRate: '5%' },
      { range: '₹5,00,001 – ₹7,50,000', oldRate: '20%', newRate: '10%' },
      { range: '₹7,50,001 – ₹10,00,000', oldRate: '20%', newRate: '15%' },
      { range: '₹10,00,001 – ₹12,50,000', oldRate: '30%', newRate: '20%' },
      { range: '₹12,50,001 – ₹15,00,000', oldRate: '30%', newRate: '25%' },
      { range: 'Above ₹15,00,000', oldRate: '30%', newRate: '30%' },
    ],
    '2025-2026': [
      { range: 'Up to ₹4,00,000', oldRate: 'Nil', newRate: 'Nil' },
      { range: '₹4,00,001 – ₹8,00,000', oldRate: '5%', newRate: '5%' },
      { range: '₹8,00,001 – ₹10,00,000', oldRate: '20%', newRate: '10%' },
      { range: '₹10,00,001 – ₹12,00,000', oldRate: '30%', newRate: '15%' },
      { range: '₹12,00,001 – ₹16,00,000', oldRate: '30%', newRate: '20%' },
      { range: '₹16,00,001 – ₹20,00,000', oldRate: '30%', newRate: '25%' },
      { range: 'Above ₹20,00,000', oldRate: '30%', newRate: '30%' },
    ],
  };

  slabData: Record<string, { old: TaxSlab[]; new: TaxSlab[] }> = {
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

  comparisonChartData: ChartData = {
    labels: [],
    datasets: [],
  };

  comparisonChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: '600'
          },
          padding: 20,
          usePointStyle: true,
        }
      },
      title: { 
        display: false 
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: '600'
        },
        bodyFont: {
          size: 13
        },
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        callbacks: {
          label: function(context: any) {
            return context.dataset.label + ': ' + context.parsed.y + '%';
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 12,
            weight: '500'
          },
          color: '#666'
        }
      },
      y: { 
        beginAtZero: true, 
        max: 35, 
        ticks: { 
          stepSize: 5,
          font: {
            size: 12,
            weight: '500'
          },
          color: '#666',
          callback: function(value: number) {
            return value + '%';
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
    },
  };

  constructor(private router: Router) {
    this.updateComparisonChart();
  }

  updateComparisonChart() {
    const oldSlabs = this.slabData[this.selectedYear].old;
    const newSlabs = this.slabData[this.selectedYear].new;

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
          borderRadius: 8,
          barThickness: 40,
        },
        {
          label: 'New Regime',
          data: newRates,
          backgroundColor: '#e91e63',
          borderRadius: 8,
          barThickness: 40,
        },
      ],
    };

    // Trigger chart update if it exists
    if (this.chart) {
      this.chart.update();
    }
  }

  exportChart() {
    if (!this.chart) return;
    const base64Image = this.chart.toBase64Image();
    if (!base64Image) return;
    const link = document.createElement('a') as HTMLAnchorElement;
    link.href = base64Image;
    link.download = `tax-comparison-${this.selectedYear}.png`;
    link.click();
  }

  getRateDifference(oldRate: string, newRate: string): number {
    const parseRate = (rate: string): number => {
      if (rate.toLowerCase() === 'nil') return 0;
      return parseFloat(rate.replace('%', '')) || 0;
    };

    const oldValue = parseRate(oldRate);
    const newValue = parseRate(newRate);
    return newValue - oldValue;
  }

  formatDifference(oldRate: string, newRate: string): string {
    const diff = this.getRateDifference(oldRate, newRate);
    
    if (diff === 0) return 'Same';
    
    const absDiff = Math.abs(diff);
    return diff > 0 ? `+${absDiff}%` : `${diff}%`;
  }

  navigateToIncomeTaxCalculator() {
    this.router.navigate(['/income-tax-calculator']);
    this.scrollToTop();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}