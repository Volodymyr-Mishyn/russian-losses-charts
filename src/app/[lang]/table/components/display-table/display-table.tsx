"use client";
import { RussianLossesData } from "@/_core/models/loss-entities";
import { filterDataByQueryParams } from "@/app/[lang]/components/_helpers/query-params/filter-data-by-query-params";
import { useQueryParams } from "@/_core/hooks/query-params";
import { TableContainer } from "@/app/[lang]/components/tables/table-container/table-container";
import { DisplayDataContext } from "@/app/[lang]/components/display-data-context/display-data-context";
import { DictionaryElement } from "@/i18n-config";

export function DisplayTable({ data, dictionary }: { data: RussianLossesData; dictionary: DictionaryElement }) {
  const [params] = useQueryParams();
  const { granularity } = params;
  const filteredData = filterDataByQueryParams(data, params);
  return (
    <DisplayDataContext data={filteredData} granularity={granularity} dictionary={dictionary}>
      <TableContainer functionality={false} />
    </DisplayDataContext>
  );
}
