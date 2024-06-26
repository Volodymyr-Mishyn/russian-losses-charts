"use client";
import Button from "@mui/material/Button";
import { dateFormatter } from "@/_core/helpers/date-formatter";
import { EntitySelection } from "./entity-selection/entity-selection";
import { RangeSelection } from "./range-selection/range-selection";
import { useQueryParams } from "../../../../_core/hooks/query-params";
import { DATE_OF_INVASION_INSTANCE } from "@/_core/constants/russian-invasion-date";
import { GranularitySelection } from "./granularity-selection/granularity-selection";
import { Granularity } from "../../../../_core/models/data-granularity";
import { DictionaryElement } from "@/i18n-config";
import { useContext } from "react";
import { DisplayConfigurationContext } from "./_store/display-configuration.context";

export function DisplayConfigurationSelection() {
  const [params, updateQueryEntities, updateQueryDates, updateGranularity] = useQueryParams();
  const { selectedEntities, startDate, endDate, granularity } = params;
  const startDateObject = new Date(startDate);
  const endDateObject = new Date(endDate);
  const rangeLimit = {
    min: DATE_OF_INVASION_INSTANCE,
    max: new Date(),
  };
  const context = useContext(DisplayConfigurationContext);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 md:flex-row md:gap-6">
        <div className="flex flex-col justify-start items-center gap-2 md:flex-row md:items-stretch ">
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
            }}
          >
            {(context.dictionary.diapasonSelection as DictionaryElement).resetDates as string}
          </Button>
        </div>
        <GranularitySelection
          selectedGranularity={granularity}
          setSelectedGranularity={(newGranularity: Granularity) => updateGranularity(newGranularity)}
        ></GranularitySelection>
      </div>
      <EntitySelection selectedEntities={selectedEntities} setSelectedEntities={updateQueryEntities} />
    </div>
  );
}
