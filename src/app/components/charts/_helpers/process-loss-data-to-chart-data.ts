import { ENTITY_COLOUR_MAP, EntityNamesEnum, RussianLossesPartialData } from '../../../../_core/models/loss-entities';
import { ProcessedChartData, ProcessedChartDataset } from '../_models/line-chart-data';

export interface ProcessedChartDataOptions {
  fill?: boolean;
  hasBackgroundColour?: boolean;
  hasBorderColour?: boolean;
}

export function processLossDataToChartData(
  data: RussianLossesPartialData,
  options: ProcessedChartDataOptions = { fill: true, hasBackgroundColour: true, hasBorderColour: true }
): ProcessedChartData {
  if (!data.length) {
    return {
      labels: [],
      datasets: [],
    };
  }
  const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const labels = sortedData.map((item) => item.date.toISOString());
  const datasets: Record<string, ProcessedChartDataset> = {};
  const presentEntitesKeys = Object.keys(sortedData[0].data) as Array<EntityNamesEnum>;
  presentEntitesKeys.forEach((entity) => {
    datasets[entity] = {
      label: entity,
      data: [],
      borderColor: options.hasBorderColour ? ENTITY_COLOUR_MAP[entity] : 'rgba(0, 0, 0, 0)',
      backgroundColor: options.hasBackgroundColour ? ENTITY_COLOUR_MAP[entity] : 'rgba(0, 0, 0, 0)',
      fill: options.fill,
    };
  });

  sortedData.forEach((dayResult) => {
    presentEntitesKeys.forEach((entity) => {
      const increment = dayResult.data[entity as EntityNamesEnum]?.increment || 0;
      datasets[entity].data.push(increment);
    });
  });
  const datasetsArray = Object.values(datasets);
  return {
    labels,
    datasets: datasetsArray,
  };
}
