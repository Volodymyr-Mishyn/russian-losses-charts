import { DisplayConfigurationSelection } from "./components/display-configuration-selection/display-configuration-selection";
import { DisplayData } from "./components/display-data/display-data";
import Paper from "@mui/material/Paper";

import { Header } from "./components/header/header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-start items-stretch w-full h-full overflow-hidden">
      <Header />
      <Paper elevation={1} className="sm:p-8 p-2 flex flex-col justify-start items-center m-2">
        <DisplayConfigurationSelection />
      </Paper>
      <Paper elevation={1} className="sm:p-8 p-2 flex-1 flex flex-col justify-start items-stretch m-2">
        <div className="w-100" style={{ minHeight: "60vh", maxHeight: "90vh" }}>
          <DisplayData />
        </div>
      </Paper>
    </main>
  );
}
