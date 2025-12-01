/**
 * Chart.js Configuration Models
 * 
 * Contains:
 * - Chart.js type definitions and configurations
 * - Tax slab structures for visualization
 * - Chart data and display models
 */

// ==================== CHART.JS CONTEXT MODELS ====================

export interface ChartLabelContext {
  dataset: {
    label: string;
  };
  parsed: {
    y: number;
  };
}

export interface ChartTooltipCallbackContext {
  dataset: {
    label: string;
  };
  parsed: {
    y: number;
  };
}

export interface ChartScaleCallbackContext {
  value: number;
}

// ==================== CHART OPTIONS MODELS ====================

export interface ChartLegendOptions {
  position: 'top' | 'bottom' | 'left' | 'right';
  labels: {
    font: {
      size: number;
      weight: string;
    };
    padding: number;
    usePointStyle: boolean;
  };
}

export interface ChartTitleOptions {
  display: boolean;
}

export interface ChartTooltipOptions {
  backgroundColor: string;
  padding: number;
  titleFont: {
    size: number;
    weight: string;
  };
  bodyFont: {
    size: number;
  };
  borderColor: string;
  borderWidth: number;
  callbacks?: {
    label?: (context: ChartLabelContext) => string;
  };
}

export interface ChartPluginsOptions {
  legend?: ChartLegendOptions;
  title?: ChartTitleOptions;
  tooltip?: ChartTooltipOptions;
  [key: string]: any;
}

export interface ChartScaleOptions {
  x?: {
    grid?: { display: boolean };
    ticks?: {
      font?: { size: number; weight: string };
      color?: string;
    };
  };
  y?: {
    beginAtZero?: boolean;
    max?: number;
    ticks?: {
      stepSize?: number;
      font?: { size: number; weight: string };
      color?: string;
      callback?: (value: number | string | undefined) => string;
    };
  };
}

export interface ChartOptions extends Record<string, any> {
  responsive?: boolean;
  maintainAspectRatio?: boolean;
}

// ==================== CHART DATA MODELS ====================

export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor: string;
  borderRadius: number;
  barThickness: number;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

// ==================== TAX SLAB MODELS ====================

export interface TaxSlab {
  range: string;
  rate: string;
}

export interface ComparisonData {
  range: string;
  oldRate: string;
  newRate: string;
}

export interface SlabYear {
  old: TaxSlab[];
  new: TaxSlab[];
}

// ==================== TAX SLAB CALCULATION MODELS ====================

export interface TaxSlabEntry {
  upTo: number;
  rate: number;
  label: string;
}

export interface OldRegimeSlabs {
  below60: TaxSlabEntry[];
  senior: TaxSlabEntry[];
}

export interface OldRegimeSlabsByYear {
  [year: string]: OldRegimeSlabs;
}

export interface NewRegimeSlabEntry {
  upTo: number;
  rate: number;
  label: string;
  surcharge?: number;
}

export interface NewRegimeSlabsByYear {
  [year: string]: NewRegimeSlabEntry[];
}
