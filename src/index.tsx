import React from 'react';
import ReactDOM from 'react-dom/client'; // Убедитесь, что вы используете React 18
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css'; // Убедитесь, что этот файл существует

// Создаем корневой элемент с помощью ReactDOM.createRoot
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement // Указываем тип HTMLElement
);

// Рендерим компонент App, обернутый в Router
root.render(
    <React.StrictMode>
        <Router>
            <App />
        </Router>
    </React.StrictMode>
);
