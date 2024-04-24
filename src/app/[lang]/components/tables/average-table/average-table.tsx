import { Granularity } from "@/_core/models/data-granularity";
import { TableData } from "../_models/table-data";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export function AverageTable(data: { data: TableData; granularity: Granularity; title: string }) {
  const { title } = data;
  const { columns, rows } = data.data;
  return (
    <>
      <h2 className="text-lg font-bold text-center">{title}</h2>
      <Box sx={{ width: "100%" }}>
        <DataGrid
          getRowId={(row) => row.averageField}
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          hideFooterPagination
          hideFooter
        />
      </Box>
    </>
  );
}
