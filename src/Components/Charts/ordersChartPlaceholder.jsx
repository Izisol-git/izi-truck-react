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

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const data = {
    labels: ['Dush', 'Sesh', 'Chor', 'Pays', 'Juma', 'Shan', 'Yak'],
    datasets: [
        {
            label: 'Buyurtmalar',
            data: [120, 190, 300, 500, 200, 300, 400],
            fill: false,
            borderColor: '#7C3AED',
            tension: 0.3,
        },
    ],
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'top',
        },
    },
};

const OrdersChartPlaceholder = () => (
    <div className="bg-white rounded shadow-sm p-4 border border-gray-100 w-full">

        <Line className={'w-full'} data={data} options={options} />
    </div>
);

export default OrdersChartPlaceholder;
