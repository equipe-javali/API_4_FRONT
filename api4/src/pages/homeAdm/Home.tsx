import './Home.css';
import { Link } from 'react-router-dom';
import AlertView from '../../components/AlertView';

export default function Home() {
    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Bem vindo!</h1>
                <p>Monitore estações e sensores para uma gestão eficiente do clima.</p>
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

            {/* <section className="features-section">
                <h2>Funcionalidades Principais</h2>
                <ul className="features-list">
                    <li>📊 Visualização em tempo real de dados de temperatura e umidade.</li>
                    <li>📈 Gráficos e relatórios históricos de clima.</li>
                    <li>🔔 Alertas para condições climáticas extremas.</li>
                </ul>
            </section> */}

            <div className="button-container">
                <Link to="/lista/estacoes" className="button">Ver estações</Link>
                <Link to="/lista/parametros" className="button">Ver parâmetros</Link>
                <Link to="/lista/sensores" className="button">Ver sensores</Link>
            </div>

            <footer className="home-footer">
                <p>&copy; 2024 Sistema de Gerenciamento de Clima TECSUS. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}
