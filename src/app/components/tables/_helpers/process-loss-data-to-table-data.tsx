import { Granularity } from "@/_core/models/data-granularity";
import { EntityNamesEnum, RussianLossesPartialData } from "@/_core/models/loss-entities";
import { TableColumn, TableData, TableRow } from "../_models/table-data";
import { getDateByGranularity } from "../../_helpers/get-date-by-granularity";
import { DynamicIcon } from "@/components/dynamic-icon/dynamic-icon";

const columnDateFormatDictionary: Record<Granularity, string> = {
  day: "Date",
  week: "Week diapason",
  month: "Month",
  year: "Year",
};

const averageDateFormatDictionary: Record<Granularity, string> = {
  day: " per day",
  week: " per week",
  month: " per month",
  year: " per year",
};

export function processLossDataToTableData(data: RussianLossesPartialData, granularity: Granularity): TableData {
  if (!data.length) {
    return {
      rows: [],
      columns: [],
    };
  }
  const leadingColumn = { field: "dateField", headerName: columnDateFormatDictionary[granularity], flex: 1 };
  const columns: Array<TableColumn> = [];
  const presentEntitiesKeys = Object.keys(data[0].data) as Array<EntityNamesEnum>;
  presentEntitiesKeys.forEach((entity) => {
    const headerTemplate = (
      <div className="flex flex-row gap-1">
        <DynamicIcon name={entity} path="/images" size={24} />
        <div className="hidden md:block">{entity}</div>
      </div>
    );
    columns.push({ field: entity, flex: 1, headerName: entity, renderHeader: () => headerTemplate });
  });

  const aggregation: Record<string, number[]> = {};
  const dateToKeyMap = new Map<string, Date>();
  data.forEach((dayResult) => {
    const originalDate = new Date(dayResult.date);
    const key = getDateByGranularity(originalDate, granularity);
    if (!dateToKeyMap.has(key)) {
      dateToKeyMap.set(key, originalDate);
    }
    presentEntitiesKeys.forEach((entity) => {
      const increment = dayResult.data[entity]?.increment || 0;
      if (!aggregation[key]) {
        aggregation[key] = new Array(presentEntitiesKeys.length).fill(0);
      }
      const index = presentEntitiesKeys.indexOf(entity);
      aggregation[key][index] += increment;
    });
  });

  const rows: Array<TableRow> = [];
  Object.entries(aggregation).forEach(([key, value]) => {
    const row: TableRow = { dateField: key };
    value.forEach((entityValue, index) => {
      row[presentEntitiesKeys[index]] = entityValue;
    });
    rows.push(row);
  });
  rows.sort((a, b) => {
    const dateA = dateToKeyMap.get(a.dateField);
    const dateB = dateToKeyMap.get(b.dateField);
    if (dateA && dateB) {
      return dateB.getTime() - dateA.getTime();
    }
    return 0;
  });
  return {
    columns: [leadingColumn, ...columns],
    rows,
  };
}

export function calculateAverageTableData(tableData: TableData, granularity: Granularity): TableData {
  const { columns, rows } = tableData;
  const dataColumns = columns.filter((column) => column.field !== "dateField");
  const averageRow: TableRow = { averageField: "Average" };
  dataColumns.forEach((column) => {
    if (column.field !== "dateField") {
      const sum = rows.reduce((acc, row) => acc + row[column.field], 0);
      const average = Number((sum / rows.length).toFixed(2));
      averageRow[column.field] = `${average} ${averageDateFormatDictionary[granularity]}`;
    }
  });
  return {
    columns: dataColumns,
    rows: [averageRow],
  };
}
