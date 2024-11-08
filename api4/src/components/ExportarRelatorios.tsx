import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IRelatorios } from '../types/Relatorios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000'; 

interface ExportarRelatoriosProps {
  relatorios?: IRelatorios; 
}

function ExportarRelatorios({ relatorios }: ExportarRelatoriosProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [nomeArquivo, setNomeArquivo] = useState('relatorios.xlsx'); // Estado para o nome do arquivo

  const exportarRelatoriosParaExcel = async () => {
    if (!relatorios) {
      toast.error('Nenhum relatório para exportar.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/relatorio/download`, {
        nomeArquivo: nomeArquivo.replace('.xlsx', ''), // Remove a extensão do nome do arquivo
        tabelas: [
          relatorios.mapaEstacoes,
          relatorios.alertaPorEstacoes,
          relatorios.medicaoPorSensor,
          relatorios.ocorrenciaPorAlerta
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
      <input 
        type="text" 
        value={nomeArquivo} 
        onChange={(e) => setNomeArquivo(e.target.value)} 
        placeholder="Nome do arquivo (ex: relatorios.xlsx)" 
      />
      <button className="btn-export" onClick={exportarRelatoriosParaExcel} disabled={isLoading}>
        {isLoading ? 'Exportando...' : 'Exportar para Excel'}
      </button>
    </div>
  );
}

export default ExportarRelatorios;