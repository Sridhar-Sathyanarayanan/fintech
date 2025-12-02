import { Router, Request, Response } from 'express';
import fetch from 'node-fetch';
import { 
  NSE_CONSTANTS, 
  NSE_HEADERS, 
  MARKET_HOURS, 
  HTTP_STATUS,
  EXTERNAL_APIS,
  formatVolume
} from '../config/index.js';

const router = Router();

// Cache configuration
interface CacheStore {
  [key: string]: {
    data: any;
    timestamp: number;
  };
}

const cache: CacheStore = {};
const CACHE_DURATION = NSE_CONSTANTS.CACHE_DURATION;

/**
 * Required headers to bypass NSE's blocking
 */
const getNSEHeaders = () => NSE_HEADERS;

/**
 * Helper function to get cached data or fetch new
 */
function getCachedOrFetch<T>(key: string, fetchFn: () => Promise<T>): Promise<T> {
  const now = Date.now();
  const cached = cache[key];

  if (cached && (now - cached.timestamp) < CACHE_DURATION) {
    return Promise.resolve(cached.data);
  }

  return fetchFn().then(data => {
    cache[key] = { data, timestamp: now };
    return data;
  });
}

/**
 * GET /api/market/indices
 * Fetch all NSE indices with caching
 */
router.get('/indices', async (_req: Request, res: Response) => {
  try {
    const data = await getCachedOrFetch('indices', async () => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), NSE_CONSTANTS.API_TIMEOUT);

      const response = await fetch(NSE_CONSTANTS.INDICES_URL, {
        headers: getNSEHeaders(),
        signal: controller.signal
      });

      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error(`NSE API returned status ${response.status}`);
      }

      const result: any = await response.json();
      const indices = result.data || [];
      
      return indices.map((item: any) => ({
        index: item.index || item.indexSymbol,
        last: parseFloat(item.last || item.lastPrice || 0),
        variation: parseFloat(item.variation || item.change || 0),
        percentChange: parseFloat(item.percentChange || item.pChange || 0),
        open: parseFloat(item.open || 0),
        high: parseFloat(item.high || 0),
        low: parseFloat(item.low || 0),
        previousClose: parseFloat(item.previousClose || item.prevClose || 0),
        timestamp: item.timeVal || new Date().toISOString()
      }));
    });

    return res.status(200).json({
      success: true,
      data,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('NSE API Error:', error.message);

    return res.status(503).json({
      success: false,
      error: 'Market data service temporarily unavailable',
      message: 'Unable to fetch live market indices. Please try again later.',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /api/market/index/:symbol
 * Fetch specific index data
 */
router.get('/index/:symbol', async (req: Request, res: Response) => {
  try {
    const { symbol } = req.params;
    
    if (!cache['indices']?.data) {
      return res.status(503).json({
        success: false,
        error: 'Market data not available',
        message: 'Unable to fetch index data. Please try again later.'
      });
    }
    
    const indices = cache['indices'].data;
    const indexData = indices.find((item: any) => 
      item.index.toLowerCase().includes(symbol.toLowerCase())
    );

    if (indexData) {
      return res.status(200).json({
        success: true,
        data: indexData,
        timestamp: new Date().toISOString()
      });
    }

    return res.status(404).json({
      success: false,
      message: `Index ${symbol} not found`
    });

  } catch (error: any) {
    console.error('Index fetch error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch index data',
      error: error.message
    });
  }
});

/**
 * GET /api/market/stocks/movers
 * Fetch top gainers, losers, and most active stocks
 */
router.get('/stocks/movers', async (_req: Request, res: Response) => {
  try {
    const data = await getCachedOrFetch('stock-movers', async () => {
      // Using NSE API for stock data
      const gainersUrl = NSE_CONSTANTS.STOCK_GAINERS_URL;
      const losersUrl = NSE_CONSTANTS.STOCK_LOSERS_URL;
      const activeUrl = NSE_CONSTANTS.ACTIVE_STOCKS_URL;

      const [gainersRes, losersRes, activeRes] = await Promise.allSettled([
        fetch(gainersUrl, { headers: getNSEHeaders() }),
        fetch(losersUrl, { headers: getNSEHeaders() }),
        fetch(activeUrl, { headers: getNSEHeaders() })
      ]);

      let topGainers: any[] = [];
      let topLosers: any[] = [];
      let mostActive: any[] = [];

      if (gainersRes.status === 'fulfilled' && gainersRes.value.ok) {
        const data: any = await gainersRes.value.json();
        topGainers = data.data?.slice(0, 5) || topGainers;
      }

      if (losersRes.status === 'fulfilled' && losersRes.value.ok) {
        const data: any = await losersRes.value.json();
        topLosers = data.data?.slice(0, 5) || topLosers;
      }

      if (activeRes.status === 'fulfilled' && activeRes.value.ok) {
        const data: any = await activeRes.value.json();
        mostActive = data.data?.slice(0, 5) || mostActive;
      }

      return {
        topGainers: topGainers.map((stock: any) => ({
          symbol: stock.symbol,
          name: stock.meta?.companyName || stock.symbol,
          price: parseFloat(stock.lastPrice || stock.ltp || 0).toFixed(2),
          change: parseFloat(stock.pChange || stock.perChange || 0).toFixed(2)
        })),
        topLosers: topLosers?.map((stock: any) => ({
          symbol: stock.symbol,
          name: stock.meta?.companyName || stock.symbol,
          price: parseFloat(stock.lastPrice || stock.ltp || 0).toFixed(2),
          change: parseFloat(stock.pChange || stock.perChange || 0).toFixed(2)
        })),
        mostActive: mostActive.map((stock: any) => ({
          symbol: stock.symbol,
          name: stock.meta?.companyName || stock.symbol,
          price: parseFloat(stock.lastPrice || stock.ltp || 0).toFixed(2),
          change: parseFloat(stock.pChange || stock.perChange || 0).toFixed(2),
          volume: formatVolume(stock.quantity || stock.tradedQuantity || 0)
        }))
      };
    });

    return res.status(200).json({
      success: true,
      data,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Stock movers error:', error.message);
    return res.status(503).json({
      success: false,
      error: 'Stock data service unavailable',
      message: 'Unable to fetch stock movers data. Please try again later.',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /api/market/stats
 * Fetch market statistics (advances, declines, etc.)
 */
router.get('/stats', async (_req: Request, res: Response) => {
  try {
    const data = await getCachedOrFetch('market-stats', async () => {
      const advDecUrl = NSE_CONSTANTS.ADVANCE_DECLINE_URL;
      
      const response = await fetch(advDecUrl, { headers: getNSEHeaders() });
      if (!response.ok) {
        throw new Error(`Stats API returned status ${response.status}`);
      }
      
      const result: any = await response.json();
      return {
        advances: result.advances || 0,
        declines: result.declines || 0,
        unchanged: result.unchanged || 0,
        fiftyTwoWeekHigh: result.high52 || 0,
        fiftyTwoWeekLow: result.low52 || 0,
        marketCap: result.marketCap || 'N/A'
      };
    });

    return res.status(200).json({
      success: true,
      data,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    return res.status(503).json({
      success: false,
      error: 'Market statistics unavailable',
      message: 'Unable to fetch market statistics. Please try again later.',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /api/market/sectors
 * Fetch sectoral indices performance
 */
router.get('/sectors', async (_req: Request, res: Response) => {
  try {
    const data = await getCachedOrFetch('sectors', async () => {
      const response = await fetch(NSE_CONSTANTS.INDICES_URL, { headers: getNSEHeaders() });
      
      if (!response.ok) {
        throw new Error(`Sectors API returned status ${response.status}`);
      }
      
      const result: any = await response.json();
      const sectorIndices = (result.data || []).filter((item: any) => 
        item.index && (
          item.index.includes('NIFTY IT') ||
          item.index.includes('NIFTY BANK') ||
          item.index.includes('NIFTY PHARMA') ||
          item.index.includes('NIFTY AUTO') ||
          item.index.includes('NIFTY FMCG') ||
          item.index.includes('NIFTY REALTY') ||
          item.index.includes('NIFTY METAL') ||
          item.index.includes('NIFTY ENERGY')
        )
      );

      return sectorIndices.map((sector: any) => ({
        name: sector.index.replace('NIFTY ', ''),
        index: sector.index,
        value: parseFloat(sector.last || 0).toFixed(2),
        change: parseFloat(sector.percentChange || 0).toFixed(2) + '%',
        isPositive: parseFloat(sector.percentChange || 0) >= 0
      }));
    });

    return res.status(200).json({
      success: true,
      data,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    return res.status(503).json({
      success: false,
      error: 'Sector data unavailable',
      message: 'Unable to fetch sector indices. Please try again later.',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /api/market/currencies
 * Fetch currency rates (using exchange rate API)
 */
router.get('/currencies', async (_req: Request, res: Response) => {
  try {
    const data = await getCachedOrFetch('currencies', async () => {
      // Using exchangerate-api.com (free tier: 1500 requests/month)
      const url = EXTERNAL_APIS.EXCHANGE_RATE_URL;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Currency API returned status ${response.status}`);
      }
      
      const result: any = await response.json();
      const rates = result.rates;
      
      if (!rates) {
        throw new Error('Invalid currency API response');
      }
      
      return [
        {
          pair: 'USD/INR',
          description: 'US Dollar',
          rate: `₹${(1 / rates.USD).toFixed(2)}`,
          change: '+0.15%',
          isPositive: true
        },
        {
          pair: 'EUR/INR',
          description: 'Euro',
          rate: `₹${(1 / rates.EUR).toFixed(2)}`,
          change: '+0.23%',
          isPositive: true
        },
        {
          pair: 'GBP/INR',
          description: 'British Pound',
          rate: `₹${(1 / rates.GBP).toFixed(2)}`,
          change: '-0.08%',
          isPositive: false
        },
        {
          pair: 'JPY/INR',
          description: 'Japanese Yen',
          rate: `₹${(1 / rates.JPY).toFixed(2)}`,
          change: '+0.12%',
          isPositive: true
        }
      ];
    });

    return res.status(200).json({
      success: true,
      data,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    return res.status(503).json({
      success: false,
      error: 'Currency data unavailable',
      message: 'Unable to fetch currency rates. Please try again later.',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /api/market/commodities
 * Fetch commodity prices
 */
router.get('/commodities', async (_req: Request, res: Response) => {
  try {
    const data = await getCachedOrFetch('commodities', async () => {
      // For demo, return structured data
      // In production, integrate with commodity price APIs like MCX India
      return [
        {
          name: 'Gold',
          unit: '10 gm',
          price: '₹61,245',
          change: '+0.45%',
          isPositive: true
        },
        {
          name: 'Silver',
          unit: '1 kg',
          price: '₹74,832',
          change: '-0.32%',
          isPositive: false
        },
        {
          name: 'Crude Oil',
          unit: 'bbl',
          price: '₹6,234',
          change: '+1.23%',
          isPositive: true
        },
        {
          name: 'Natural Gas',
          unit: 'mmBtu',
          price: '₹245',
          change: '-0.67%',
          isPositive: false
        }
      ];
    });

    return res.status(200).json({
      success: true,
      data,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    return res.status(503).json({
      success: false,
      error: 'Commodity data unavailable',
      message: 'Unable to fetch commodity prices. Please try again later.',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /api/market/status
 * Check if market is open
 */
router.get('/status', (_req: Request, res: Response) => {
  const now = new Date();
  const istOffset = MARKET_HOURS.IST_OFFSET_MINUTES;
  const istTime = new Date(now.getTime() + (istOffset * 60000));
  
  const day = istTime.getDay();
  const hours = istTime.getHours();
  const minutes = istTime.getMinutes();
  const timeInMinutes = hours * 60 + minutes;

  const marketOpenTime = MARKET_HOURS.OPEN_TIME_MINUTES;
  const marketCloseTime = MARKET_HOURS.CLOSE_TIME_MINUTES;
  
  const isWeekday = day >= MARKET_HOURS.WEEKDAY_START && day <= MARKET_HOURS.WEEKDAY_END;
  const isMarketHours = timeInMinutes >= marketOpenTime && timeInMinutes <= marketCloseTime;
  const isOpen = isWeekday && isMarketHours;

  res.status(HTTP_STATUS.OK).json({
    success: true,
    isOpen,
    currentTime: istTime.toISOString(),
    marketHours: {
      open: MARKET_HOURS.OPEN_TIME_LABEL,
      close: MARKET_HOURS.CLOSE_TIME_LABEL,
      days: MARKET_HOURS.DAYS_LABEL
    },
    nextUpdate: isOpen ? '1 minute' : '5 minutes'
  });
});

export default router;
