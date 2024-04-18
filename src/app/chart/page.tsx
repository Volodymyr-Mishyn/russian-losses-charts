import { fetchData } from "@/_core/data/fetch-data";
import { Paper } from "@mui/material";
import { DisplayChart } from "./components/display-chart/display-chart";

export default async function Chart() {
  const data = await fetchData();
  return (
    <main className="flex min-h-screen flex-col justify-start items-stretch w-full h-full overflow-hidden">
      <Paper elevation={1} className="sm:p-8 p-2 flex-1 flex flex-col justify-start items-stretch sm:m-2">
        <div className="w-100 flex-1 flex flex-col justify-start items-stretch" style={{ minHeight: "60vh" }}>
          <DisplayChart data={data} />
        </div>
      </Paper>
    </main>
  );
}
