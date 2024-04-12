"use client";
import Button from '@mui/material/Button';
import { dateFormatter } from "@/_core/helpers/date-formatter";
import { EntitySelection } from "../entity-selection/entity-selection";
import { RangeSelection } from "../range-selection/range-selection";
import { useQueryParams } from "./hooks/query-params";
import { DATE_OF_INVASION_INSTANCE } from "@/_core/constants/russian-invasion-date";

export function DisplayConfigurationSelection() {
  const [params, updateQueryEntities, updateQueryDates] = useQueryParams();
  const { selectedEntities, startDate, endDate } = params;
  const startDateObject = new Date(startDate);
  const endDateObject = new Date(endDate);
  const rangeLimit = {
    min: DATE_OF_INVASION_INSTANCE,
    max: new Date(),
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-2">
        <RangeSelection
          startDate={startDateObject}
          endDate={endDateObject}
          rangeLimit={rangeLimit}
          onChange={(startDate, endDate) => {
            updateQueryDates(dateFormatter(startDate), dateFormatter(endDate));
          }}
        />
        <Button
          variant="contained"
          onClick={() => {
            updateQueryDates(dateFormatter(DATE_OF_INVASION_INSTANCE), dateFormatter(new Date()));
          }} >
          Reset dates
        </Button>
      </div>
      <EntitySelection selectedEntities={selectedEntities} setSelectedEntities={updateQueryEntities} />
    </div>
  );
}
