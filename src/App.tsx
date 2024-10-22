import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import CryptoDetail from './components/CryptoDetail';
import Header from './components/Header';

const App: React.FC = () => (
    <div>
        <Header />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/crypto/:id" element={<CryptoDetail />} />
        </Routes>
    </div>
);

export default App;
