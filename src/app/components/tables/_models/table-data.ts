export interface TableColumn {
  field: string;
  headerName: string;
  flex: number;
  renderHeader?: (column: any) => JSX.Element;
}

export interface TableRow {
  [key: string]: any;
}

export interface TableData {
  columns: Array<TableColumn>;
  rows: Array<TableRow>;
}
