import express, { Request, Response } from 'express';
import { defaultConfig, getConfig } from '../config/app-config';

const router = express.Router();

/**
 * GET /api/config
 * Returns the complete application configuration
 */
router.get('/', (_req: Request, res: Response) => {
  try {
    res.json({
      success: true,
      data: defaultConfig,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching config:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch configuration'
    });
  }
});

/**
 * GET /api/config/company
 * Returns company information
 */
router.get('/company', (_req: Request, res: Response) => {
  try {
    res.json({
      success: true,
      data: defaultConfig.company
    });
  } catch (error) {
    console.error('Error fetching company config:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch company configuration'
    });
  }
});

/**
 * GET /api/config/statistics
 * Returns statistics and metrics
 */
router.get('/statistics', (_req: Request, res: Response) => {
  try {
    res.json({
      success: true,
      data: defaultConfig.statistics
    });
  } catch (error) {
    console.error('Error fetching statistics config:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch statistics configuration'
    });
  }
});

/**
 * GET /api/config/financial-rates
 * Returns financial rates and returns
 */
router.get('/financial-rates', (_req: Request, res: Response) => {
  try {
    res.json({
      success: true,
      data: defaultConfig.financialRates
    });
  } catch (error) {
    console.error('Error fetching financial rates config:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch financial rates configuration'
    });
  }
});

/**
 * GET /api/config/tax-slabs
 * Returns tax slabs for all years
 * Optional query param: year (e.g., 2025-2026)
 */
router.get('/tax-slabs', (req: Request, res: Response) => {
  try {
    const year = req.query.year as string;
    
    if (year && defaultConfig.taxSlabs.years[year]) {
      res.json({
        success: true,
        data: {
          year,
          slabs: defaultConfig.taxSlabs.years[year],
          standardDeduction: defaultConfig.taxSlabs.standardDeduction[year],
          deductions: {
            section80C: defaultConfig.taxSlabs.section80C,
            section80D: defaultConfig.taxSlabs.section80D,
            nps: defaultConfig.taxSlabs.npsTaxBenefit
          }
        }
      });
    } else {
      res.json({
        success: true,
        data: defaultConfig.taxSlabs
      });
    }
  } catch (error) {
    console.error('Error fetching tax slabs config:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch tax slabs configuration'
    });
  }
});

/**
 * GET /api/config/quotes
 * Returns inspirational quotes
 * Optional query param: category
 */
router.get('/quotes', (req: Request, res: Response) => {
  try {
    const category = req.query.category as string;
    
    let quotes = defaultConfig.quotes;
    if (category) {
      quotes = quotes.filter(q => q.category === category);
    }
    
    res.json({
      success: true,
      data: quotes
    });
  } catch (error) {
    console.error('Error fetching quotes config:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch quotes configuration'
    });
  }
});

/**
 * GET /api/config/economic-indicators
 * Returns economic indicators
 */
router.get('/economic-indicators', (_req: Request, res: Response) => {
  try {
    res.json({
      success: true,
      data: defaultConfig.economicIndicators
    });
  } catch (error) {
    console.error('Error fetching economic indicators config:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch economic indicators configuration'
    });
  }
});

/**
 * GET /api/config/social-media
 * Returns social media links
 */
router.get('/social-media', (_req: Request, res: Response) => {
  try {
    res.json({
      success: true,
      data: defaultConfig.socialMedia
    });
  } catch (error) {
    console.error('Error fetching social media config:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch social media configuration'
    });
  }
});

/**
 * GET /api/config/:path
 * Returns configuration value by path
 * Example: /api/config/financialRates.ppf.currentRate
 */
router.get('/:path(*)', (req: Request, res: Response) => {
  try {
    const path = req.params.path;
    const value = getConfig(path);
    
    if (value === undefined) {
      res.status(404).json({
        success: false,
        error: `Configuration path '${path}' not found`
      });
    } else {
      res.json({
        success: true,
        path,
        data: value
      });
    }
  } catch (error) {
    console.error('Error fetching config by path:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch configuration'
    });
  }
});

/**
 * Future Enhancement: POST/PUT endpoints for updating configuration
 * These would be authenticated and would update the database
 */

export default router;
