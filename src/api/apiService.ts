// src/api/apiService.ts

import axios, { AxiosResponse } from 'axios';

// Определяем интерфейсы для типов данных, которые будут возвращаться из API
export interface Crypto {
    id: string;
    name: string;
    image: {
        large: string;
    };
    market_data: {
        current_price: {
            usd: number;
        };
        market_cap: {
            usd: number;
        };
    };
}

export interface CryptoChartData {
    prices: [number, number][]; // Массив цен (массив [timestamp, price])
}

// Базовый URL для запросов к CoinGecko API
const BASE_URL = 'https://api.coingecko.com/api/v3/coins';

// Функция для получения данных о криптовалюте по ID
export const fetchCryptoData = async (id: string): Promise<Crypto> => {
    try {
        const response: AxiosResponse<Crypto> = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching crypto data: ${error}`);
        throw new Error('Failed to fetch crypto data. Please try again later.');
    }
};

// Функция для получения данных о графике цен криптовалюты за последние 24 часа
export const fetchCryptoChartData = async (id: string): Promise<CryptoChartData> => {
    try {
        const response: AxiosResponse<CryptoChartData> = await axios.get(
            `${BASE_URL}/${id}/market_chart?vs_currency=usd&days=1`
        );
        return response.data;
    } catch (error) {
        console.error(`Error fetching crypto chart data: ${error}`);
        throw new Error('Failed to fetch crypto chart data. Please try again later.');
    }
};
