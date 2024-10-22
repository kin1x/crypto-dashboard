import React, { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import 'chartjs-adapter-date-fns';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
    ChartOptions,
} from 'chart.js';
import '../App.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
);

interface CryptoData {
    name: string;
    image: { large: string };
    market_data: {
        current_price: { usd: number };
        market_cap: { usd: number };
    };
}

interface ChartData {
    labels: Date[];
    datasets: {
        label: string;
        data: number[];
        borderColor: string;
        fill: boolean;
    }[];
}

const CryptoDetail: FC = () => {
    const { id } = useParams<{ id: string }>();
    const [crypto, setCrypto] = useState<CryptoData | null>(null);
    const [chartData, setChartData] = useState<ChartData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Функция для получения данных
    const fetchData = async () => {
        setLoading(true);
        setCrypto(null);  // Сбрасываем данные криптовалюты
        setChartData(null); // Сбрасываем данные графика
        try {
            const [response, chartResponse] = await axios.all([
                axios.get<CryptoData>(`https://api.coingecko.com/api/v3/coins/${id}`),
                axios.get<any>(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1`),
            ]);

            if (response.status === 200 && chartResponse.status === 200) {
                setCrypto(response.data);
                setChartData({
                    labels: chartResponse.data.prices.map((price: [number, number]) => new Date(price[0])),
                    datasets: [
                        {
                            label: `${response.data.name} Price (Last 24 Hours)`,
                            data: chartResponse.data.prices.map((price: [number, number]) => price[1]),
                            borderColor: 'rgba(75, 192, 192, 1)',
                            fill: false,
                        },
                    ],
                });
                setError(null);
            } else {
                setError("Не удалось получить данные о криптовалюте.");
            }
        } catch (error) {
            console.error("API Error: ", error);
            setError("Не удалось получить данные. Пожалуйста, попробуйте снова позже.");
        } finally {
            setLoading(false);
        }
    };

    // Эффект для получения данных при каждом изменении id
    useEffect(() => {
        fetchData();
    }, [id]);

    // Настройки графика
    const options: ChartOptions<'line'> = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'hour',
                    tooltipFormat: 'MM/dd/yyyy HH:mm',
                },
                title: {
                    display: true,
                    text: 'Time',
                },
            },
            y: {
                beginAtZero: false,
                title: {
                    display: true,
                    text: 'Price (USD)',
                },
            },
        },
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
    };


    return (
        <div className="crypto-detail">
            {loading && <div className="loading-message">Loading...</div>}
            {error && <div className="error-message">{error}</div>}
            {crypto && (
                <div>
                    <h2>{crypto.name} Details</h2>
                    <img src={crypto.image.large} alt={crypto.name} className="crypto-logo" />
                    <p>Current Price: ${crypto.market_data.current_price.usd}</p>
                    <p>Market Cap: ${crypto.market_data.market_cap.usd.toLocaleString()}</p>
                </div>
            )}
            {chartData && <Line data={chartData} options={options} />}
        </div>
    );
};

export default CryptoDetail;
