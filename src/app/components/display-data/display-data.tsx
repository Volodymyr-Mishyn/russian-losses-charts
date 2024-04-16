"use client";

import { RussianLossesData } from "@/_core/models/loss-entities";
import { useQueryParams } from "../display-configuration-selection/hooks/query-params";
import { ChartContainer } from "../charts/chart-container/chart-container";
import { filterDataByQueryParams } from "../_helpers/query-params/filter-data-by-query-params";

export function DisplayData({ data }: { data: RussianLossesData }) {
  const [params] = useQueryParams();
  const { granularity } = params;
  const filteredData = filterDataByQueryParams(data, params);
  //   console.log(filteredData);
  return <ChartContainer data={filteredData} granularity={granularity} />;
}
