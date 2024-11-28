import React, { useEffect, useState, useRef } from "react";
import "./relatorios.css";
import { IFiltroRelatorios, IRelatorios } from "../../types/Relatorios";
import { fetchRelatorios } from "../../services/relatoriosServices";
import { listarEstacoes } from '../../services/estacaoServices';
import { toast } from 'react-toastify';
import ExportarRelatorios from "../../components/ExportarRelatorios";
import Select from 'react-select';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Estacao } from "../../types/Estacao";
import { Bar, Line } from 'react-chartjs-2';
import { Chart as  ChartJS, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import GraficoTemperatura from "../../components/GraficoTemperatura";
import GraficoUmidade from "../../components/GraficoUmidade";

ChartJS.register(CategoryScale, BarElement, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, );

function obterDataHoje(): string {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

export function Relatorios() {
  const [relatorios, setRelatorios] = useState<IRelatorios | null>(null);
  const [estacoes, setEstacoes] = useState<Estacao[]>([]);
  const [filtrosData, setFiltrosData] = useState<IFiltroRelatorios>({
    dataInicio: obterDataHoje(),
    dataFim: obterDataHoje(),
    estacoes: []
  });
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!filtrosData.estacoes?.length) return;

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          return;
        }
        const data = await fetchRelatorios(filtrosData, token);
        setRelatorios(data);
      } catch (error) {
        console.error('Erro ao buscar relatórios:', error);
        toast.error('Erro ao buscar relatórios.');
      }
    };
    fetchData();
  }, [filtrosData]);

  useEffect(() => {
    const carregarEstacoes = async () => {
      try {
        const responseEstacoes = await listarEstacoes();
        if (responseEstacoes && Array.isArray(responseEstacoes.data.rows)) {
          const todasEstacoes = responseEstacoes.data.rows;
          setEstacoes(todasEstacoes);
          const todosIdsEstacoes = todasEstacoes.map((estacao: Estacao) => estacao.id);
          setFiltrosData(prevFiltros => ({ ...prevFiltros, estacoes: todosIdsEstacoes }));
        }
      } catch (error) {
        console.error('Erro ao carregar estações:', error);
      }
    };
    carregarEstacoes();
  }, []);

  useEffect(() => {
    if (mapRef.current && !leafletMap.current) {
      leafletMap.current = L.map(mapRef.current, {
        center: [-15.0, -47.0],
        zoom: 2,
        dragging: true,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(leafletMap.current);
    }

    if (leafletMap.current) {
      estacoes.forEach(estacao => {
        if (estacao.latitude && estacao.longitude) {
          const marker = L.marker([estacao.latitude, estacao.longitude], {
            title: estacao.nome,
          }).addTo(leafletMap.current!);
          marker.bindTooltip(estacao.nome, { permanent: false, direction: 'top' });
        }
      });
    }
  }, [estacoes]);

  const handlePeriodoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFiltrosData(prevFiltros => ({ ...prevFiltros, [name]: value }));
  };

  const handleEstacoesChange = (selectedOptions: any) => {
    const estacoesIds = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
    setFiltrosData(prevFiltros => ({ ...prevFiltros, estacoes: estacoesIds }));
  };

  const estacaoOptions = estacoes
    .filter((estacao) => estacao.id !== undefined) // Filtra estações com `id` válido
    .map((estacao) => ({
      value: estacao.id as number,
      label: estacao.nome
    }));
    

  // Gerar o gráfico de alertas por estação
  const gerarGraficoAlertas = () => {
    if (!relatorios || !relatorios.data.rows) {
      return {
        labels: [],
        datasets: [
          {
            label: 'Alertas por Estação',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };
    }

    const labels: any[] = [];
    const data: any[] = [];
    
    

    relatorios.data.rows.alertaPorEstacoes.dados.forEach((row: string[]) => {
      const estacaoNome = row[0];
      const quantidadeAlertas = parseFloat(row[1]);

      if (!labels.includes(estacaoNome)) {
        labels.push(estacaoNome);
        data.push(quantidadeAlertas);
      } else {
        const index = labels.indexOf(estacaoNome);
        data[index] += quantidadeAlertas;
      }
    });

    return {
      labels,
      datasets: [
        {
          label: 'Alertas por Estação',
          data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          barThickness: 30,                  
          
        },
      ],
    };
  }; 

  

  return (
    <div className="relatorio">
      <div className="container">
        <h2 className="text-wrapper-titulo">Relatórios</h2>
        <div className="filter-row">
          <div className="filter-group">
            <label htmlFor="periodoInicial" className="label">Período inicial:</label>
            <input
              type="date"
              id="periodoInicial"
              name="dataInicio"
              value={filtrosData.dataInicio}
              onChange={handlePeriodoChange}
              className="input"
            />
          </div>
          <div className="filter-group">
            <label htmlFor="periodoFinal" className="label">Período final:</label>
            <input
              type="date"
              id="periodoFinal"
              name="dataFim"
              value={filtrosData.dataFim}
              onChange={handlePeriodoChange}
              className="input"
            />
          </div>
          <ExportarRelatorios relatorios={relatorios} />
        </div>
        <div className="filter-group">
          <label htmlFor="estacoes" className="label">Selecionar estações:</label>
          <Select
            id="estacoes"
            name="id_estacoes"
            isMulti
            options={estacaoOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleEstacoesChange}
            value={estacaoOptions.filter(option => filtrosData.estacoes?.includes(option.value))}
          />
        </div>
        <div className="content">
          <div className="graficos-container">
            <div className="grafico-alerta">
              <div className="card">
                <h2 className="card-title">QUANTIDADE MÉDIA DE ALERTAS POR ESTAÇÕES</h2>
                <div className="chart-container">
                  <Bar data={gerarGraficoAlertas()} />
                </div>
              </div>
            </div>
            <div className="grafico-row">
              <div className="card">
                <h2 className="card-title">VARIAÇÃO DA TEMPERATURA NO PERÍODO</h2>
                <div className="chart-container">
                  <GraficoTemperatura relatorios={relatorios}  />
                </div>
              </div>
            
              <div className="card">
                <h2 className="card-title">VARIAÇÃO DA UMIDADE NO PERÍODO</h2>
                <div className="chart-container">
                  <GraficoUmidade relatorios={relatorios}  />
                </div>
              </div>
            </div>
            
          </div>

          <div className="mapa-card">
            <h2 className="card-title">MAPA DE ESTAÇÕES</h2>
            {estacoes.some(estacao => estacao.latitude && estacao.longitude) && (
                  <div ref={mapRef} style={{ width: '100%', height: '300px' }} />
                )}
              </div>
            </div>
          </div>
        </div>
      );
}
