import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from 'chart.js';
import {useTranslation} from "react-i18next";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);



const options = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'top',
        },
    },
};

const OrdersChartPlaceholder = ({statistics}) => {
    const {t} = useTranslation();
    const data = {
        labels: statistics?.dates,
        datasets: [
            {
                label: t('navbar.orders'),
                data: statistics?.order_counts,
                fill: false,
                borderColor: '#7C3AED',
                tension: 0.3,
            },
        ],
    };

    return (
        <div className="bg-white rounded shadow-sm p-4 border border-gray-100 w-full dark:bg-darkBgTwo">
            <Line   className={'w-full'} data={data} options={options} />
        </div>
    );
}

export default OrdersChartPlaceholder;
