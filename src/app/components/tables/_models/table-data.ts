export interface TableColumn {
  field: string;
  headerName: string;
}

export interface TableRow {
  dateField: string;
  [key: string]: any;
}

export interface TableData {
  columns: Array<TableColumn>;
  rows: Array<TableRow>;
}
