import { formatDate } from "date-fns/format";

export function dateFormatter(date: Date): string {
  return formatDate(date, "dd-MM-yyyy");
}

export function isValidDateFormat(date: string): boolean {
  return /\d{2}-\d{2}-\d{4}/.test(date);
}
