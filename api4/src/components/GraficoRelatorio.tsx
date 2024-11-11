import React from "react";
import { Line, Bar } from 'react-chartjs-2';

interface GraficoRelatorioProps {
  tipoRelatorio: string;
  dadosGrafico: any[][]; // Array de dados para cada gráfico
  titulo: string;
}

const GraficoRelatorio: React.FC<GraficoRelatorioProps> = ({ tipoRelatorio, dadosGrafico, titulo }) => {
  // Verifica se dadosGrafico está definido e tem dados
  if (dadosGrafico && dadosGrafico.length > 0) {
    const chartOptions = {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    // Adaptar a estrutura dos dados para o Chart.js
    const chartData = {
      labels: dadosGrafico.map(([x, _]) => x), 
      datasets: [{
        label: titulo,
        data: dadosGrafico.map(([_, y]) => y), // Extrair os valores y
        backgroundColor: 'rgba(54, 162, 235, 0.2)', // Cor de fundo das barras
        borderColor: 'rgba(54, 162, 235, 1)', // Cor da borda das barras
        borderWidth: 1
      }]
    };

    switch (tipoRelatorio) {
      case 'alerta':
      case 'chuvaLocal':
        return (
          <div className="card">
            <h2 className="card-title">{titulo}</h2>
            <div className="chart-container">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        );
      case 'temperatura':
      case 'chuvaPeriodo':
        return (
          <div className="card">
            <h2 className="card-title">{titulo}</h2>
            <div className="chart-container">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        );
      default:
        return <div>Tipo de relatório inválido.</div>;
    }
  } else {
    return <div>Carregando dados...</div>; // Ou exibe uma mensagem de erro
  }
};

export default GraficoRelatorio;