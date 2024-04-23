"use client";
import { RussianLossesData } from "@/_core/models/loss-entities";
import { filterDataByQueryParams } from "@/app/components/_helpers/query-params/filter-data-by-query-params";
import { ChartContainer } from "@/app/components/charts/chart-container/chart-container";
import { useQueryParams } from "@/app/components/display-configuration-selection/hooks/query-params";

export function DisplayChart({ data }: { data: RussianLossesData }) {
  const [params] = useQueryParams();
  const { granularity } = params;
  const filteredData = filterDataByQueryParams(data, params);
  return <ChartContainer data={filteredData} granularity={granularity} functionality={false} />;
}
