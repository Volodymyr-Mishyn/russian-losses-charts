"use client";
import { EntitySelection } from "../entity-selection/entity-selection";
import { RangeSelection } from "../range-selection/range-selection";

export function DisplayConfigurationSelection() {
  return (
    <div className="flex flex-col gap-4">
      <RangeSelection startDate={new Date()} endDate={new Date()} onChange={(startDate, endDate) => {}} />
      <EntitySelection />
    </div>
  );
}
