import {
  DayResultData,
  DayResultFlatPartial,
  EntityNamesEnum,
  RussianLossesData,
  RussianLossesPartialData,
} from "@/_core/models/loss-entities";
import { QueryParamsState } from "@/_core/models/query-params";

export function filterDataByQueryParams(data: RussianLossesData, params: QueryParamsState): RussianLossesPartialData {
  const { selectedEntities, startDate, endDate } = params;
  const selectedEntitiesSet = new Set(selectedEntities);
  const startDateObject = new Date(startDate);
  const endDateObject = new Date(endDate);
  const dataInRange = data.filter((item) => {
    return item.date >= startDateObject && item.date <= endDateObject;
  });
  const mappedData: RussianLossesPartialData = dataInRange.map((item) => {
    const filteredObject: Partial<DayResultData> = {};
    Object.entries(item.data).forEach(([key, value]) => {
      if (selectedEntitiesSet.has(key as EntityNamesEnum)) {
        filteredObject[key as EntityNamesEnum] = value;
      }
    });
    return {
      date: item.date,
      dayOfInvasion: item.dayOfInvasion,
      data: filteredObject,
    } as DayResultFlatPartial;
  });
  return mappedData;
}
