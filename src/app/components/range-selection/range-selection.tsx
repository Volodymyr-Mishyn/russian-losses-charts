"use client";
import { useEffect, useState } from "react";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { enUS } from "date-fns/locale/en-US";
import { uk } from "date-fns/locale/uk";

interface DateRange {
  startDate: Date;
  endDate: Date;
  rangeLimit: {
    min: Date;
    max: Date;
  };
}
export interface RangeSelectionProps extends DateRange {
  onChange: (startDate: Date, endDate: Date) => void;
}

export function RangeSelection({ startDate, endDate, rangeLimit, onChange }: RangeSelectionProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={uk}>
      <div className="flex flex-row gap-4">
        <DatePicker
          label="Start date"
          value={startDate}
          minDate={rangeLimit.min}
          maxDate={endDate}
          onChange={(newValue) => onChange(newValue as Date, endDate)}
        />
        <DatePicker
          label="End date"
          value={endDate}
          minDate={startDate}
          maxDate={rangeLimit.max}
          onChange={(newValue) => onChange(startDate, newValue as Date)}
        />
      </div>
    </LocalizationProvider>
  );
}
