import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { MaterialModules } from '../../shared/material.standalone';
import { ChartData, ChartOptions, TaxSlab, ComparisonData } from '../../models/chart.models';
import { BannerSectionComponent, BannerFeature, BannerVisualCard } from '../../shared/components/banner-section/banner-section.component';

@Component({
  selector: 'app-tax-slab-calculator',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModules,
    BaseChartDirective,
    BannerSectionComponent,
  ],
  templateUrl: './tax-slab-calculator.component.html',
  styleUrls: ['./tax-slab-calculator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaxSlabCalculatorComponent {
  readonly bannerFeatures: BannerFeature[] = [
    { icon: 'compare_arrows', label: 'Side-by-Side Comparison' },
    { icon: 'trending_down', label: 'Tax Optimization' },
    { icon: 'calendar_today', label: 'Multi-Year Data' }
  ];

  readonly bannerVisualCards: BannerVisualCard[] = [
    { icon: 'savings', label: 'Save Up To', value: '₹1.5L' },
    { icon: 'verified', label: 'Updated For', value: 'FY 2025-26' }
  ];

  years = ['2023–2024', '2024–2025', '2025–2026'];
  selectedYear = '2025–2026';
  
  @ViewChild('comparisonChart') chart!: BaseChartDirective;

  // Tax Examples Data
  taxExamples: Record<string, any[]> = {
    '2023-2024': [
      {
        title: 'Entry Level Professional',
        income: '₹5,00,000',
        icon: 'work',
        oldTax: '₹12,500',
        newTax: '₹10,000',
        savings: 2500,
        recommendation: 'New Regime saves ₹2,500'
      },
      {
        title: 'Mid-Level Executive',
        income: '₹10,00,000',
        icon: 'trending_up',
        oldTax: '₹1,12,500',
        newTax: '₹97,500',
        savings: 15000,
        recommendation: 'New Regime saves ₹15,000'
      },
      {
        title: 'Senior Manager',
        income: '₹20,00,000',
        icon: 'business_center',
        oldTax: '₹4,12,500',
        newTax: '₹3,47,500',
        savings: 65000,
        recommendation: 'New Regime saves ₹65,000'
      }
    ],
    '2024-2025': [
      {
        title: 'Entry Level Professional',
        income: '₹5,00,000',
        icon: 'work',
        oldTax: '₹12,500',
        newTax: '₹10,000',
        savings: 2500,
        recommendation: 'New Regime saves ₹2,500'
      },
      {
        title: 'Mid-Level Executive',
        income: '₹10,00,000',
        icon: 'trending_up',
        oldTax: '₹1,12,500',
        newTax: '₹97,500',
        savings: 15000,
        recommendation: 'New Regime saves ₹15,000'
      },
      {
        title: 'Senior Manager',
        income: '₹20,00,000',
        icon: 'business_center',
        oldTax: '₹4,12,500',
        newTax: '₹3,47,500',
        savings: 65000,
        recommendation: 'New Regime saves ₹65,000'
      }
    ],
    '2025-2026': [
      {
        title: 'Entry Level Professional',
        income: '₹6,00,000',
        icon: 'work',
        oldTax: '₹25,000',
        newTax: '₹10,000',
        savings: 15000,
        recommendation: 'New Regime saves ₹15,000'
      },
      {
        title: 'Mid-Level Executive',
        income: '₹12,00,000',
        icon: 'trending_up',
        oldTax: '₹1,62,500',
        newTax: '₹80,000',
        savings: 82500,
        recommendation: 'New Regime saves ₹82,500'
      },
      {
        title: 'Senior Manager',
        income: '₹25,00,000',
        icon: 'business_center',
        oldTax: '₹5,62,500',
        newTax: '₹4,30,000',
        savings: 132500,
        recommendation: 'New Regime saves ₹1,32,500'
      }
    ]
  };

  // Tax Planning Tips
  taxPlanningTips = [
    {
      icon: 'account_balance_wallet',
      title: 'Evaluate Your Deductions',
      description: 'Calculate total deductions under Section 80C, 80D, HRA, and home loan interest. If they exceed ₹2.5 lakhs, old regime might be better.',
      tags: ['80C', '80D', 'HRA']
    },
    {
      icon: 'compare_arrows',
      title: 'Compare Both Regimes',
      description: 'Always calculate tax under both regimes before filing. The difference can be substantial depending on your income and investments.',
      tags: ['Comparison', 'Analysis']
    },
    {
      icon: 'schedule',
      title: 'Plan Investments Early',
      description: 'Start tax planning at the beginning of the financial year. Last-minute investments often lead to suboptimal choices.',
      tags: ['Planning', 'Investment']
    },
    {
      icon: 'shield',
      title: 'Consider Insurance Benefits',
      description: 'Medical and life insurance premiums qualify for deductions under 80D and 80C respectively in old regime.',
      tags: ['Insurance', '80D']
    },
    {
      icon: 'home',
      title: 'Home Loan Benefits',
      description: 'If you have a home loan, the interest deduction (up to ₹2 lakhs) under Section 24 is available only in old regime.',
      tags: ['Home Loan', 'Section 24']
    },
    {
      icon: 'trending_up',
      title: 'Review Annually',
      description: 'Tax laws change frequently. Review your choice every year as your income, investments, and tax slabs may change.',
      tags: ['Annual Review', 'Updates']
    }
  ];

  // FAQs
  faqs = [
    {
      icon: 'help_center',
      question: 'Can I switch between tax regimes every year?',
      answer: 'Yes, if you are a salaried employee, you can choose between the old and new tax regime every year. However, if you have business income, once you opt for the new regime, you cannot switch back to the old regime.',
      tags: ['Switching', 'Flexibility']
    },
    {
      icon: 'help_center',
      question: 'Which regime is the default for FY 2024-25 onwards?',
      answer: 'From FY 2024-25 onwards, the new tax regime is the default option. However, you can still opt for the old regime by explicitly choosing it while filing your tax return.',
      tags: ['Default', 'FY 2024-25']
    },
    {
      icon: 'help_center',
      question: 'What is the standard deduction in the new tax regime?',
      answer: 'The new tax regime offers a standard deduction of ₹50,000 for salaried individuals from FY 2023-24 onwards. Previously, no standard deduction was available in the new regime.',
      tags: ['Standard Deduction', 'New Regime']
    },
    {
      icon: 'help_center',
      question: 'Are there any deductions available in the new tax regime?',
      answer: 'The new tax regime does not allow most deductions like Section 80C, 80D, HRA, or home loan interest. Only the standard deduction of ₹50,000 and employer contributions to NPS under 80CCD(2) are allowed.',
      tags: ['Deductions', 'Limitations']
    },
    {
      icon: 'help_center',
      question: 'What is the rebate under Section 87A?',
      answer: 'Under the old regime, individuals with taxable income up to ₹5 lakhs get a rebate of up to ₹12,500. In the new regime for FY 2025-26, individuals with income up to ₹7 lakhs get a rebate of up to ₹75,000.',
      tags: ['Section 87A', 'Rebate']
    },
    {
      icon: 'help_center',
      question: 'How do I decide which regime is better for me?',
      answer: 'Compare your tax liability under both regimes after considering all applicable deductions in the old regime. If your deductions are substantial (above ₹2.5 lakhs), the old regime might be beneficial. Otherwise, the new regime with lower rates could be better.',
      tags: ['Decision Making', 'Comparison']
    },
    {
      icon: 'help_center',
      question: 'What happens to my existing tax-saving investments?',
      answer: 'Your existing tax-saving investments continue to be valid. If you choose the new regime, you simply won\'t claim deductions for them, but the investments remain. You can always switch back to the old regime in future years.',
      tags: ['Investments', 'Tax Saving']
    },
    {
      icon: 'help_center',
      question: 'Is surcharge and cess applicable on both regimes?',
      answer: 'Yes, surcharge (based on income level) and health & education cess (4%) are applicable on the tax computed under both regimes. These are over and above the base tax amount.',
      tags: ['Surcharge', 'Cess']
    }
  ];

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
          callback: function(value: any) {
            return value + '%';
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
    },
  };

  constructor() {
    this.updateComparisonChart();
  }

  updateComparisonChart() {
    const oldSlabs: TaxSlab[] = this.slabData[this.selectedYear].old;
    const newSlabs: TaxSlab[] = this.slabData[this.selectedYear].new;

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
}