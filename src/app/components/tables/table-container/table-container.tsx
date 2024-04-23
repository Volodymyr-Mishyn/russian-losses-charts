import { Granularity } from "@/_core/models/data-granularity";
import { RussianLossesPartialData } from "@/_core/models/loss-entities";
import { useMemo } from "react";
import { calculateAverageTableData, processLossDataToTableData } from "../_helpers/process-loss-data-to-table-data";
import { DatesTable } from "../dates-table/dates-table";
import { AverageTable } from "../average-table/average-table";
import { Share } from "../../share/share";

export function TableContainer({
  data,
  granularity,
  functionality,
}: {
  data: RussianLossesPartialData;
  granularity: Granularity;
  functionality: boolean;
}) {
  const tableData = useMemo(() => processLossDataToTableData(data, granularity), [data, granularity]);
  const averageTableData = useMemo(() => calculateAverageTableData(tableData, granularity), [tableData, granularity]);
  const shareContainer = functionality ? (
    <div className="flex p-2">
      <Share url="table"></Share>
    </div>
  ) : null;
  return (
    <div className="flex flex-col justify-start items-stretch gap-6">
      <AverageTable data={averageTableData} granularity={granularity} />
      <DatesTable data={tableData} granularity={granularity} />
      {shareContainer}
    </div>
  );
}
