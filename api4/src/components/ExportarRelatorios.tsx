import React, { useState } from 'react';
import { ExportarRelatoriosProps, IArquivo, IGraficos } from '../types/Relatorios';
import "../pages/relatorios/relatorios.css";
import { fetchRelatoriosDownload } from '../services/relatoriosServices';

declare global {
  interface Window {
    exportarRelatoriosParaExcel: () => void;
    relatorios: ExportarRelatoriosProps;
  }
}

function ExportarRelatorios({ relatorios }: Readonly<ExportarRelatoriosProps>) {
  const [isLoading, setIsLoading] = useState(false);
  const [arquivo, setArquivo] = useState<IArquivo>({
    nomeArquivo: "",
    tabelas: [],
  });

  const exportarRelatoriosParaExcel = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("Erro: Você precisa estar logado para exportar relatórios.");
      return;
    }

    if (!relatorios) {
      console.warn("Nenhum relatório para exportar.");
      return;
    }

    try {
      setIsLoading(true);
      console.log('Exportando relatórios:', relatorios);

      const responseBlob = await fetchRelatoriosDownload(arquivo, token);
      if (responseBlob.size === 0) {
        throw new Error("O arquivo está vazio");
      }

      const url = window.URL.createObjectURL(responseBlob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `${arquivo.nomeArquivo}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      console.log("Relatórios exportados com sucesso!");
    } catch (error) {
      console.error('Erro ao exportar relatórios:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTipoRelatorioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setArquivo((prevArquivo) => ({
      ...prevArquivo,
      nomeArquivo: value,
      tabelas:
        value === "alertaPorEstacoes" && relatorios?.data.rows.alertaPorEstacoes
          ? [relatorios.data.rows.alertaPorEstacoes]
          : value === "medicaoPorSensor" && relatorios?.data.rows.medicaoPorSensor
            ? [relatorios.data.rows.medicaoPorSensor]
            : value === "ocorrenciaPorAlerta" && relatorios?.data.rows.ocorrenciaPorAlerta
              ? [relatorios.data.rows.ocorrenciaPorAlerta]
              : [
                relatorios?.data.rows.alertaPorEstacoes,
                relatorios?.data.rows.medicaoPorSensor,
                relatorios?.data.rows.ocorrenciaPorAlerta,
              ].filter((tabela): tabela is IGraficos => tabela !== undefined),
    }));
    console.log('arquivo: ', value);
  };

  return (
    <div>
      <div className="filter-row">
        <div className="filter-group">
          <label htmlFor="tipoRelatorio" className="label">Selecionar tipo relatório:</label>
          <select id="tipoRelatorio" onChange={handleTipoRelatorioChange} className="input">
            <option value="">Selecione um tipo de relatório</option>
            <option value="relatorioGeral">Geral</option>
            <option value="alertaPorEstacoes">Quantidade Média de Alertas por Estação</option>
            <option value="medicaoPorSensor">Média de Medição por Sensor</option>
            <option value="ocorrenciaPorAlerta">Quantidade de Ocorrências por Alerta</option>
          </select>
        </div>
      </div>

      <button className="button" onClick={exportarRelatoriosParaExcel} disabled={isLoading}>
        {isLoading ? 'Exportando...' : 'Exportar'}
      </button>
    </div>
  );
}

export default ExportarRelatorios;
