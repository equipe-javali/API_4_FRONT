import React from 'react';
import axios from 'axios';
import { Relatorios } from '../types/Relatorios';

interface ExportarRelatoriosProps {
  relatorios: Relatorios;
}

const ExportarRelatorios: React.FC<ExportarRelatoriosProps> = ({ relatorios }) => {
  const exportarRelatoriosParaExcel = async () => {
    try {
      const response = await axios.post('/relatorio/download', {
        nomeArquivo: 'relatorios',
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
      link.setAttribute('download', 'relatorios.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Erro ao exportar relatórios', error);
    }
  };

  return (
    <button className="btn-export" onClick={exportarRelatoriosParaExcel}>
      Exportar para Excel
    </button>
  );
};

export default ExportarRelatorios;