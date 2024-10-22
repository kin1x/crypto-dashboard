import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';

interface Crypto {
    id: string;
    name: string;
    symbol: string;
    current_price: number;
    image: string;
}

const CryptoList: FC = () => {
    const [cryptos, setCryptos] = useState<Crypto[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true); // Добавлено состояние загрузки

    useEffect(() => {
        const fetchCryptos = async () => {
            setLoading(true); // Начинаем загрузку
            setError(null); // Сбрасываем ошибку перед новым запросом
            try {
                const response = await axios.get<Crypto[]>(
                    'https://api.coingecko.com/api/v3/coins/markets',
                    {
                        params: {
                            vs_currency: 'usd',
                            order: 'market_cap_desc',
                            per_page: 200,
                            page: 1,
                            sparkline: false,
                        },
                    }
                );
                setCryptos(response.data);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    // Обработка ошибок Axios
                    if (error.response) {
                        setError(`Ошибка: ${error.response.status} - ${error.response.statusText}`);
                    } else if (error.request) {
                        setError('Network error. Please check your internet connection.');
                        console.error("Request details:", error.request); // Логируем детали запроса
                    } else {
                        setError('Error occurred while processing the request.');
                        console.error("Error message:", error.message); // Логируем сообщение об ошибке
                    }
                } else {
                    setError('An unknown error occurred. Please try again later.');
                }
            } finally {
                setLoading(false); // Заканчиваем загрузку
            }
        };

        fetchCryptos();
    }, []);

    return (
        <div className="crypto-list">
            {loading && <div className="loading-message">Loading cryptocurrencies...</div>}
            {error && <div className="error-message">{error}</div>}
            {cryptos.map((crypto) => (
                <div key={crypto.id} className="crypto-item">
                    <img src={crypto.image} alt={crypto.name} className="crypto-logo" />
                    <h3>{crypto.name} ({crypto.symbol.toUpperCase()})</h3>
                    <p>${crypto.current_price}</p>
                    <Link to={`/crypto/${crypto.id}`}>View Details</Link>
                </div>
            ))}
        </div>
    );
};

export default CryptoList;
