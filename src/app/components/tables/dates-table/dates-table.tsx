import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { TableData } from "../_models/table-data";
import { Granularity } from "@/_core/models/data-granularity";

const granularityToSizeDictionary: Record<Granularity, number> = {
  day: 10,
  week: 10,
  month: 10,
  year: 5,
};

export function DatesTable(data: { data: TableData; granularity: Granularity; title: string }) {
  const { title } = data;
  const { columns, rows } = data.data;
  const pageSize = granularityToSizeDictionary[data.granularity];
  return (
    <>
      <h2 className="text-lg font-bold text-center">{title}</h2>
      <Box sx={{ width: "100%" }}>
        <DataGrid
          getRowId={(row) => row.dateField}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: pageSize,
              },
            },
          }}
          pageSizeOptions={[5, 7, 10, 20, 30]}
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
}
