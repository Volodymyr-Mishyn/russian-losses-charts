"use client";

import { RussianLossesData } from "@/_core/models/loss-entities";
import { useQueryParams } from "../../../../_core/hooks/query-params";
import { ChartContainer } from "../charts/chart-container/chart-container";
import { filterDataByQueryParams } from "../_helpers/query-params/filter-data-by-query-params";
import { TableContainer } from "../tables/table-container/table-container";
import { Tab, Tabs, Box } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { DictionaryElement } from "@/i18n-config";
import { DisplayDataContext } from "../display-data-context/display-data-context";

export function DisplayData({ data, dictionary }: { data: RussianLossesData; dictionary: DictionaryElement }) {
  const [params] = useQueryParams();
  const [value, setValue] = useState(0);
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const { granularity } = params;
  const filteredData = filterDataByQueryParams(data, params);
  const chartTitle = (dictionary.chart as DictionaryElement).tabTitle as string;
  const tableTitle = (dictionary.table as DictionaryElement).tabTitle as string;
  return (
    <Box style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
      <Tabs value={value} onChange={handleChange} aria-label="Display charts or tables" centered>
        <Tab label={chartTitle}></Tab>
        <Tab label={tableTitle}></Tab>
      </Tabs>
      <div className=" flex flex-col h-full flex-1 p-1 m-1 md:p-2 md:m-2" style={{ minHeight: "65vh" }}>
        <DisplayDataContext data={filteredData} dictionary={dictionary} granularity={granularity}>
          {value === 0 && <ChartContainer functionality={true} />}
          {value === 1 && <TableContainer functionality={true} />}
        </DisplayDataContext>
      </div>
    </Box>
  );
}
