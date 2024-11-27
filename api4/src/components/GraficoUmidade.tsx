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
  TimeScale,
  ChartOptions
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { ptBR } from 'date-fns/locale';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const cores = [
  { borderColor: 'rgba(255, 99, 132, 1)', backgroundColor: 'rgba(255, 99, 132, 0.2)' },
  { borderColor: 'rgba(54, 162, 235, 1)', backgroundColor: 'rgba(54, 162, 235, 0.2)' },
  { borderColor: 'rgba(255, 206, 86, 1)', backgroundColor: 'rgba(255, 206, 86, 0.2)' },
  { borderColor: 'rgba(75, 192, 192, 1)', backgroundColor: 'rgba(75, 192, 192, 0.2)' },
  { borderColor: 'rgba(153, 102, 255, 1)', backgroundColor: 'rgba(153, 102, 255, 0.2)' },
  { borderColor: 'rgba(255, 159, 64, 1)', backgroundColor: 'rgba(255, 159, 64, 0.2)' },
];

const options: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
  },
  scales: {
    x: {
      type: 'time',
      adapters: {
        date: {
          locale: ptBR,
        },
      },
      
      title: {
        display: true,
       
      },
      ticks: {
        maxTicksLimit: 10,
        autoSkip: true,
      },
    },
    y: {
      type: 'linear',
      title: {
        display: true,
        text: 'Umidade (%)',
      },
      
    },
  },
};

const gerarGraficoUmidade = (relatorios: any) => {
  if (!relatorios || !relatorios.data.rows.Umidade) {
    return {
      labels: [],
      datasets: [],
    };
  }

  const dadosPorEstacao: { [key: string]: { data: { x: Date, y: number }[] } } = {};

  relatorios.data.rows.Umidade.dados.forEach((row: string[]) => {
    const estacao = row[1];
    const dataHora = new Date(row[2]);
    const Umidade = parseFloat(row[3]);

    if (!dadosPorEstacao[estacao]) {
      dadosPorEstacao[estacao] = { data: [] };
    }

    dadosPorEstacao[estacao].data.push({ x: dataHora, y: Umidade });
  });

  const datasets = Object.keys(dadosPorEstacao).map((estacao, index) => ({
    label: estacao,
    data: dadosPorEstacao[estacao].data,
    borderColor: cores[index % cores.length].borderColor,
    backgroundColor: cores[index % cores.length].backgroundColor,
    fill: false,
  }));

  return {
    datasets,
  };
};

const GraficoUmidade = ({ relatorios }: { relatorios: any }) => {
  const data = gerarGraficoUmidade(relatorios);

  return <Line data={data} options={options} />;
};

export default GraficoUmidade;