import { Granularity } from "@/_core/models/data-granularity";
import { EntityNamesEnum, RussianLossesPartialData } from "@/_core/models/loss-entities";
import { TableColumn, TableData, TableRow } from "../_models/table-data";
import { getDateByGranularity } from "../../_helpers/get-date-by-granularity";

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
    columns.push({ field: entity, flex: 1, headerName: entity });
  });

  const aggregation: Record<string, number[]> = {};
  data.forEach((dayResult) => {
    const key = getDateByGranularity(new Date(dayResult.date), granularity);
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
  Object.entries(aggregation).forEach((value) => {
    const row: TableRow = { dateField: value[0] };
    value[1].forEach((entityValue, index) => {
      row[presentEntitiesKeys[index]] = entityValue;
    });
    rows.push(row);
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
