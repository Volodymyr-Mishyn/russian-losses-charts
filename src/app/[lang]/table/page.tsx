import { fetchData } from "@/_core/data/fetch-data";
import { Paper } from "@mui/material";
import { DisplayTable } from "./components/display-table/display-table";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";

export default async function Table({ params: { lang } }: { params: { lang: Locale } }) {
  const data = await fetchData();
  const dictionary = await getDictionary(lang);
  return (
    <main className="flex min-h-screen flex-col justify-start items-stretch w-full h-full overflow-hidden">
      <Paper elevation={1} className="sm:p-8 p-2 flex-1 flex flex-col justify-start items-stretch sm:m-2">
        <div className="w-100 flex-1 flex flex-col justify-start items-stretch" style={{ minHeight: "60vh" }}>
          <DisplayTable data={data} dictionary={dictionary} />
        </div>
      </Paper>
    </main>
  );
}
