export interface TableColumn {
  field: string;
  headerName: string;
  flex: number;
}

export interface TableRow {
  [key: string]: any;
}

export interface TableData {
  columns: Array<TableColumn>;
  rows: Array<TableRow>;
}
