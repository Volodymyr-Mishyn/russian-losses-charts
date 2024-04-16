import { Granularity } from "./data-granularity";
import { EntityNamesEnum } from "./loss-entities";

export type QueryParamsState = {
  selectedEntities: Array<EntityNamesEnum>;
  startDate: string;
  endDate: string;
  granularity: Granularity;
};
