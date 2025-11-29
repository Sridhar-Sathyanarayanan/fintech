import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, interval, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface MarketIndex {
  name: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: string;
}

export interface Stock {
  symbol: string;
  name: string;
  price: string;
  change: string;
  volume?: string;
}

export interface MarketStats {
  advances: number;
  declines: number;
  unchanged: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  marketCap: string;
}

export interface Sector {
  name: string;
  index: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export interface Currency {
  pair: string;
  description: string;
  rate: string;
  change: string;
  isPositive: boolean;
}

export interface Commodity {
  name: string;
  unit: string;
  price: string;
  change: string;
  isPositive: boolean;
}

interface NSEIndexResponse {
  success: boolean;
  data: Array<{
    index: string;
    last: number;
    variation: number;
    percentChange: number;
  }>;
}

interface StockMoversResponse {
  success: boolean;
  data: {
    topGainers: Stock[];
    topLosers: Stock[];
    mostActive: Stock[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class MarketDataService {
  private readonly API_BASE_URL = `${environment.apiURL}${environment.apiEndpoints.market}`;
  private marketIndices = signal<MarketIndex[]>([]);
  
  // Fallback data in case API fails
  private readonly FALLBACK_DATA: MarketIndex[] = [
    { name: 'NIFTY 50', value: '22,453.30', change: '+1.2%', isPositive: true, icon: 'trending_up' },
    { name: 'SENSEX', value: '74,119.39', change: '+0.8%', isPositive: true, icon: 'trending_up' },
    { name: 'BANK NIFTY', value: '48,567.25', change: '-0.3%', isPositive: false, icon: 'trending_down' },
    { name: 'NIFTY IT', value: '35,234.80', change: '+2.1%', isPositive: true, icon: 'trending_up' }
  ];

  constructor(private http: HttpClient) {}

  /**
   * Fetch market indices from backend Node service
   */
  fetchMarketIndices(): Observable<MarketIndex[]> {
    return this.http.get<NSEIndexResponse>(`${this.API_BASE_URL}/indices`).pipe(
      map(response => this.transformNSEData(response)),
      tap(indices => this.marketIndices.set(indices)),
      catchError(error => {
        console.error('Failed to fetch market data, using fallback:', error);
        this.marketIndices.set(this.FALLBACK_DATA);
        return of(this.FALLBACK_DATA);
      })
    );
  }

  /**
   * Transform NSE API response to our MarketIndex interface
   */
  private transformNSEData(response: NSEIndexResponse): MarketIndex[] {
    if (!response?.data || !Array.isArray(response.data)) {
      return this.FALLBACK_DATA;
    }

    const indexMap: { [key: string]: string } = {
      'NIFTY 50': 'NIFTY 50',
      'NIFTY BANK': 'BANK NIFTY',
      'INDIA VIX': 'INDIA VIX',
      'NIFTY IT': 'NIFTY IT'
    };

    const indices: MarketIndex[] = [];

    response.data.forEach(item => {
      const mappedName = indexMap[item.index];
      if (mappedName) {
        const isPositive = item.percentChange >= 0;
        indices.push({
          name: mappedName,
          value: this.formatNumber(item.last),
          change: `${isPositive ? '+' : ''}${item.percentChange.toFixed(2)}%`,
          isPositive: isPositive,
          icon: isPositive ? 'trending_up' : 'trending_down'
        });
      }
    });

    // Add SENSEX from separate endpoint or fallback
    indices.splice(1, 0, {
      name: 'SENSEX',
      value: '74,119.39',
      change: '+0.8%',
      isPositive: true,
      icon: 'trending_up'
    });

    return indices.length > 0 ? indices : this.FALLBACK_DATA;
  }

  /**
   * Format number with Indian numbering system
   */
  private formatNumber(num: number): string {
    return num.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  /**
   * Start polling for market data updates
   * Updates based on market status (respecting rate limits)
   */
  startPolling(intervalMs?: number): Observable<MarketIndex[]> {
    const pollingInterval = intervalMs || this.getPollingInterval();
    // Fetch immediately, then poll
    return interval(pollingInterval).pipe(
      switchMap(() => this.fetchMarketIndices())
    );
  }

  /**
   * Get current market indices signal
   */
  getMarketIndices() {
    return this.marketIndices.asReadonly();
  }

  /**
   * Check if market is open (IST 9:15 AM - 3:30 PM on weekdays)
   */
  isMarketOpen(): boolean {
    const now = new Date();
    const istOffset = 330; // IST is UTC+5:30
    const istTime = new Date(now.getTime() + (istOffset * 60000));
    
    const day = istTime.getDay(); // 0 = Sunday, 6 = Saturday
    const hours = istTime.getHours();
    const minutes = istTime.getMinutes();
    const timeInMinutes = hours * 60 + minutes;

    // Market hours: Monday-Friday, 9:15 AM (555 min) to 3:30 PM (930 min)
    const isWeekday = day >= 1 && day <= 5;
    const isMarketHours = timeInMinutes >= 555 && timeInMinutes <= 930;

    return isWeekday && isMarketHours;
  }

  /**
   * Get appropriate polling interval based on market status
   */
  getPollingInterval(): number {
    return this.isMarketOpen() 
      ? environment.marketPolling.openInterval
      : environment.marketPolling.closedInterval;
  }

  /**
   * Fetch stock movers (gainers, losers, most active)
   */
  fetchStockMovers(): Observable<{ topGainers: Stock[]; topLosers: Stock[]; mostActive: Stock[] }> {
    return this.http.get<StockMoversResponse>(`${this.API_BASE_URL}/stocks/movers`).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Failed to fetch stock movers:', error);
        return of({
          topGainers: [],
          topLosers: [],
          mostActive: []
        });
      })
    );
  }

  /**
   * Fetch market statistics
   */
  fetchMarketStats(): Observable<MarketStats> {
    return this.http.get<{ success: boolean; data: MarketStats }>(`${this.API_BASE_URL}/stats`).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Failed to fetch market stats:', error);
        return of({
          advances: 0,
          declines: 0,
          unchanged: 0,
          fiftyTwoWeekHigh: 0,
          fiftyTwoWeekLow: 0,
          marketCap: 'N/A'
        });
      })
    );
  }

  /**
   * Fetch sectoral performance
   */
  fetchSectors(): Observable<Sector[]> {
    return this.http.get<{ success: boolean; data: Sector[] }>(`${this.API_BASE_URL}/sectors`).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Failed to fetch sectors:', error);
        return of([]);
      })
    );
  }

  /**
   * Fetch currency rates
   */
  fetchCurrencies(): Observable<Currency[]> {
    return this.http.get<{ success: boolean; data: Currency[] }>(`${this.API_BASE_URL}/currencies`).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Failed to fetch currencies:', error);
        return of([]);
      })
    );
  }

  /**
   * Fetch commodity prices
   */
  fetchCommodities(): Observable<Commodity[]> {
    return this.http.get<{ success: boolean; data: Commodity[] }>(`${this.API_BASE_URL}/commodities`).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Failed to fetch commodities:', error);
        return of([]);
      })
    );
  }

  /**
   * Check market status from backend
   */
  fetchMarketStatus(): Observable<{ isOpen: boolean; currentTime: string; nextUpdate: string }> {
    return this.http.get<any>(`${this.API_BASE_URL}/status`).pipe(
      map(response => ({
        isOpen: response.isOpen || false,
        currentTime: response.currentTime || new Date().toISOString(),
        nextUpdate: response.nextUpdate || '1 minute'
      })),
      catchError(() => of({
        isOpen: this.isMarketOpen(),
        currentTime: new Date().toISOString(),
        nextUpdate: '1 minute'
      }))
    );
  }
}
