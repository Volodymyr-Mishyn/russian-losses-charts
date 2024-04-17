"use client";

import { RussianLossesData } from "@/_core/models/loss-entities";
import { useQueryParams } from "../display-configuration-selection/hooks/query-params";
import { ChartContainer } from "../charts/chart-container/chart-container";
import { filterDataByQueryParams } from "../_helpers/query-params/filter-data-by-query-params";
import { TableContainer } from "../tables/table-container/table-container";
import { Tab, Tabs, Box } from "@mui/material";
import { SyntheticEvent, useState } from "react";

export function DisplayData({ data }: { data: RussianLossesData }) {
  const [params] = useQueryParams();
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const { granularity } = params;
  const filteredData = filterDataByQueryParams(data, params);
  return (
    <Box style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
      <Tabs value={value} onChange={handleChange} aria-label="Display charts or tables" centered>
        <Tab label="Chart"></Tab>
        <Tab label="Table"></Tab>
      </Tabs>
      <div className=" flex flex-col h-full flex-1 p-1 m-1 md:p-2 md:m-2" style={{ minHeight: "50vh" }}>
        {value === 0 && <ChartContainer data={filteredData} granularity={granularity} />}
        {value === 1 && <TableContainer data={filteredData} granularity={granularity} />}
      </div>
    </Box>
  );
}
