import { CalculatedData, RussianLossesData, EntityNamesEnum } from '../models/loss-entities';

export function calculateSummary(data: RussianLossesData): CalculatedData {
  const averageData: CalculatedData = {
    tank: 0,
    armored_fighting_vehicle: 0,
    artillery_system: 0,
    mlrs: 0,
    anti_aircraft: 0,
    plane: 0,
    helicopter: 0,
    uav: 0,
    cruise_missile: 0,
    ship: 0,
    submarine: 0,
    car_cistern: 0,
    special_equipment: 0,
    personnel: 0,
  };
  return data.reduce((accumulator, dayData) => {
    Object.entries(dayData.data).forEach(([key, value]) => {
      const typeName = key as unknown as EntityNamesEnum;
      accumulator[typeName] = (accumulator[typeName] || 0) + value.increment;
    });
    return accumulator;
  }, averageData);
}

export function calculateAverage(data: RussianLossesData): CalculatedData {
  const calculatedSummary = calculateSummary(data);
  return Object.keys(calculatedSummary).reduce((accumulated, type) => {
    const typeName = type as EntityNamesEnum;
    accumulated[typeName] = +(calculatedSummary[typeName] / data.length).toFixed(1);
    return accumulated;
  }, {} as CalculatedData);
}
