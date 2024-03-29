export enum EntityNamesEnum {
  tank = "tank",
  armoredFightingVehicle = "armored_fighting_vehicle",
  artillerySystem = "artillery_system",
  MLRS = "mlrs",
  antiAircraft = "anti_aircraft",
  plane = "plane",
  helicopter = "helicopter",
  UAV = "uav",
  cruiseMissile = "cruise_missile",
  ship = "ship",
  submarine = "submarine", //14.09.2023
  carCistern = "car_cistern",
  specialEquipment = "special_equipment",
  personnel = "personnel",
}

export enum EntityCategories {
  personnel = "personnel",
  groundVehicles = "groundVehicles",
  artilleryVehicles = "artilleryVehicles",
  antiAircraftVehicles = "antiAircraftVehicles",
  aircraftVehicles = "aircraftVehicles",
  waterVehicles = "waterVehicles",
}

export type EntitiesMap = {
  [k in EntityCategories]: Array<EntityNamesEnum>;
};

export const ALL__ENTITIES: Array<EntityNamesEnum> = [
  EntityNamesEnum.personnel,
  EntityNamesEnum.tank,
  EntityNamesEnum.armoredFightingVehicle,
  EntityNamesEnum.specialEquipment,
  EntityNamesEnum.antiAircraft,
  EntityNamesEnum.artillerySystem,
  EntityNamesEnum.MLRS,
  EntityNamesEnum.plane,
  EntityNamesEnum.helicopter,
  EntityNamesEnum.cruiseMissile,
  EntityNamesEnum.UAV,
  EntityNamesEnum.ship,
  EntityNamesEnum.submarine,
  EntityNamesEnum.carCistern,
];

export const ENTITIES_MAP: EntitiesMap = {
  [EntityCategories.personnel]: [EntityNamesEnum.personnel],
  [EntityCategories.groundVehicles]: [
    EntityNamesEnum.tank,
    EntityNamesEnum.carCistern,
    EntityNamesEnum.armoredFightingVehicle,
    EntityNamesEnum.specialEquipment,
  ],
  [EntityCategories.antiAircraftVehicles]: [EntityNamesEnum.antiAircraft],
  [EntityCategories.artilleryVehicles]: [EntityNamesEnum.artillerySystem, EntityNamesEnum.MLRS],
  [EntityCategories.aircraftVehicles]: [
    EntityNamesEnum.plane,
    EntityNamesEnum.helicopter,
    EntityNamesEnum.cruiseMissile,
    EntityNamesEnum.UAV,
  ],
  [EntityCategories.waterVehicles]: [EntityNamesEnum.ship, EntityNamesEnum.submarine],
};

export type CalculatedData = {
  [key in EntityNamesEnum]: number;
};

export interface CalculatedDataElement {
  entityType: EntityNamesEnum;
  value: number;
}

export interface CalculatedIncrement {
  comparedToAverage: number;
  diffWithAverage: number;
  average: number;
  summary: number;
}

export interface EntityLossFlat {
  name: string;
  total: number;
  increment: number;
  calculatedIncrement?: CalculatedIncrement;
}

export type DayResultData = {
  [key in EntityNamesEnum]: EntityLossFlat;
};

export interface DayResultFlat {
  date: string;
  dayOfInvasion: number;
  data: DayResultData;
}

export type DataFlat = Array<DayResultFlat>;

export type RankingsFormat = "days" | "weeks" | "months";

export interface RankingsPlace {
  place: number;
  daysInPeriod: number;
  dates: {
    start: string;
    end: string;
  };
  daysOfInvasion: {
    start: number;
    end: number;
  };
  increment: number;
  format: RankingsFormat;
}

export interface Rankings {
  entityName: EntityNamesEnum;
  places: Array<RankingsPlace>;
}

export interface FullRankings {
  daily: Array<Rankings>;
  weekly: Array<Rankings>;
  monthly: Array<Rankings>;
}

export interface DataSliceWithCalculated {
  data: DataFlat;
  averageData: CalculatedData;
  summaryData: CalculatedData;
  rankings: FullRankings;
}
