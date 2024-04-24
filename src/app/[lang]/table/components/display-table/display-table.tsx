"use client";
import { RussianLossesData } from "@/_core/models/loss-entities";
import { filterDataByQueryParams } from "@/app/[lang]/components/_helpers/query-params/filter-data-by-query-params";
import { useQueryParams } from "@/app/[lang]/components/_hooks/query-params";
import { TableContainer } from "@/app/[lang]/components/tables/table-container/table-container";

export function DisplayTable({ data }: { data: RussianLossesData }) {
  const [params] = useQueryParams();
  const { granularity } = params;
  const filteredData = filterDataByQueryParams(data, params);
  return <TableContainer data={filteredData} granularity={granularity} functionality={false} />;
}
