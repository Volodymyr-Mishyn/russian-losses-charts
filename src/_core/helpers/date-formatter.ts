import { formatDate } from "date-fns/format";

export function dateFormatter(date: Date): string {
  return formatDate(date, "yyyy-MM-dd");
}

export function isValidDateFormat(date: string): boolean {
  return /\d{4}-\d{2}-\d{2}/.test(date);
}
