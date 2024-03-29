"use client";
import { useState } from "react";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { enUS } from "date-fns/locale/en-US";
import { uk } from "date-fns/locale/uk";

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}
export interface RangeSelectionProps extends DateRange {
  onChange: (startDate: Date, endDate: Date) => void;
}

export function RangeSelection({ startDate, endDate, onChange }: RangeSelectionProps) {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: startDate || null,
    endDate: endDate || null,
  });

  function rangeChanged(range: DateRange) {
    console.log("rangeChanged", range);
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={uk}>
      <div className="flex flex-row gap-4">
        <DatePicker
          label="Start date"
          value={dateRange.startDate}
          onChange={(newValue) => rangeChanged({ ...dateRange, startDate: newValue })}
        />
        <DatePicker
          label="End date"
          value={dateRange.endDate}
          onChange={(newValue) => rangeChanged({ ...dateRange, endDate: newValue })}
        />
      </div>
    </LocalizationProvider>
  );
}
