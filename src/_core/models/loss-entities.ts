export enum EntityNamesEnum {
  tank = 'tank',
  armoredFightingVehicle = 'armored_fighting_vehicle',
  artillerySystem = 'artillery_system',
  MLRS = 'mlrs',
  antiAircraft = 'anti_aircraft',
  plane = 'plane',
  helicopter = 'helicopter',
  UAV = 'uav',
  cruiseMissile = 'cruise_missile',
  ship = 'ship',
  submarine = 'submarine', //14.09.2023
  carCistern = 'car_cistern',
  specialEquipment = 'special_equipment',
  personnel = 'personnel',
}

export enum EntityCategories {
  personnel = 'personnel',
  groundVehicles = 'groundVehicles',
  artilleryVehicles = 'artilleryVehicles',
  antiAircraftVehicles = 'antiAircraftVehicles',
  aircraftVehicles = 'aircraftVehicles',
  waterVehicles = 'waterVehicles',
}

export type EntitiesMap = {
  [k in EntityCategories]: Array<EntityNamesEnum>;
};

export const ALL_ENTITIES: Array<EntityNamesEnum> = [
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

export const ALL_ENTITIES_SET: Set<EntityNamesEnum> = new Set(ALL_ENTITIES);

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

export interface EntityLossFlat {
  name: string;
  total: number;
  increment: number;
}

export type DayResultData = {
  [key in EntityNamesEnum]: EntityLossFlat;
};

export interface DayResultFlat {
  date: string;
  dayOfInvasion: number;
  data: DayResultData;
}

export interface DayResultFlatProcessed {
  date: Date;
  dayOfInvasion: number;
  data: DayResultData;
}

export interface DayResultFlatPartial {
  date: Date;
  dayOfInvasion: number;
  data: Partial<DayResultData>;
}

export type RussianLossesData = Array<DayResultFlatProcessed>;
export type RussianLossesPartialData = Array<DayResultFlatPartial>;

export const ENTITY_COLOUR_MAP: { [key in EntityNamesEnum]: string } = {
  tank: '#0074D9',
  armored_fighting_vehicle: '#7FDBFF',
  artillery_system: '#39CCCC',
  mlrs: '#3D9970',
  anti_aircraft: '#2ECC40',
  plane: '#01FF70',
  helicopter: '#FFDC00',
  uav: '#FF851B',
  cruise_missile: '#FF4136',
  ship: '#85144b',
  submarine: '#F012BE',
  car_cistern: '#B10DC9',
  special_equipment: '#AAAAAA',
  personnel: '#FF0000',
};
