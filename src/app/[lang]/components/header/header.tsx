import { DynamicIcon } from "@/components/dynamic-icon/dynamic-icon";
import { IconButton, Tooltip } from "@mui/material";

export function Header({ title, fullVersion }: { title: string; fullVersion: string }) {
  return (
    <header className="flex items-center justify-between p-4 bg-blue-500 text-white">
      <h1 className="sm:text-2xl">{title}</h1>
      <nav>
        <Tooltip title={fullVersion} placement="bottom">
          <IconButton href="https://russian-losses.in.ua/en/statistics/ministry-of-defense" target="_blank">
            <DynamicIcon name="personnel" path="/images" size={24} />
          </IconButton>
        </Tooltip>
      </nav>
    </header>
  );
}
