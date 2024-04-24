import { ChartData, ChartOptions } from 'chart.js';
export interface ProcessedChartDataset {
  label: string;
  data: number[];
  borderColor?: string;
  backgroundColor?: string;
  fill?: boolean;
}

export interface ProcessedChartData extends ChartData {
  labels: Array<string>;
  datasets: Array<ProcessedChartDataset>;
}

export interface LineChartOptions extends ChartOptions {}
