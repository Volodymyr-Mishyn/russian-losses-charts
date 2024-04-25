import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faTelegram, IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { IconButton, Snackbar } from "@mui/material";
import CopyIcon from "@mui/icons-material/ContentCopy";
import { SyntheticEvent, useContext, useState } from "react";
import { DataContext } from "../_store/data-store";
export interface SocialShareOption {
  name: string;
  icon: IconDefinition;
  link: string;
}

const SOCIAL_SHARE_OPTIONS: Record<string, SocialShareOption> = {
  twitter: {
    name: "Twitter",
    icon: faTwitter,
    link: "https://twitter.com/intent/tweet?url=",
  },
  telegram: {
    name: "Telegram",
    icon: faTelegram,
    link: "https://telegram.me/share/url?url=",
  },
};

export function Share(props: { url: string }) {
  const [open, setOpen] = useState(false);
  const { dictionary } = useContext(DataContext);
  const { toasts } = dictionary;
  const toastMessages = toasts as Record<string, string>;

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const encodedUrl = encodeURIComponent(props.url);
  const socialShareButtons = Object.keys(SOCIAL_SHARE_OPTIONS).map((key) => {
    const option = SOCIAL_SHARE_OPTIONS[key];
    return (
      <IconButton key={key} href={option.link + encodedUrl} target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={option.icon} />
      </IconButton>
    );
  });

  return (
    <div className="flex flex-row items-center justify-between gap-2">
      {socialShareButtons}
      <IconButton
        key={"copy"}
        onClick={() => {
          navigator.clipboard.writeText(props.url).then(() => {
            setOpen(true);
          });
        }}
      >
        <CopyIcon />
      </IconButton>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message={toastMessages.linkCopied} />
    </div>
  );
}
