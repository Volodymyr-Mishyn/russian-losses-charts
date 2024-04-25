"use client";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DisplayConfigurationContext } from "../_store/display-configuration.context";
import { useContext } from "react";
import { DictionaryElement } from "@/i18n-config";

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
  const context = useContext(DisplayConfigurationContext);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={context.dateLocale}>
      <div className="flex flex-row gap-4">
        <DatePicker
          label={(context.dictionary.diapasonSelection as DictionaryElement).startDate as string}
          value={startDate}
          minDate={rangeLimit.min}
          maxDate={endDate}
          onChange={(newValue) => onChange(newValue as Date, endDate)}
        />
        <DatePicker
          label={(context.dictionary.diapasonSelection as DictionaryElement).endDate as string}
          value={endDate}
          minDate={startDate}
          maxDate={rangeLimit.max}
          onChange={(newValue) => onChange(startDate, newValue as Date)}
        />
      </div>
    </LocalizationProvider>
  );
}
