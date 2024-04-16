import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { TableData } from "../_models/table-data";
import { Granularity } from "@/_core/models/data-granularity";

export function Table(data: { data: TableData; granularity: Granularity }) {
  const { columns, rows } = data.data;
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        getRowId={(row) => row.dateField}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
