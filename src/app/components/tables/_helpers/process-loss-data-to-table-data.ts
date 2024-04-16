import { Granularity } from "@/_core/models/data-granularity";
import { EntityNamesEnum, RussianLossesPartialData } from "@/_core/models/loss-entities";
import { TableColumn, TableData, TableRow } from "../_models/table-data";
import { getDateByGranularity } from "../../_helpers/get-date-by-granularity";

const dateDictionary: Record<Granularity, string> = {
  day: "Date",
  week: "Week diapason",
  month: "Month",
  year: "Year",
};

export function processLossDataToTableData(data: RussianLossesPartialData, granularity: Granularity): TableData {
  if (!data.length) {
    return {
      rows: [],
      columns: [],
    };
  }
  const leadingColumn = { field: "dateField", headerName: dateDictionary[granularity] };
  const columns: Array<TableColumn> = [];
  const presentEntitiesKeys = Object.keys(data[0].data) as Array<EntityNamesEnum>;
  presentEntitiesKeys.forEach((entity) => {
    columns.push({ field: entity, headerName: entity });
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
  Object.entries(aggregation).forEach((value, key) => {
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
