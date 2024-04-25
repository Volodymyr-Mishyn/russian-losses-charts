"use client";
import { RussianLossesData } from "@/_core/models/loss-entities";
import { filterDataByQueryParams } from "@/app/[lang]/components/_helpers/query-params/filter-data-by-query-params";
import { ChartContainer } from "@/app/[lang]/components/charts/chart-container/chart-container";
import { useQueryParams } from "@/_core/hooks/query-params";
import { DisplayDataContext } from "@/app/[lang]/components/display-data-context/display-data-context";
import { DictionaryElement } from "@/i18n-config";

export function DisplayChart({ data, dictionary }: { data: RussianLossesData; dictionary: DictionaryElement }) {
  const [params] = useQueryParams();
  const { granularity } = params;
  const filteredData = filterDataByQueryParams(data, params);
  return (
    <DisplayDataContext data={filteredData} dictionary={dictionary} granularity={granularity}>
      <ChartContainer functionality={false} />
    </DisplayDataContext>
  );
}
