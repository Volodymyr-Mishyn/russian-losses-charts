import { DisplayConfigurationSelection } from "./components/display-configuration-selection/display-configuration-selection";
import Paper from "@mui/material/Paper";

import { Header } from "./components/header/header";
import { DataContainer } from "./components/data-container/data-container";
import { Footer } from "./components/footer/footer";
import { DictionaryElement, Locale } from "../../i18n-config";
import { getDictionary } from "@/get-dictionary";
import { DisplayConfigurationSelectionContextProvider } from "./components/display-configuration-selection/display-configuration-selection-context-provider";

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  const footerDictionary = dictionary.footer as DictionaryElement;
  return (
    <main className="flex min-h-screen flex-col justify-start items-stretch w-full h-full overflow-hidden">
      <Header dictionary={dictionary} language={lang} />
      <Paper elevation={1} className="sm:p-8 p-2 flex flex-col justify-start items-center sm:m-2">
        <DisplayConfigurationSelectionContextProvider dictionary={dictionary} lang={lang}>
          <DisplayConfigurationSelection />
        </DisplayConfigurationSelectionContextProvider>
      </Paper>
      <Paper elevation={1} className="sm:p-8 p-2 flex-1 flex flex-col justify-start items-stretch sm:m-2">
        <div className="w-100 flex-1 flex flex-col justify-start items-stretch" style={{ minHeight: "85vh" }}>
          <DataContainer dictionary={dictionary} />
        </div>
      </Paper>
      <Footer dictionary={footerDictionary} />
    </main>
  );
}
