import React, { useEffect, useState } from "react";
import "./relatorios.css";
import { IRelatorios } from "../../types/Relatorios";
import { fetchRelatorios } from "../../services/relatoriosServices";
import { toast } from 'react-toastify';
import ExportarRelatorios from "../../components/ExportarRelatorios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000"; // Defina a URL da sua API aqui

export function Relatorios() {
  const [periodoInicial, setPeriodoInicial] = useState("");
  const [periodoFinal, setPeriodoFinal] = useState("");
  const [estacoes, setEstacoes] = useState<string[]>([]);
  const [tipoRelatorio, setTipoRelatorio] = useState("");
  const [relatorios, setRelatorios] = useState<IRelatorios | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRelatorios();
        setRelatorios(data);
      } catch (error) {
        console.error('Erro ao buscar relatórios:', error);
        toast.error('Erro ao buscar relatórios.');
      }
    };

    fetchData();
  }, []);

  const handlePeriodoInicialChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPeriodoInicial(event.target.value);
  };

  const handlePeriodoFinalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPeriodoFinal(event.target.value);
  };

  const handleEstacoesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    setEstacoes(selectedOptions);
  };

  const handleTipoRelatorioChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTipoRelatorio(event.target.value);
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
          <div className="filter-group">
            <label htmlFor="tipoRelatorio" className="label">Selecionar tipo relatório:</label>
            <select id="tipoRelatorio" onChange={handleTipoRelatorioChange} className="input">
              <option value="">Selecione um tipo de relatório</option>
              <option value="alerta">Quantidade Média de Alertas por Estação</option>
              <option value="temperatura">Média de Temperatura por Período</option>
              <option value="chuvaLocal">Quantidade Média de Chuva por Local</option>
              <option value="chuvaPeriodo">Quantidade Média de Chuva por Período</option>
            </select>
          </div>
          <ExportarRelatorios relatorios={relatorios} />
        </div>

        <div className="filter-group">
          <label htmlFor="estacoes" className="label">Selecionar estações:</label>
          <select id="estacoes" onChange={handleEstacoesChange} className="input" multiple>
            <option value="">Todas as estações</option>
            {/* Adicionar as opções de estações aqui */}
          </select>
        </div>

        <div className="content">
          <div className="mapa-container">
            <div className="card mapa-card">
              <h2 className="card-title">MAPA DE ESTAÇÕES</h2>
              <img src="https://via.placeholder.com/325x538" alt="Mapa de Estações" className="mapa" />
            </div>
          </div>
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
        </div>
      </div>
    </div>
  );
}