import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { ProcessedChartData } from "../_models/line-chart-data";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const basicOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: '',
        },
    },
};

export function LineChart({ data, title }: { data: ProcessedChartData, title: string }) {
    const options = { ...basicOptions, plugins: { ...basicOptions.plugins, title: { ...basicOptions.plugins.title, text: title } } };
    return <Line options={options} data={data} />;
}