import { DynamicIcon } from "@/components/dynamic-icon/dynamic-icon";
import { IconButton } from "@mui/material";

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-blue-500 text-white">
      <h1 className="sm:text-2xl">Russian losses according to Ministry of Defense of Ukraine</h1>
      <nav>
        <div>
          <IconButton href="https://russian-losses.in.ua/en/statistics/ministry-of-defense" target="_blank">
            <DynamicIcon name="personnel" path="/images" size={24} />
          </IconButton>
        </div>
      </nav>
    </header>
  );
}
