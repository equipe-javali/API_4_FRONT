import React from 'react';
import './home.css';
import { Link } from 'react-router-dom';
import AlertView from '../../components/AlertView';

export default function HomePub() {

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Gerenciamento de Clima</h1>
                <p>Monitoramento de estações e sensores para uma gestão eficiente do clima.</p>
            </header>

            <section className="statistics-section">
                <div className="statistic-card">
                    <h2>Estações Monitoradas</h2>
                    <p>5 Estações ativas</p>
                </div>
                <div className="statistic-card">
                    <h2>Sensores Instalados</h2>
                    <p>20 Sensores em operação</p>
                </div>
                <div className="statistic-card">
                    <h2>Temperatura Atual</h2>
                    <p>22°C</p>
                </div>
            </section>

            <AlertView />

            <section className="features-section">
                <h2>Funcionalidades Principais</h2>
                <ul className="features-list">
                    <li>📊 Visualização em tempo real de dados de temperatura e umidade.</li>
                    <li>📈 Gráficos e relatórios históricos de clima.</li>
                    <li>🔔 Alertas para condições climáticas extremas.</li>
                </ul>
            </section>

            <footer className="home-footer">
                <p>&copy; 2024 Sistema de Gerenciamento de Clima TECSUS. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}
