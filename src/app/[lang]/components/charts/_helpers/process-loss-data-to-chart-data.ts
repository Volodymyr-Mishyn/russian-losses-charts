import { Granularity } from "../../../../../_core/models/data-granularity";
import {
  ENTITY_COLOUR_MAP,
  EntityNamesEnum,
  RussianLossesPartialData,
} from "../../../../../_core/models/loss-entities";
import { getDateByGranularity } from "../../_helpers/get-date-by-granularity";
import { ProcessedChartData, ProcessedChartDataset } from "../_models/line-chart-data";

export interface ProcessedChartDataOptions {
  fill?: boolean;
  hasBackgroundColour?: boolean;
  hasBorderColour?: boolean;
}

export function processLossDataToChartData(
  data: RussianLossesPartialData,
  options: ProcessedChartDataOptions = { fill: true, hasBackgroundColour: true, hasBorderColour: true },
  granularity: Granularity
): ProcessedChartData {
  if (!data.length) {
    return {
      labels: [],
      datasets: [],
    };
  }

  const datasets: Record<string, ProcessedChartDataset> = {};

  const presentEntitiesKeys = Object.keys(data[0].data) as Array<EntityNamesEnum>;
  presentEntitiesKeys.forEach((entity) => {
    datasets[entity] = {
      label: entity,
      data: [],
      borderColor: options.hasBorderColour ? ENTITY_COLOUR_MAP[entity] : "rgba(0, 0, 0, 0)",
      backgroundColor: options.hasBackgroundColour ? ENTITY_COLOUR_MAP[entity] : "rgba(0, 0, 0, 0)",
      fill: options.fill,
    };
  });

  const aggregation: Record<string, number[]> = {};
  data.forEach((dayResult) => {
    const key = getDateByGranularity(new Date(dayResult.date), granularity);
    presentEntitiesKeys.forEach((entity) => {
      const increment = dayResult.data[entity]?.increment || 0;
      if (!aggregation[key]) {
        aggregation[key] = new Array(presentEntitiesKeys.length).fill(0);
      }
      const index = presentEntitiesKeys.indexOf(entity);
      aggregation[key][index] += increment;
    });
  });

  const labels: string[] = Object.keys(aggregation).sort();
  labels.forEach((label) => {
    presentEntitiesKeys.forEach((entity, index) => {
      datasets[entity].data.push(aggregation[label][index]);
    });
  });

  return {
    labels,
    datasets: Object.values(datasets),
  };
}
