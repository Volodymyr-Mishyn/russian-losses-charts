import {
  CalculatedData,
  CalculatedIncrement,
  RussianLossesData,
  DayResultData,
  EntityLossFlat,
  EntityNamesEnum,
} from '../models/loss-entities';

export function calculateDaysData(
  inputData: RussianLossesData,
  averageData: CalculatedData,
  summaryData: CalculatedData
): RussianLossesData {
  return inputData.map((dayResult) => {
    const { data } = dayResult;
    const updatedData: DayResultData = Object.fromEntries(
      Object.entries(data).map(([key, entityLoss]) => {
        const keyName = key as EntityNamesEnum;
        const averageDataForEntity = averageData[keyName];
        const summaryDataForEntity = summaryData[keyName];
        const calculatedIncrement: CalculatedIncrement = {
          comparedToAverage: averageDataForEntity !== 0 ? +(entityLoss.increment / averageDataForEntity).toFixed(1) : 0,
          diffWithAverage: entityLoss.increment - averageDataForEntity,
          average: averageDataForEntity,
          summary: summaryDataForEntity,
        };
        const updatedEntityLoss: EntityLossFlat = {
          ...entityLoss,
          calculatedIncrement,
        };
        return [keyName, updatedEntityLoss];
      })
    ) as DayResultData;
    return { ...dayResult, data: updatedData };
  });
}
