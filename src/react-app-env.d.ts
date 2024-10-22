/// <reference types="react-scripts" />

// Декларация для типов изображений
declare module "*.png" {
    const value: string;
    export default value;
}

declare module "*.jpg" {
    const value: string;
    export default value;
}

declare module "*.svg" {
    const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    export { ReactComponent };
    const src: string;
    export default src;
}

// Декларация для CSS-файлов
declare module "*.css" {
    const content: { [className: string]: string };
    export default content;
}

// Общие типы данных для криптовалют
interface CryptoData {
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

// Типы для данных графика
interface ChartData {
    labels: Date[];
    datasets: {
        label: string;
        data: number[];
        borderColor: string;
        fill: boolean;
    }[];
}
