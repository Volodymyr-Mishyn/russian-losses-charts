import { useMemo, useState } from "react";
import { Granularity } from "../../../../_core/models/data-granularity";
import { RussianLossesPartialData } from "../../../../_core/models/loss-entities";
import { processLossDataToChartData } from "../_helpers/process-loss-data-to-chart-data";
import { LineChart } from "../line-chart/line-chart";
import { format } from "date-fns";
import Button from "@mui/material/Button";
import Fullscreen from "@mui/icons-material/Fullscreen";
import CloseIcon from "@mui/icons-material/Close";
import { AppBar, Dialog, IconButton, Paper, Toolbar, Typography } from "@mui/material";

export function ChartContainer({ data, granularity }: { data: RussianLossesPartialData; granularity: Granularity }) {
  const [open, setOpen] = useState(false);
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
  const chart = <LineChart data={chartData} title={title} />;
  return (
    <>
      <div className=" flex-1 flex flex-col justify-start items-stretch h-full">
        <div className="flex-1">{chart}</div>
        <div className="flex flex-row items-center justify-start p-1">
          <Button onClick={handleClickOpen} color="primary" startIcon={<Fullscreen />}>
            Fullscreen
          </Button>
        </div>
      </div>
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
            {chart}{" "}
          </Paper>
        </div>
      </Dialog>
    </>
  );
}
