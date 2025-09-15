import { useTranslation } from 'react-i18next';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export const TruckLoadPieChart = () => {
    const { t } = useTranslation(); // i18n hook

    const data = {
        labels: [t('dashboard.full'), t('dashboard.half'), t('dashboard.empty')],
        datasets: [{
            label: t('dashboard.truckLoad'),
            data: [60, 25, 15],
            backgroundColor: ['#10B981', '#FBBF24', '#EF4444'],
            hoverOffset: 4
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: t('dashboard.truckLoadChart') }
        }
    };

    return (
        <div className="bg-white rounded shadow-sm p-4 border border-gray-100 w-full dark:bg-darkBgTwo">
            <Doughnut className="mx-auto" data={data} options={options} />
        </div>
    );
};
