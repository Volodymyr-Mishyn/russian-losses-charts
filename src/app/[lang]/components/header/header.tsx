import { DynamicIcon } from "@/components/dynamic-icon/dynamic-icon";
import { IconButton, Tooltip } from "@mui/material";
import { LanguageSelection } from "../language-selection/language-selection";
import { DictionaryElement, Locale } from "@/i18n-config";

export function Header({ dictionary, language }: { dictionary: DictionaryElement; language: Locale }) {
  const { title, fullVersion } = dictionary;
  return (
    <header className="flex items-center justify-between p-4 bg-blue-500 text-white">
      <h1 className="sm:text-2xl">{title as string}</h1>
      <nav className="flex flex-row flex-none gap-1">
        <LanguageSelection language={language} />
        <Tooltip title={fullVersion as string} placement="bottom">
          <IconButton href="https://russian-losses.in.ua/en/statistics/ministry-of-defense" target="_blank">
            <DynamicIcon name="personnel" path="/images" size={24} />
          </IconButton>
        </Tooltip>
      </nav>
    </header>
  );
}
