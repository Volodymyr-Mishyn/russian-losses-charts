import { Home } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";

export function HomeButton() {
  const [baseUrl, setBaseUrl] = useState("");
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const currentUrl = window.location.origin;
    const locale = window.location.pathname.split("/")[1];
    setBaseUrl(`${currentUrl}/${locale}?${query.toString()}`);
  }, []);
  return (
    <div className="flex flex-row items-center justify-start p-1 gap-4">
      <IconButton href={baseUrl} color="primary">
        <Home />
      </IconButton>
    </div>
  );
}
