import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModules } from '../shared/material.standalone';
import { BannerSectionComponent } from '../shared/components';
import { MarketDataService } from '../services/market-data.service';
import { forkJoin, interval, Subject, of } from 'rxjs';
import { switchMap, takeUntil, catchError } from 'rxjs/operators';
import { MarketIndex, Stock, MarketStat, Sector, Currency, Commodity, MarketInsight } from '../models/market.models';

@Component({
  selector: 'app-market-insights',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MaterialModules,
    BannerSectionComponent
  ],
  templateUrl: './market-insights.component.html',
  styleUrls: ['./market-insights.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketInsightsComponent implements OnInit, OnDestroy {
  private marketDataService = inject(MarketDataService);
  private destroy$ = new Subject<void>();

  lastUpdated = signal<string>(new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }) + ' IST');
  
  // Error handling signals
  hasPartialError = signal<boolean>(false);
  failedEndpoints = signal<string[]>([]);
  
  // Disclaimer signal
  showDisclaimer = signal<boolean>(true);

  bannerFeatures = [
    { icon: 'update', label: 'Real-time Updates' },
    { icon: 'analytics', label: 'Expert Analysis' },
    { icon: 'insights', label: 'Market Intelligence' },
    { icon: 'trending_up', label: 'Live Data' }
  ];

  bannerCards = [
    { icon: 'trending_up', label: 'NIFTY 50', value: '+1.2%' },
    { icon: 'show_chart', label: 'SENSEX', value: '+0.8%' },
    { icon: 'update', label: 'Last Updated', value: 'Live' }
  ];

  majorIndices = signal<MarketIndex[]>([
    {
      name: 'NIFTY 50',
      description: 'National Stock Exchange',
      value: '22,453.30',
      change: '+267.85',
      changePercent: '+1.21%',
      isPositive: true,
      icon: 'trending_up',
      timestamp: '3:30 PM IST'
    },
    {
      name: 'SENSEX',
      description: 'Bombay Stock Exchange',
      value: '74,119.39',
      change: '+584.81',
      changePercent: '+0.80%',
      isPositive: true,
      icon: 'trending_up',
      timestamp: '3:30 PM IST'
    },
    {
      name: 'NIFTY BANK',
      description: 'Banking Sector Index',
      value: '48,234.65',
      change: '-124.35',
      changePercent: '-0.26%',
      isPositive: false,
      icon: 'trending_down',
      timestamp: '3:30 PM IST'
    },
    {
      name: 'NIFTY IT',
      description: 'Information Technology',
      value: '35,812.50',
      change: '+445.20',
      changePercent: '+1.26%',
      isPositive: true,
      icon: 'trending_up',
      timestamp: '3:30 PM IST'
    },
    {
      name: 'NIFTY NEXT 50',
      description: 'Next 50 Companies',
      value: '68,345.80',
      change: '+312.45',
      changePercent: '+0.46%',
      isPositive: true,
      icon: 'trending_up',
      timestamp: '3:30 PM IST'
    },
    {
      name: 'NIFTY MIDCAP',
      description: 'Mid Cap Companies',
      value: '52,678.90',
      change: '+189.60',
      changePercent: '+0.36%',
      isPositive: true,
      icon: 'trending_up',
      timestamp: '3:30 PM IST'
    }
  ]);

  topGainers: Stock[] = [
    { symbol: 'TCS', name: 'Tata Consultancy', price: '3,845.60', change: '4.25' },
    { symbol: 'INFY', name: 'Infosys Ltd', price: '1,567.90', change: '3.82' },
    { symbol: 'RELIANCE', name: 'Reliance Industries', price: '2,934.55', change: '3.15' },
    { symbol: 'HDFCBANK', name: 'HDFC Bank', price: '1,678.40', change: '2.89' },
    { symbol: 'WIPRO', name: 'Wipro Ltd', price: '456.75', change: '2.45' }
  ];

  topLosers: Stock[] = [
    { symbol: 'ICICIBANK', name: 'ICICI Bank', price: '1,123.50', change: '-2.34' },
    { symbol: 'AXISBANK', name: 'Axis Bank', price: '987.25', change: '-1.98' },
    { symbol: 'SBIN', name: 'State Bank of India', price: '612.80', change: '-1.76' },
    { symbol: 'KOTAKBANK', name: 'Kotak Mahindra', price: '1,845.90', change: '-1.55' },
    { symbol: 'INDUSINDBK', name: 'IndusInd Bank', price: '1,234.60', change: '-1.42' }
  ];

  mostActive: Stock[] = [
    { symbol: 'TATASTEEL', name: 'Tata Steel', price: '134.75', change: '1.25', volume: '45.2M' },
    { symbol: 'BHARTIARTL', name: 'Bharti Airtel', price: '1,456.30', change: '0.85', volume: '38.7M' },
    { symbol: 'LT', name: 'Larsen & Toubro', price: '3,567.80', change: '1.45', volume: '32.4M' },
    { symbol: 'MARUTI', name: 'Maruti Suzuki', price: '11,234.50', change: '-0.65', volume: '28.9M' },
    { symbol: 'ADANIPORTS', name: 'Adani Ports', price: '1,089.40', change: '2.15', volume: '25.6M' }
  ];

  marketStats: MarketStat[] = [
    {
      label: 'Advances',
      value: '1,847',
      description: 'Stocks moving up',
      icon: 'arrow_upward',
      color: 'green'
    },
    {
      label: 'Declines',
      value: '1,256',
      description: 'Stocks moving down',
      icon: 'arrow_downward',
      color: 'red'
    },
    {
      label: 'Unchanged',
      value: '387',
      description: 'No change in price',
      icon: 'trending_flat',
      color: 'blue'
    },
    {
      label: '52W High',
      value: '234',
      description: 'Stocks at yearly high',
      icon: 'stars',
      color: 'purple'
    },
    {
      label: '52W Low',
      value: '89',
      description: 'Stocks at yearly low',
      icon: 'report',
      color: 'orange'
    },
    {
      label: 'Market Cap',
      value: '₹325.4L Cr',
      description: 'Total market value',
      icon: 'account_balance',
      color: 'teal'
    }
  ];

  sectors: Sector[] = [
    { name: 'IT', icon: 'computer', change: '+2.45%', isPositive: true, index: 'NIFTY IT', value: '35,812' },
    { name: 'Pharma', icon: 'medical_services', change: '+1.85%', isPositive: true, index: 'NIFTY PHARMA', value: '18,234' },
    { name: 'Auto', icon: 'directions_car', change: '+1.23%', isPositive: true, index: 'NIFTY AUTO', value: '22,567' },
    { name: 'FMCG', icon: 'shopping_cart', change: '+0.78%', isPositive: true, index: 'NIFTY FMCG', value: '51,890' },
    { name: 'Banking', icon: 'account_balance', change: '-0.26%', isPositive: false, index: 'NIFTY BANK', value: '48,234' },
    { name: 'Realty', icon: 'apartment', change: '-0.89%', isPositive: false, index: 'NIFTY REALTY', value: '845' },
    { name: 'Metal', icon: 'construction', change: '+0.45%', isPositive: true, index: 'NIFTY METAL', value: '8,456' },
    { name: 'Energy', icon: 'bolt', change: '+1.12%', isPositive: true, index: 'NIFTY ENERGY', value: '34,123' }
  ];

  currencies: Currency[] = [
    { pair: 'USD/INR', description: 'US Dollar', rate: '₹83.42', change: '+0.15%', isPositive: true },
    { pair: 'EUR/INR', description: 'Euro', rate: '₹90.87', change: '+0.23%', isPositive: true },
    { pair: 'GBP/INR', description: 'British Pound', rate: '₹106.34', change: '-0.08%', isPositive: false },
    { pair: 'JPY/INR', description: 'Japanese Yen', rate: '₹0.56', change: '+0.12%', isPositive: true }
  ];

  commodities: Commodity[] = [
    { name: 'Gold', unit: 'per 10g', price: '₹62,450', change: '+0.85%', isPositive: true },
    { name: 'Silver', unit: 'per kg', price: '₹74,230', change: '+1.25%', isPositive: true },
    { name: 'Crude Oil', unit: 'per barrel', price: '$82.45', change: '-0.65%', isPositive: false },
    { name: 'Natural Gas', unit: 'per MMBtu', price: '$2.87', change: '+2.15%', isPositive: true }
  ];

  marketInsights: MarketInsight[] = [
    {
      title: 'IT Sector Rally Continues on Strong Q3 Results',
      content: 'The IT sector continues its upward momentum with major players reporting strong quarterly earnings. TCS and Infosys lead the gains with increased order books and positive management commentary on deal pipelines.',
      category: 'Sector Analysis',
      icon: 'analytics',
      author: 'Market Desk',
      date: 'Today, 2:45 PM'
    },
    {
      title: 'Banking Stocks Under Pressure Amid RBI Rate Concerns',
      content: 'Banking stocks witnessed profit booking as investors assess the impact of potential RBI policy changes. PSU banks showed resilience while private sector banks saw moderate corrections.',
      category: 'Banking',
      icon: 'account_balance',
      author: 'Banking Analyst',
      date: 'Today, 1:30 PM'
    },
    {
      title: 'FII Buying Supports Market Sentiment',
      content: 'Foreign institutional investors turned net buyers after three consecutive sessions of selling. The renewed interest in Indian equities is attributed to positive macro indicators and stable rupee performance.',
      category: 'Market Flows',
      icon: 'trending_up',
      author: 'Investment Team',
      date: 'Today, 11:15 AM'
    },
    {
      title: 'Rupee Strengthens on Export Growth',
      content: 'The Indian rupee gained against major currencies following strong export data and sustained dollar inflows. This bodes well for companies with high import costs and could ease inflationary pressures.',
      category: 'Currency',
      icon: 'currency_rupee',
      author: 'Currency Desk',
      date: 'Today, 10:00 AM'
    }
  ];

  ngOnInit(): void {
    // Load all market data initially
    this.loadAllMarketData();

    // Start polling for updates every minute during market hours
    const pollingInterval = this.marketDataService.getPollingInterval();
    interval(pollingInterval).pipe(
      switchMap(() => forkJoin({
        indices: this.marketDataService.fetchMarketIndices().pipe(catchError(() => of(null))),
        movers: this.marketDataService.fetchStockMovers().pipe(catchError(() => of(null))),
        stats: this.marketDataService.fetchMarketStats().pipe(catchError(() => of(null))),
        sectors: this.marketDataService.fetchSectors().pipe(catchError(() => of(null))),
        currencies: this.marketDataService.fetchCurrencies().pipe(catchError(() => of(null))),
        commodities: this.marketDataService.fetchCommodities().pipe(catchError(() => of(null)))
      })),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        this.updateMarketData(data);
        this.lastUpdated.set(new Date().toLocaleString('en-IN', {
          dateStyle: 'medium',
          timeStyle: 'short'
        }) + ' IST');
      },
      error: (error) => {
        console.error('Error polling market data:', error);
        this.hasPartialError.set(true);
      }
    });
  }

  ngOnDestroy(): void {
    // Clean up all subscriptions
    this.destroy$.next();
    this.destroy$.complete();
  }

  retryLoad(): void {
    this.loadAllMarketData();
  }

  dismissDisclaimer(): void {
    this.showDisclaimer.set(false);
  }

  private loadAllMarketData(): void {
    // Reset errors
    this.hasPartialError.set(false);
    this.failedEndpoints.set([]);
    const failures: string[] = [];
    
    forkJoin({
      indices: this.marketDataService.fetchMarketIndices().pipe(
        catchError((error: any) => {
          console.warn('Failed to load market indices:', error);
          failures.push('indices');
          return of(null);
        })
      ),
      movers: this.marketDataService.fetchStockMovers().pipe(
        catchError((error: any) => {
          console.warn('Failed to load stock movers:', error);
          failures.push('movers');
          return of(null);
        })
      ),
      stats: this.marketDataService.fetchMarketStats().pipe(
        catchError((error: any) => {
          console.warn('Failed to load market stats:', error);
          failures.push('stats');
          return of(null);
        })
      ),
      sectors: this.marketDataService.fetchSectors().pipe(
        catchError((error: any) => {
          console.warn('Failed to load sectors:', error);
          failures.push('sectors');
          return of(null);
        })
      ),
      currencies: this.marketDataService.fetchCurrencies().pipe(
        catchError((error: any) => {
          console.warn('Failed to load currencies:', error);
          failures.push('currencies');
          return of(null);
        })
      ),
      commodities: this.marketDataService.fetchCommodities().pipe(
        catchError((error: any) => {
          console.warn('Failed to load commodities:', error);
          failures.push('commodities');
          return of(null);
        })
      )
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
      next: (data) => {
        this.updateMarketData(data);
        if (failures.length > 0) {
          this.hasPartialError.set(true);
          this.failedEndpoints.set(failures);
        }
        this.lastUpdated.set(new Date().toLocaleString('en-IN', {
          dateStyle: 'medium',
          timeStyle: 'short'
        }) + ' IST');
      },
      error: (error) => {
        console.error('Error loading market data:', error);
        this.hasPartialError.set(true);
      }
    });
  }

  private updateMarketData(data: any): void {
    // Update major indices
    if (data.indices && Array.isArray(data.indices) && data.indices.length > 0) {
      const updatedIndices = data.indices.map((index: any) => ({
        name: index.name,
        description: this.getIndexDescription(index.name),
        value: index.value,
        change: index.change.replace('%', ''),
        changePercent: index.change,
        isPositive: index.isPositive,
        icon: index.icon,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST'
      }));
      this.majorIndices.set(updatedIndices.slice(0, 6));
    }

    // Update stock movers
    if (data.movers && typeof data.movers === 'object') {
      this.topGainers = data.movers.topGainers || this.topGainers;
      this.topLosers = data.movers.topLosers || this.topLosers;
      this.mostActive = data.movers.mostActive || this.mostActive;
    }

    // Update market stats
    if (data.stats && typeof data.stats === 'object') {
      this.marketStats = [
        { label: 'Advances', value: data.stats.advances.toString(), description: 'Stocks moving up', icon: 'arrow_upward', color: 'green' },
        { label: 'Declines', value: data.stats.declines.toString(), description: 'Stocks moving down', icon: 'arrow_downward', color: 'red' },
        { label: 'Unchanged', value: data.stats.unchanged.toString(), description: 'No change in price', icon: 'trending_flat', color: 'blue' },
        { label: '52W High', value: data.stats.fiftyTwoWeekHigh.toString(), description: 'Stocks at yearly high', icon: 'stars', color: 'purple' },
        { label: '52W Low', value: data.stats.fiftyTwoWeekLow.toString(), description: 'Stocks at yearly low', icon: 'report', color: 'orange' },
        { label: 'Market Cap', value: data.stats.marketCap, description: 'Total market value', icon: 'account_balance', color: 'teal' }
      ];
    }

    // Update sectors
    if (data.sectors && Array.isArray(data.sectors) && data.sectors.length > 0) {
      this.sectors = data.sectors.map((sector: any) => ({
        ...sector,
        icon: this.getSectorIcon(sector.name)
      }));
    }

    // Update currencies
    if (data.currencies && Array.isArray(data.currencies) && data.currencies.length > 0) {
      this.currencies = data.currencies;
    }

    // Update commodities
    if (data.commodities && Array.isArray(data.commodities) && data.commodities.length > 0) {
      this.commodities = data.commodities;
    }
  }

  private getIndexDescription(name: string): string {
    const descriptions: { [key: string]: string } = {
      'NIFTY 50': 'National Stock Exchange',
      'SENSEX': 'Bombay Stock Exchange',
      'BANK NIFTY': 'Banking Sector Index',
      'NIFTY IT': 'Information Technology',
      'NIFTY NEXT 50': 'Next 50 Companies',
      'NIFTY MIDCAP': 'Mid Cap Companies'
    };
    return descriptions[name] || 'Market Index';
  }

  private getSectorIcon(sectorName: string): string {
    const icons: { [key: string]: string } = {
      'IT': 'computer',
      'PHARMA': 'medical_services',
      'AUTO': 'directions_car',
      'FMCG': 'shopping_cart',
      'BANK': 'account_balance',
      'REALTY': 'apartment',
      'METAL': 'construction',
      'ENERGY': 'bolt'
    };
    return icons[sectorName] || 'business';
  }
}
