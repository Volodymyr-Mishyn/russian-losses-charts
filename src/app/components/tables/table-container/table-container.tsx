import { Granularity } from "@/_core/models/data-granularity";
import { RussianLossesPartialData } from "@/_core/models/loss-entities";
import { useMemo } from "react";
import { processLossDataToTableData } from "../_helpers/process-loss-data-to-table-data";
import { Table } from "../table/table";

export function TableContainer({ data, granularity }: { data: RussianLossesPartialData; granularity: Granularity }) {
  const tableData = useMemo(() => processLossDataToTableData(data, granularity), [data, granularity]);
  console.log(tableData);
  return <Table data={tableData} granularity={granularity} />;
}
