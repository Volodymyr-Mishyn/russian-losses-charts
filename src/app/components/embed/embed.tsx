import IconButton from "@mui/material/IconButton";
import { SyntheticEvent, useState } from "react";
import CopyIcon from "@mui/icons-material/ContentCopy";
import Snackbar from "@mui/material/Snackbar";

export function Embed(props: { url: string; className?: string }) {
  const [open, setOpen] = useState(false);

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const { url, className } = props;
  const copyIframeCode = () => {
    const iframeCode = `<iframe src="${url}" width="100%" height="500px" frameborder="0"></iframe>`;
    navigator.clipboard.writeText(iframeCode).then(() => setOpen(true));
  };
  const iframeCode = `<iframe 
    src="${url}" 
    width="100%" 
    height="500px" 
    frameborder="0">
</iframe>`;
  return (
    <div className={className + " flex flex-col gap-2 overflow-hidden  "}>
      <h2 className="text-lg font-semibold">Embed as an iframe</h2>
      <div className="overflow-hidden relative">
        <div className="border-emerald-950 border rounded p-4 overflow-x-auto">
          <pre className="text-xs">{iframeCode}</pre>
          <IconButton onClick={copyIframeCode} style={{ position: "absolute", top: "5px", right: "5px" }}>
            <CopyIcon />
          </IconButton>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message="Iframe code copied" />
    </div>
  );
}
