import React, { useEffect, useState, useRef } from "react";
import "./relatorios.css";
import { IRelatorios } from "../../types/Relatorios";
import { fetchRelatorios } from "../../services/relatoriosServices";
import { listarEstacoes } from '../../services/estacaoServices';
import { toast } from 'react-toastify';
import ExportarRelatorios from "../../components/ExportarRelatorios";
import Select from 'react-select';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000"; // Defina a URL da sua API aqui

export function Relatorios() {
  const [estacoes, setEstacoes] = useState<any[]>([]);
  const [relatorios, setRelatorios] = useState<IRelatorios | null>(null);
  const [periodoInicial, setPeriodoInicial] = useState("");
  const [periodoFinal, setPeriodoFinal] = useState("");
  const [mensagem, setMensagem] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null); // Ref para o mapa
  const leafletMap = useRef<L.Map | null>(null); // Referência para o mapa Leaflet

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token obtido:', token);

        if (!token) {
          setMensagem("Erro: Você precisa estar logado para cadastrar um sensor.");
          return;
        }
        const data = await fetchRelatorios(token);
        setRelatorios(data);
        console.log('Relatórios carregados:', data);
      } catch (error) {
        console.error('Erro ao buscar relatórios:', error);
        toast.error('Erro ao buscar relatórios.');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const carregarEstacoes = async () => {
      try {
        const responseEstacoes = await listarEstacoes();
        if (responseEstacoes.data && Array.isArray(responseEstacoes.data.rows)) {
          setEstacoes(responseEstacoes.data.rows);
        } else {
          console.error('Resposta da API de estações não é um array:', responseEstacoes);
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
        zoom: 4,
        dragging: false,
        zoomControl: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(leafletMap.current);
    }

    if (leafletMap.current) {
      estacoes.forEach(estacao => {
        // Verifica se a latitude e longitude são válidas antes de adicionar o marcador
        if (estacao.latitude && estacao.longitude) {
          const marker = L.marker([estacao.latitude, estacao.longitude], {
            title: estacao.nome,
          }).addTo(leafletMap.current!);
          marker.bindTooltip(estacao.nome, { permanent: false, direction: 'top' });
        }
      });
    }
  }, [estacoes]);

  const handlePeriodoInicialChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPeriodoInicial(event.target.value);
  };

  const handlePeriodoFinalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPeriodoFinal(event.target.value);
  };

  const handleEstacoesChange = (selectedOptions: any) => {
    const selectedEstacoes = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
    setEstacoes(selectedEstacoes);
  };

  const estacaoOptions = estacoes.map(estacao => ({
    value: estacao.id,
    label: estacao.nome
  }));

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
              value={periodoInicial}
              onChange={handlePeriodoInicialChange}
              className="input"
            />
          </div>
          <div className="filter-group">
            <label htmlFor="periodoFinal" className="label">Período final:</label>
            <input
              type="date"
              id="periodoFinal"
              value={periodoFinal}
              onChange={handlePeriodoFinalChange}
              className="input"
            />
          </div>
          <ExportarRelatorios relatorios={relatorios} />
        </div>
        <div className="filter-group">
          <label htmlFor="estacoes" className="label">Selecionar estações:</label>
          <Select
            id="estacoes"
            isMulti
            options={estacaoOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleEstacoesChange}
          />
        </div>

        <div className="content">
          <div className="graficos-container">
            <div className="grafico-row">
              <div className="card">
                <h2 className="card-title">QUANTIDADE MÉDIA DE ALERTAS POR ESTAÇÕES</h2>
                <div className="chart-container">
                  {/* Gráfico de Alertas */}
                </div>
              </div>
              <div className="card">
                <h2 className="card-title">MÉDIA DE TEMPERATURA POR PERÍODO</h2>
                <div className="chart-container">
                  {/* Gráfico de Temperatura */}
                </div>
              </div>
            </div>
            <div className="grafico-row">
              <div className="card">
                <h2 className="card-title">QUANTIDADE MÉDIA DE CHUVA POR LOCAL</h2>
                <div className="chart-container">
                  {/* Gráfico de Chuva por Local */}
                </div>
              </div>
              <div className="card">
                <h2 className="card-title">QUANTIDADE MÉDIA DE CHUVA POR PERÍODO</h2>
                <div className="chart-container">
                  {/* Gráfico de Chuva por Período */}
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
