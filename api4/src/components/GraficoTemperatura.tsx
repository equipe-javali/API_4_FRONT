import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const cores = [
  { borderColor: 'rgba(255, 99, 132, 1)', backgroundColor: 'rgba(255, 99, 132, 0.2)' },
  { borderColor: 'rgba(54, 162, 235, 1)', backgroundColor: 'rgba(54, 162, 235, 0.2)' },
  { borderColor: 'rgba(255, 206, 86, 1)', backgroundColor: 'rgba(255, 206, 86, 0.2)' },
  { borderColor: 'rgba(75, 192, 192, 1)', backgroundColor: 'rgba(75, 192, 192, 0.2)' },
  { borderColor: 'rgba(153, 102, 255, 1)', backgroundColor: 'rgba(153, 102, 255, 0.2)' },
  { borderColor: 'rgba(255, 159, 64, 1)', backgroundColor: 'rgba(255, 159, 64, 0.2)' },
];

const options = {
  
  scales: {
    
    y: {
      title: {
        display: true,
        text: 'Temperatura (°C)',
      },
      
    },
  },
};

const gerarGraficoTemperatura = (relatorios: any) => {
  if (!relatorios || !relatorios.data.rows.temperatura) {
    return {
      labels: [],
      datasets: [],
    };
  }

  const dadosPorEstacao: { [key: string]: { data: number[], labels: string[] } } = {};

  relatorios.data.rows.temperatura.dados.forEach((row: string[]) => {
    const estacao = row[1];
    const dataHora = new Date(row[2]).toLocaleDateString('pt-BR', { day: 'numeric', month: 'numeric', year: 'numeric' });
    const temperatura = parseFloat(row[3]);

    if (!dadosPorEstacao[estacao]) {
      dadosPorEstacao[estacao] = { data: [], labels: [] };
    }

    dadosPorEstacao[estacao].data.push(temperatura);
    dadosPorEstacao[estacao].labels.push(dataHora);
  });

  if (Object.keys(dadosPorEstacao).length === 0) {
    return {
      labels: [],
      datasets: [],
    };
  }

  const datasets = Object.keys(dadosPorEstacao).map((estacao, index) => ({
    label: estacao,
    data: dadosPorEstacao[estacao].data,
    borderColor: cores[index % cores.length].borderColor,
    backgroundColor: cores[index % cores.length].backgroundColor,
    fill: false,
  }));

  const labels = dadosPorEstacao[Object.keys(dadosPorEstacao)[0]].labels;

  return {
    labels,
    datasets,
  };
};

const GraficoTemperatura = ({ relatorios }: { relatorios: any }) => {
  const data = gerarGraficoTemperatura(relatorios);

  return <Line data={data} options={options} />;
};

export default GraficoTemperatura;