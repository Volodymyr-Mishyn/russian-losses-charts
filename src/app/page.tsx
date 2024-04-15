import { DisplayConfigurationSelection } from "./components/display-configuration-selection/display-configuration-selection";
import { DisplayData } from "./components/display-data/display-data";
import { Header } from "./components/header/header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-start items-stretch w-full h-full overflow-hidden">
      <Header />
      <div className="p-8 flex flex-col justify-start items-center">
        <DisplayConfigurationSelection />
      </div>
      <div className="p-8 flex-1 flex flex-col justify-start items-stretch w-100">
        <DisplayData />
      </div>
    </main>
  );
}
