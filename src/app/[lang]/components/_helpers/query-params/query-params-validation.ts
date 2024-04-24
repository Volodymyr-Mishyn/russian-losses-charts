import { BASIC_ENTITIES_FILTER } from "@/_core/constants/basic-entities-filter";
import { DATE_OF_INVASION_INSTANCE } from "@/_core/constants/russian-invasion-date";
import { dateFormatter, isValidDateFormat } from "@/_core/helpers/date-formatter";
import { ALL_ENTITIES_SET, EntityNamesEnum } from "@/_core/models/loss-entities";

export function areValidDates(startDate: string | null, endDate: string | null): boolean {
  if (!startDate || !endDate) {
    return false;
  }
  if (!isValidDateFormat(startDate) || !isValidDateFormat(endDate)) {
    return false;
  }
  const startDateObject = new Date(startDate);
  const endDateObject = new Date(endDate);
  if (isNaN(startDateObject.getTime()) || isNaN(endDateObject.getTime())) {
    return false;
  }
  return new Date(startDate) < new Date(endDate);
}

export function areValidEntities(selectedEntities: Array<string>): boolean {
  if (selectedEntities.length === 0) {
    return false;
  }
  const entitiesNames = selectedEntities.map((entity) => entity as EntityNamesEnum);
  return entitiesNames.every((entity) => ALL_ENTITIES_SET.has(entity));
}

export function validateEntities(entities: Array<string>): Array<string> {
  return areValidEntities(entities) ? entities : BASIC_ENTITIES_FILTER;
}

export function validateDates(startDate: string | null, endDate: string | null): [string, string] {
  if (areValidDates(startDate, endDate)) {
    return [startDate as string, endDate as string];
  }
  const startDateObject = DATE_OF_INVASION_INSTANCE;
  const endDateObject = new Date();
  return [dateFormatter(startDateObject), dateFormatter(endDateObject)];
}
