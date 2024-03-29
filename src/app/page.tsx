import { DisplayConfigurationSelection } from "./components/display-configuration-selection/display-configuration-selection";
import { Header } from "./components/header/header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-start items-stretch">
      <Header />
      <div className="p-8 flex flex-col justify-start items-center">
        <DisplayConfigurationSelection />
      </div>
    </main>
  );
}
