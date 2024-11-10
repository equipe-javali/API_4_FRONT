import React, { useEffect, useState } from "react";
import "./relatorios.css";
import { IFiltroRelatorios, IRelatorios } from "../../types/Relatorios";
import { fetchRelatorios } from "../../services/relatoriosServices";
import { listarEstacoes } from '../../services/estacaoServices';
import { toast } from 'react-toastify';
import ExportarRelatorios from "../../components/ExportarRelatorios";
import Select from 'react-select';
import { Estacao } from "../../types/Estacao";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000"; // Defina a URL da sua API aqui

function obterDataHoje(): string {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0'); // Meses começam do 0, então adicione 1
  const dia = String(hoje.getDate()).padStart(2, '0');

  return `${ano}-${mes}-${dia}`;
}

export function Relatorios() {
  const [relatorios, setRelatorios] = useState<IRelatorios | null>(null);
  const [estacoes, setEstacoes] = useState<any[]>([]);
  const [filtrosData, setFiltrosData] = useState<IFiltroRelatorios>({
    dataInicio: obterDataHoje(),
    dataFim: obterDataHoje(),
    estacoes: []
  })
  const [mensagem, setMensagem] = useState<string | null>(null);
  
  useEffect(() => {
    const carregarEstacoes = async () => {
      try {
        const responseEstacoes = await listarEstacoes();
        if (responseEstacoes && Array.isArray(responseEstacoes.data.rows)) {
          const todasEstacoes = responseEstacoes.data.rows
          setEstacoes(todasEstacoes);

          const todosIdsEstacoes = todasEstacoes.map((estacao: Estacao) => estacao.id);
          setFiltrosData({...filtrosData, estacoes: todosIdsEstacoes})

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
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token obtido:', token);

        if (!token) {
          setMensagem("Erro: Você precisa estar logado para visualizar os relatórios");
          return;
        }

        const data = await fetchRelatorios(filtrosData, token);
        setRelatorios(data);
        console.log('Relatórios carregados:', data);
      } catch (error) {
        console.error('Erro ao buscar relatórios:', error);
        toast.error('Erro ao buscar relatórios.');
      }
    };

    fetchData();
  }, [filtrosData]);

  
  const handlePeriodoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFiltrosData({...filtrosData, [name]: value})
  };

  const handleEstacoesChange = (selectedOptions: any) => {
    const estacoesIds = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];    
    setFiltrosData({...filtrosData, estacoes: estacoesIds})
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