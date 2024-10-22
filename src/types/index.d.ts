// Интерфейсы для данных криптовалюты, возвращаемых из API
export interface Crypto {
    id: string;
    name: string;
    symbol: string;
    image: {
        thumb: string;
        small: string;
        large: string;
    };
    market_data: {
        current_price: {
            usd: number;
            [key: string]: number; // Поддержка цен в других валютах
        };
        market_cap: {
            usd: number;
            [key: string]: number; // Поддержка рыночной капитализации в других валютах
        };
        total_volume: {
            usd: number;
            [key: string]: number; // Поддержка объемов торгов в других валютах
        };
    };
}

// Интерфейс для данных графика цен
export interface CryptoChartData {
    prices: [number, number][]; // Массив [timestamp, price]
    market_caps: [number, number][];
    total_volumes: [number, number][];
}

// Интерфейсы для состояний компонентов и их пропсов
export interface CryptoState {
    crypto: Crypto | null;
    chartData: CryptoChartData | null;
    loading: boolean;
    error: string | null;
}

// Интерфейсы для данных, которые используются в компонентах
export interface CryptoListItem {
    id: string;
    name: string;
    symbol: string;
    currentPrice: number;
    marketCap: number;
    image: string;
}

// Интерфейсы для параметров маршрутов React Router
export interface CryptoDetailParams {
    id: string;
}
