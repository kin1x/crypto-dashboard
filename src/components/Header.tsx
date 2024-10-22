import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Подключение CSS для стилей

const Header: FC = () => (
    <div className="header">
        <h1 className="header-title">Crypto Dashboard</h1>
        <ul className="header-links">
            
            {/* Если в будущем добавите больше страниц, можете добавить их сюда */}
        </ul>
    </div>
);

export default Header;
