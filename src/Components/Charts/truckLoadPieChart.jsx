import {Bar, Line} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {useTranslation} from "react-i18next";

// Chart.js modullarini ro'yxatdan o'tkazish
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function TruckLoadPieChart({statistics}) {
    const {t } = useTranslation();

    const data = {
        labels: statistics?.dates,
        datasets: [
            {
                label: t('dashboard.queries'),
                data: statistics?.queries,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderRadius: 8,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
            },
        },
    };

    return (
        <div className="bg-white rounded shadow-sm p-4 border border-gray-100 w-full dark:bg-darkBgTwo">

            < Bar
                data={data}
                options={options}
            />;
        </div>
    )
}
