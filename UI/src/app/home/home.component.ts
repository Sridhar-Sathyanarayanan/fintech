import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModules } from '../shared/material.standalone';
import {
  BannerSectionComponent,
  StatCardComponent, 
  FeatureCardComponent,
  AdsenseComponent,
  AdsenseConfig
} from '../shared/components';
import { MarketDataService } from '../services/market-data.service';
import { 
  FinancialTool, 
  FinancialFact, 
  Statistic, 
  Quote, 
  EconomicIndicator, 
  CarouselSlide 
} from '../models/ui.models';
import { MarketIndex } from '../models/market.models';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MaterialModules,
    BannerSectionComponent,
    StatCardComponent,
    FeatureCardComponent,
    AdsenseComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  private marketDataService = inject(MarketDataService);
  private destroy$ = new Subject<void>();
  
  // AdSense Configuration
  adsenseConfig = AdsenseConfig;
  
  currentSlide = signal(0);
  currentQuoteIndex = signal(0);
  lastUpdated = signal(new Date());
  intervalId: ReturnType<typeof setInterval> | null = null;
  quoteIntervalId: ReturnType<typeof setInterval> | null = null;
  
  // Computed value for current quote
  currentQuote = computed(() => this.quotes[this.currentQuoteIndex()]);
  
  // Market indices from service
  marketIndices = this.marketDataService.getMarketIndices();

  bannerActions = [
    { label: 'Calculate Your Tax', icon: 'calculate', route: '/income-tax-calculator', variant: 'primary' as const },
    { label: 'Market Insights', icon: 'insights', route: '/market-insights', variant: 'secondary' as const }
  ];

  bannerFeatures = [
    { icon: 'verified', label: 'RBI Compliant' },
    { icon: 'security', label: 'Bank-Grade Security' },
    { icon: 'analytics', label: 'Real-Time Analytics' }
  ];

  bannerCards = [
    { icon: 'trending_up', label: 'Avg. Returns', value: '+18.2%' },
    { icon: 'account_balance_wallet', label: 'Tax Savings Identified', value: '₹10Cr+' },
    { icon: 'groups', label: 'Happy Users', value: '10K+' }
  ];

  // Famous economist and investor quotes
  quotes: Quote[] = [
    {
      text: 'Risk comes from not knowing what you are doing.',
      author: 'Warren Buffett',
      designation: 'CEO, Berkshire Hathaway',
      imageUrl: '/assets/images/warren_buffet.png'
    },
    {
      text: 'In the short run, the market is a voting machine but in the long run, it is a weighing machine.',
      author: 'Benjamin Graham',
      designation: 'Father of Value Investing',
      imageUrl: '/assets/images/benjamin_graham.png'
    },
    {
      text: 'Know what you own, and know why you own it.',
      author: 'Peter Lynch',
      designation: 'Legendary Fund Manager',
      imageUrl: '/assets/images/peter_lynch.png'
    },
    {
      text: 'The stock market is filled with individuals who know the price of everything, but the value of nothing.',
      author: 'Philip Fisher',
      designation: 'Growth Investing Pioneer',
      imageUrl: '/assets/images/philip_fisher.png'
    },
    {
      text: 'The four most dangerous words in investing are: this time it\'s different.',
      author: 'Sir John Templeton',
      designation: 'Legendary Investor',
      imageUrl: '/assets/images/john_templeton.png'
    },
    {
      text: 'The big money is not in the buying and selling, but in the waiting.',
      author: 'Charlie Munger',
      designation: 'Vice Chairman, Berkshire Hathaway',
      imageUrl: '/assets/images/charlie_munger.png'
    }
  ];

  // Economic indicators
  economicIndicators: EconomicIndicator[] = [
    { label: 'GDP Growth', value: '7.8%', trend: 'up', icon: 'bar_chart', color: 'primary' },
    { label: 'Inflation (CPI)', value: '5.1%', trend: 'down', icon: 'show_chart', color: 'accent' },
    { label: 'Repo Rate', value: '6.50%', trend: 'stable', icon: 'account_balance', color: 'warn' },
    { label: 'USD/INR', value: '₹83.12', trend: 'up', icon: 'currency_exchange', color: 'primary' }
  ];

  carouselSlides: CarouselSlide[] = [
    {
      image: '/assets/images/slide1.webp',
      title: 'Master Your Investments',
      subtitle: 'Build wealth with data-driven investment strategies'
    },
    {
      image: '/assets/images/slide2.webp',
      title: 'Tax Planning Made Easy',
      subtitle: 'Maximize savings with smart tax optimization tools'
    },
    {
      image: '/assets/images/slide3.webp',
      title: 'Retirement Planning',
      subtitle: 'Secure your future with strategic retirement corpus'
    },
    {
      image: '/assets/images/slide4.webp',
      title: 'Real Estate Finance',
      subtitle: 'Calculate EMIs and plan your dream home purchase'
    },
    {
      image: '/assets/images/slide5.webp',
      title: 'Wealth Management',
      subtitle: 'Diversify and grow your portfolio effectively'
    },
    {
      image: '/assets/images/slide6.webp',
      title: 'Financial Independence',
      subtitle: 'Achieve your goals with disciplined financial planning'
    }
  ];

  financialTools: FinancialTool[] = [
    {
      icon: 'calculate',
      title: 'Income Tax Calculator',
      desc: 'Compare old vs new tax regimes, get instant tax calculations with detailed breakdowns and smart recommendations.',
      color: 'primary',
      route: '/income-tax-calculator'
    },
    {
      icon: 'payments',
      title: 'SIP Calculator',
      desc: 'Plan your systematic investments, project wealth creation with power of compounding over time.',
      color: 'accent',
      route: '/sip-calculator'
    },
    {
      icon: 'account_balance_wallet',
      title: 'PPF Calculator',
      desc: 'Calculate Public Provident Fund maturity, tax benefits, and long-term wealth accumulation.',
      color: 'primary',
      route: '/ppf-calculator'
    },
    {
      icon: 'home',
      title: 'Home Loan EMI',
      desc: 'Calculate home loan EMIs, compare interest rates, and plan your home financing strategy.',
      color: 'accent',
      route: '/home-loan-calculator'
    },
    {
      icon: 'card_giftcard',
      title: 'Gratuity Calculator',
      desc: 'Estimate gratuity amount based on salary and years of service under Payment of Gratuity Act.',
      color: 'primary',
      route: '/gratuity-calculator'
    },
    {
      icon: 'savings',
      title: 'NPS Calculator',
      desc: 'Plan retirement with National Pension System, calculate corpus, and monthly pension amount.',
      color: 'accent',
      route: '/nps-calculator'
    },
    {
      icon: 'home_work',
      title: 'HRA Calculator',
      desc: 'Calculate House Rent Allowance tax exemption based on salary, rent paid, and metro classification.',
      color: 'primary',
      route: '/hra-calculator'
    },
    {
      icon: 'assessment',
      title: 'Tax Slab Calculator',
      desc: 'Understand applicable tax slabs, rates, surcharges, and total tax liability for your income.',
      color: 'accent',
      route: '/tax-slabs'
    }
  ];

  financialFacts: FinancialFact[] = [
    {
      icon: 'emergency',
      title: 'Emergency Fund Essential',
      content: 'Financial experts recommend maintaining 3-6 months of living expenses in liquid assets. This fund protects against job loss, medical emergencies, or unexpected expenses without disrupting long-term investments.'
    },
    {
      icon: 'receipt_long',
      title: 'Strategic Tax Planning',
      content: 'Section 80C offers ₹1.5L deduction, 80D for ₹25K-₹100K medical insurance, and NPS 80CCD(1B) for additional ₹50K. Smart planning can save ₹46,800+ annually in taxes under old regime.'
    },
    {
      icon: 'auto_graph',
      title: 'Power of Compounding',
      content: 'Starting at 25 with ₹10K monthly SIP @ 12% CAGR creates ₹3.5Cr by 60. Starting at 35 creates only ₹1.2Cr. Starting early triples your retirement corpus with same monthly investment!'
    },
    {
      icon: 'credit_card',
      title: 'Credit Score Impact',
      content: 'Score above 750 qualifies for lowest interest rates. On a ₹50L home loan, difference between 8.5% vs 9.5% rate is ₹8.5L over 20 years. Good credit literally saves lakhs!'
    },
    {
      icon: 'pie_chart',
      title: 'Asset Allocation Strategy',
      content: 'Ideal allocation: Equity (age-dependent), Debt (stable returns), Gold (5-10% hedge). Rebalance annually. Young investors: 60-70% equity. Near retirement: 30-40% equity for stability.'
    },
    {
      icon: 'trending_up',
      title: 'Equity Returns Long-term',
      content: 'NIFTY 50 delivered 12.6% CAGR over 20 years. Despite short-term volatility, equity consistently outperforms inflation and other assets over 10+ year horizons. Time in market beats timing.'
    },
    {
      icon: 'account_balance',
      title: 'PPF: Tax-free Returns',
      content: 'Public Provident Fund offers 7.1% returns (tax-free), 15-year lock-in, and EEE status. ₹1.5L annual investment creates ₹40L+ corpus. Extends in 5-year blocks post maturity.'
    },
    {
      icon: 'real_estate_agent',
      title: 'Real Estate Investment',
      content: 'Real estate appreciates 8-10% annually in tier-1 cities. Factor in registration (7-8%), maintenance, and liquidity constraints. REITs offer easier property exposure with better liquidity.'
    }
  ];

  statistics: Statistic[] = [
    { value: '10,000+', label: 'Active Users', icon: 'people' },
    { value: '₹10Cr+', label: 'Tax Savings Identified', icon: 'account_balance_wallet' },
    { value: '80K+', label: 'Calculations Done', icon: 'calculate' },
    { value: '4.9★', label: 'User Rating', icon: 'star' },
  ];

  ngOnInit(): void {
    this.startAutoSlide();
    this.startQuoteRotation();
    this.initializeMarketData();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.quoteIntervalId) {
      clearInterval(this.quoteIntervalId);
    }
    this.destroy$.next();
    this.destroy$.complete();
  }

  initializeMarketData(): void {
    // Fetch initial market data
    this.marketDataService.fetchMarketIndices()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          console.log('Market data loaded');
          this.lastUpdated.set(new Date());
        },
        error: (err) => console.error('Market data error:', err)
      });

    // Start polling based on market status
    const pollingInterval = this.marketDataService.getPollingInterval();
    this.marketDataService.startPolling(pollingInterval)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
        console.log('Market data updated');
        this.lastUpdated.set(new Date());
      },
      error: (err) => console.error('Market polling error:', err)
    });
  }

  startQuoteRotation(): void {
    this.quoteIntervalId = setInterval(() => {
      this.currentQuoteIndex.update(val => (val + 1) % this.quotes.length);
    }, 8000); // Change quote every 8 seconds
  }

  onQuoteIndicatorClick(index: number): void {
    this.currentQuoteIndex.set(index);
  }

  nextQuote(): void {
    this.currentQuoteIndex.update(val => (val + 1) % this.quotes.length);
  }

  prevQuote(): void {
    this.currentQuoteIndex.update(val =>
      (val - 1 + this.quotes.length) % this.quotes.length
    );
  }

  startAutoSlide(): void {
    this.intervalId = setInterval(() => this.nextSlide(), 5000);
  }

  nextSlide(): void {
    this.currentSlide.update(val => (val + 1) % this.carouselSlides.length);
  }

  prevSlide(): void {
    this.currentSlide.update(val =>
      (val - 1 + this.carouselSlides.length) % this.carouselSlides.length
    );
  }

  onSlideIndicatorClick(index: number): void {
    this.currentSlide.set(index);
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
    }
    this.startAutoSlide();
  }
}