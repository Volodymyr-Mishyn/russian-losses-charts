import type { Metadata, ResolvingMetadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";
import { GoogleAnalytics } from "@/components/google-analutics/google-analytics";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  params: { lang: Locale };
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const lang = params.lang;
  const dictionary = await getDictionary(lang);
  const metaData = dictionary.metaData as Record<string, string>;

  return {
    title: metaData.title,
    description: metaData.description,
  };
}

export default function Layout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  return (
    <html lang={lang}>
      <GoogleAnalytics />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
