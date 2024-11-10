import React, { useEffect, useState } from "react";
import "./relatorios.css";
import { IFiltroRelatorios, IRelatorios } from "../../types/Relatorios";
import { fetchRelatorios } from "../../services/relatoriosServices";
import { listarEstacoes } from '../../services/estacaoServices';
import { toast } from 'react-toastify';
import ExportarRelatorios from "../../components/ExportarRelatorios";
import Select from 'react-select';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000"; // Defina a URL da sua API aqui

export function Relatorios() {
  const [relatorios, setRelatorios] = useState<IRelatorios | null>(null);
  const [estacoes, setEstacoes] = useState<any[]>([]);
  const [periodoInicial, setPeriodoInicial] = useState("");
  const [periodoFinal, setPeriodoFinal] = useState("");
  const [filtrosData, setFiltrosData] = useState<IFiltroRelatorios>({
    dataInicio: "",
    dataFim: "",
    estacoes: []
  })
  const [mensagem, setMensagem] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token obtido:', token);

        if (!token) {
          setMensagem("Erro: Você precisa estar logado para cadastrar um sensor.");
          return;
        }
        setFiltrosData({...filtrosData, 
          dataFim: periodoFinal,
          dataInicio: periodoInicial,
          estacoes: estacoes
        })

        const data = await fetchRelatorios(filtrosData, token);
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

  const handlePeriodoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFiltrosData({...filtrosData, [name]: value})
  };

  const handleEstacoesChange = (selectedOptions: any) => {
    const selectedEstacoes = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
    const estacoesSelecionadas = estacoes.filter(estacao => selectedEstacoes.includes(estacao.id))
    
    setEstacoes(estacoesSelecionadas);
    setFiltrosData({...filtrosData, estacoes: estacoesSelecionadas})
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
          {/* <div className="mapa-container">
            <div className="card mapa-card">
              <h2 className="card-title">MAPA DE ESTAÇÕES</h2>
              <img src="https://via.placeholder.com/325x538" alt="Mapa de Estações" className="mapa" />
            </div>
          </div> */}
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