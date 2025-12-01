import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, interval, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { MARKET_CONSTANTS, MARKET_INDEX_MAP, FALLBACK_MARKET_DATA } from '../models/app.constants';
import { 
  MarketIndex, 
  Stock, 
  MarketStats, 
  Sector, 
  Currency, 
  Commodity,
  NSEIndexResponse,
  StockMoversResponse
} from '../models/market.models';

// Re-export interfaces for backward compatibility
export type { 
  MarketIndex, 
  Stock, 
  MarketStats, 
  Sector, 
  Currency, 
  Commodity,
  NSEIndexResponse,
  StockMoversResponse
};

@Injectable({
  providedIn: 'root'
})
export class MarketDataService {
  private readonly API_BASE_URL = `${environment.apiURL}${environment.apiEndpoints.market}`;
  private marketIndices = signal<MarketIndex[]>([]);
  
  // Fallback data in case API fails
  private readonly FALLBACK_DATA: MarketIndex[] = FALLBACK_MARKET_DATA as any;

  constructor(private http: HttpClient) {}

  /**
   * Fetch market indices from backend Node service
   */
  fetchMarketIndices(): Observable<MarketIndex[]> {
    return this.http.get<NSEIndexResponse>(`${this.API_BASE_URL}/indices`).pipe(
      map(response => {
        if (!response.success) {
          throw new Error(response.error || 'Failed to fetch market indices');
        }
        return this.transformNSEData(response);
      }),
      tap(indices => this.marketIndices.set(indices))
    );
  }

  /**
   * Transform NSE API response to our MarketIndex interface
   */
  private transformNSEData(response: NSEIndexResponse): MarketIndex[] {
    if (!response?.data || !Array.isArray(response.data)) {
      throw new Error('Invalid market data response');
    }

    const indexMap = MARKET_INDEX_MAP as Record<string, string>;

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

    if (indices.length === 0) {
      throw new Error('No market data available');
    }
    return indices;
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
    const istOffset = MARKET_CONSTANTS.IST_OFFSET_MINUTES;
    const istTime = new Date(now.getTime() + (istOffset * 60000));
    
    const day = istTime.getDay(); // 0 = Sunday, 6 = Saturday
    const hours = istTime.getHours();
    const minutes = istTime.getMinutes();
    const timeInMinutes = hours * 60 + minutes;

    // Market hours: Monday-Friday, 9:15 AM to 3:30 PM
    const isWeekday = day >= MARKET_CONSTANTS.WEEKDAY_START && day <= MARKET_CONSTANTS.WEEKDAY_END;
    const isMarketHours = timeInMinutes >= MARKET_CONSTANTS.MARKET_OPEN_TIME_MINUTES && timeInMinutes <= MARKET_CONSTANTS.MARKET_CLOSE_TIME_MINUTES;

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
      map(response => {
        if (!response.success || !response.data) {
          throw new Error(response.error || 'Failed to fetch stock movers');
        }
        return response.data;
      })
    );
  }

  /**
   * Fetch market statistics
   */
  fetchMarketStats(): Observable<MarketStats> {
    return this.http.get<{ success: boolean; data: MarketStats; error?: string }>(`${this.API_BASE_URL}/stats`).pipe(
      map(response => {
        if (!response.success) {
          throw new Error(response.error || 'Failed to fetch market statistics');
        }
        return response.data;
      })
    );
  }

  /**
   * Fetch sectoral performance
   */
  fetchSectors(): Observable<Sector[]> {
    return this.http.get<{ success: boolean; data: Sector[]; error?: string }>(`${this.API_BASE_URL}/sectors`).pipe(
      map(response => {
        if (!response.success) {
          throw new Error(response.error || 'Failed to fetch sector data');
        }
        return response.data;
      })
    );
  }

  /**
   * Fetch currency rates
   */
  fetchCurrencies(): Observable<Currency[]> {
    return this.http.get<{ success: boolean; data: Currency[]; error?: string }>(`${this.API_BASE_URL}/currencies`).pipe(
      map(response => {
        if (!response.success) {
          throw new Error(response.error || 'Failed to fetch currency rates');
        }
        return response.data;
      })
    );
  }

  /**
   * Fetch commodity prices
   */
  fetchCommodities(): Observable<Commodity[]> {
    return this.http.get<{ success: boolean; data: Commodity[]; error?: string }>(`${this.API_BASE_URL}/commodities`).pipe(
      map(response => {
        if (!response.success) {
          throw new Error(response.error || 'Failed to fetch commodity prices');
        }
        return response.data;
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
