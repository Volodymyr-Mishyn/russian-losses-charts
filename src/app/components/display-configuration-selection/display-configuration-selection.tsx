"use client";
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
      <RangeSelection
        startDate={startDateObject}
        endDate={endDateObject}
        rangeLimit={rangeLimit}
        onChange={(startDate, endDate) => {
          updateQueryDates(dateFormatter(startDate), dateFormatter(endDate));
        }}
      />
      <EntitySelection selectedEntities={selectedEntities} setSelectedEntities={updateQueryEntities} />
    </div>
  );
}
