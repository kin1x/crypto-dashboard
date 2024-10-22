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

    useEffect(() => {
        const fetchCryptos = async () => {
            try {
                const response = await axios.get(
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
                setError('Failed to fetch cryptocurrencies. Please try again later.');
            }
        };

        fetchCryptos();
    }, []);

    return (
        <div className="crypto-list">
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
