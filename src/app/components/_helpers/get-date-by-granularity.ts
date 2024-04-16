import { format, startOfYear, startOfMonth, startOfWeek } from "date-fns";

import { Granularity } from "@/_core/models/data-granularity";

export function getDateByGranularity(date: Date, granularity: Granularity): string {
  let dateString: string;
  switch (granularity) {
    case "year":
      dateString = format(startOfYear(date), "yyyy");
      break;
    case "month":
      dateString = format(startOfMonth(date), "yyyy-MM");
      break;
    case "week":
      const weekStartsOn = startOfWeek(date, { weekStartsOn: 1 });
      const copy = new Date(weekStartsOn);
      const weekEndDay = new Date(copy.setDate(copy.getDate() + 6));
      dateString = format(weekStartsOn, "yyyy-MM-dd") + " - " + format(weekEndDay, "yyyy-MM-dd");
      break;
    case "day":
      dateString = format(date, "yyyy-MM-dd");
      break;
    default:
      throw new Error(`Unsupported granularity: ${granularity}`);
  }
  return dateString;
}
