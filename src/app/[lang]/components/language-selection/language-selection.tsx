"use client";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";

import ListItemIcon from "@mui/material/ListItemIcon";
import { IconButton, Menu } from "@mui/material";
import { useState } from "react";
import { LANGUAGES } from "@/_core/constants/languages";
import { Language } from "@mui/icons-material";
import { Locale } from "@/i18n-config";
import { LanguageInfo } from "@/_core/models/language";
import { useRouter, useSearchParams } from "next/navigation";

export function LanguageSelection({ language }: { language: Locale }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickItem = (lang: LanguageInfo) => {
    router.push("/" + lang.baseHref + "?" + searchParams, { scroll: false });
    setAnchorEl(null);
  };

  const languageMenuItems = LANGUAGES.map((lang) => (
    <MenuItem key={lang.baseHref} onClick={() => handleClickItem(lang)} selected={lang.baseHref === language}>
      <ListItemIcon>
        <div className="h-12 w-16 flex flex-row items-center justify-center">
          <Image src={lang.icon} alt={lang.name} width="0" height="0" sizes="100vw" className="w-full h-auto" />
        </div>
      </ListItemIcon>
    </MenuItem>
  ));

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Language />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {languageMenuItems}
      </Menu>
    </div>
  );
}
