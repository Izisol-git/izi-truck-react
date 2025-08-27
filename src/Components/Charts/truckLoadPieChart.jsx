import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
    labels: ['Full', 'Half', 'Empty'],
    datasets: [{
        label: 'Truck Load (%)',
        data: [60, 25, 15],
        backgroundColor: ['#10B981', '#FBBF24', '#EF4444'],
        hoverOffset: 4
    }]
};

const options = {
    responsive: true,
    plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Truck Load (%)' }
    }
};

export const TruckLoadPieChart = () => (
    <div className="bg-white rounded shadow-sm p-4 border border-gray-100 w-full dark:bg-darkBgTwo ">
        <Doughnut className={'mx-auto'} data={data} options={options} />
    </div>
);
