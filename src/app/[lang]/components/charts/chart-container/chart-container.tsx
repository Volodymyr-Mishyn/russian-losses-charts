import { use, useEffect, useMemo, useState } from "react";
import { Granularity } from "../../../../../_core/models/data-granularity";
import { RussianLossesPartialData } from "../../../../../_core/models/loss-entities";
import { processLossDataToChartData } from "../_helpers/process-loss-data-to-chart-data";
import { LineChart } from "../line-chart/line-chart";
import { format } from "date-fns";
import Button from "@mui/material/Button";
import Fullscreen from "@mui/icons-material/Fullscreen";
import CloseIcon from "@mui/icons-material/Close";
import { AppBar, Dialog, IconButton, Paper, Toolbar } from "@mui/material";
import { Share } from "../../share/share";
import { Embed } from "../../embed/embed";
import { HomeButton } from "../../home-button/home-button";

function createTitle(data: RussianLossesPartialData, granularity: Granularity): string {
  let title = `Losses of `;
  if (data.length > 0) {
    title += Object.keys(data[0].data).join(", ");
    title +=
      " in range of dates " +
      format(data[0].date, "yyyy-MM-dd") +
      " to " +
      format(data[data.length - 1].date, "yyyy-MM-dd");
  }
  title += ` by ${granularity}`;
  return title;
}

export function ChartContainer({
  data,
  granularity,
  functionality,
}: {
  data: RussianLossesPartialData;
  granularity: Granularity;
  functionality: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [chartUrl, setChartUrl] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const chartData = useMemo(
    () =>
      processLossDataToChartData(data, { fill: true, hasBackgroundColour: true, hasBorderColour: true }, granularity),
    [data, granularity]
  );
  const title = createTitle(data, granularity);

  const chart = <LineChart data={chartData} title={title} />;

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const currentUrl = window.location.origin;
    setChartUrl(`${currentUrl}/chart?${query.toString()}`);
  }, []);

  const toHomeContainer = !functionality ? <HomeButton /> : null;

  const buttonsContainer = functionality ? (
    <div className="flex flex-row items-center justify-start p-1 gap-4">
      <Button onClick={handleClickOpen} color="primary" startIcon={<Fullscreen />}>
        Fullscreen
      </Button>
      {chartUrl && <Share url={chartUrl}></Share>}
    </div>
  ) : null;

  const embedContainer = functionality && chartUrl ? <Embed url={chartUrl} className="flex-1"></Embed> : null;

  const dialogContainer = functionality ? (
    <Dialog fullScreen open={open} onClose={handleClose} className="flex flex-col justify-start items-stretch">
      <AppBar className="flex flex-none" position={"relative"}>
        <Toolbar className="flex flex-row justify-end">
          <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className="flex-1 flex flex-col justify-stretch items-stretch p-2">
        <Paper elevation={1} className="flex-1 p-2">
          {chart}
        </Paper>
      </div>
    </Dialog>
  ) : null;

  return (
    <>
      <div className=" flex-1 flex flex-col justify-start items-stretch h-full gap-2">
        {toHomeContainer}
        <div className="flex-1">{chart}</div>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-none">{buttonsContainer}</div>
          {embedContainer}
        </div>
      </div>
      {dialogContainer}
    </>
  );
}
