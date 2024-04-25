import { useContext, useMemo } from "react";
import { calculateAverageTableData, processLossDataToTableData } from "../_helpers/process-loss-data-to-table-data";
import { DatesTable } from "../dates-table/dates-table";
import { AverageTable } from "../average-table/average-table";
import { Share } from "../../share/share";
import { HomeButton } from "../../home-button/home-button";
import { DataContext } from "../../_store/data-store";

export function TableContainer({ functionality }: { functionality: boolean }) {
  const context = useContext(DataContext);
  const { data, dictionary, granularity } = context;
  const tableData = useMemo(() => processLossDataToTableData(data, granularity), [data, granularity]);
  const averageTableData = useMemo(() => calculateAverageTableData(tableData, granularity), [tableData, granularity]);
  const averageTableTitle = `Average losses by ${granularity}`;
  const tableDataTitle = `Losses by ${granularity}`;
  const toHomeContainer = !functionality ? <HomeButton /> : null;

  const shareContainer = functionality ? (
    <div className="flex p-2">
      <Share url="table"></Share>
    </div>
  ) : null;
  return (
    <div className="flex flex-col justify-start items-stretch gap-6">
      <div>{toHomeContainer}</div>
      <AverageTable data={averageTableData} granularity={granularity} title={averageTableTitle} />
      <DatesTable data={tableData} granularity={granularity} title={tableDataTitle} />
      {shareContainer}
    </div>
  );
}
