"use client";
import { RussianLossesData } from "@/_core/models/loss-entities";
import { filterDataByQueryParams } from "@/app/components/_helpers/query-params/filter-data-by-query-params";
import { useQueryParams } from "@/app/components/display-configuration-selection/hooks/query-params";
import { TableContainer } from "@/app/components/tables/table-container/table-container";

export function DisplayTable({ data }: { data: RussianLossesData }) {
  const [params] = useQueryParams();
  const { granularity } = params;
  const filteredData = filterDataByQueryParams(data, params);
  return <TableContainer data={filteredData} granularity={granularity} />;
}
