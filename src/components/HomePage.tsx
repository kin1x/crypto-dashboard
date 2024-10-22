import React, { FC } from 'react';
import CryptoList from './CryptoList';
import '../App.css'; // Убедитесь, что стили подключены

const HomePage: FC = () => (
    <div className="home-page">
        <CryptoList />
    </div>
);

export default HomePage;
