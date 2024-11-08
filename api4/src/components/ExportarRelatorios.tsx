import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IRelatorios } from '../types/Relatorios';
import "../pages/relatorios/relatorios.css";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000'; 

interface ExportarRelatoriosProps {
  relatorios?: IRelatorios | null; 
}

function ExportarRelatorios({ relatorios }: ExportarRelatoriosProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [nomeArquivo, setNomeArquivo] = useState('relatorios.xlsx'); // Estado para o nome do arquivo

  const exportarRelatoriosParaExcel = async () => {
    if (!relatorios || !relatorios.alertaPorEstacoes || !relatorios.medicaoPorSensor || !relatorios.ocorrenciaPorAlerta) {
      toast.error('Nenhum relatório para exportar.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/download`, {
        nomeArquivo: nomeArquivo.replace('.xlsx', ''), 
        tabelas: [
          {
            titulo: 'Quantidade Média de Alertas por Estação',
            subtitulos: ['Estação', 'Quantidade de Alertas'],
            dados: relatorios.alertaPorEstacoes.dados
          },
          {
            titulo: 'Média de Medição por Sensor',
            subtitulos: ['Sensor', 'Média de Medição'],
            dados: relatorios.medicaoPorSensor.dados
          },
          {
            titulo: 'Quantidade de Ocorrências por Alerta',
            subtitulos: ['Alerta', 'Quantidade de Ocorrências'],
            dados: relatorios.ocorrenciaPorAlerta.dados
          }
        ]
      }, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', nomeArquivo); // Usa o nome do arquivo do estado
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success('Relatórios exportados com sucesso!');
    } catch (error: any) {
      console.error('Erro ao exportar relatórios', error);
      toast.error('Ocorreu um erro ao exportar os relatórios.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Input para o usuário digitar o nome do arquivo */}
      <div className="filter-row">
        <div className="filter-group">
        <button className="button" onClick={exportarRelatoriosParaExcel} disabled={isLoading}>
        {isLoading ? 'Exportando...' : 'Exportar '}
       </button>
        {/* <label htmlFor="nomeArquivo" className="label">Nome do arquivo:</label>
        <input 
          type="text" 
          value={nomeArquivo} 
          onChange={(e) => setNomeArquivo(e.target.value)} 
          placeholder="Nome do arquivo (ex: relatorios.xlsx)" 
          className='input'
        /> */}
        </div>
      </div>
      
    </div>
  );
}

export default ExportarRelatorios;