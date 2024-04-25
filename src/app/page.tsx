import { DisplayConfigurationSelection } from "./components/display-configuration-selection/display-configuration-selection";
import Paper from "@mui/material/Paper";

import { Header } from "./components/header/header";
import { DataContainer } from "./components/data-container/data-container";
import { Footer } from "./components/footer/footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-start items-stretch w-full h-full overflow-hidden">
      <Header />
      <Paper elevation={1} className="sm:p-8 p-2 flex flex-col justify-start items-center sm:m-2">
        <DisplayConfigurationSelection />
      </Paper>
      <Paper elevation={1} className="sm:p-8 p-2 flex-1 flex flex-col justify-start items-stretch sm:m-2">
        <div className="w-100 flex-1 flex flex-col justify-start items-stretch" style={{ minHeight: "85vh" }}>
          <DataContainer />
        </div>
      </Paper>
      <Footer />
    </main>
  );
}
