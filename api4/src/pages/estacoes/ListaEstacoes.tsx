import React, { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import { Link } from "react-router-dom";
import { Estacao } from "../../types/Estacao";
import "./css/ListaEstacoes.css"; 
import { listarEstacoes, deletarEstacao } from "../../services/estacaoServices";
import { ClipLoader } from "react-spinners"; 
import { FaEdit, FaTrash } from 'react-icons/fa'; 

export function ListaEstacoes() {
  const [estacoes, setEstacoes] = useState<Estacao[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEstacoesESensores = async () => {
      try {
        const responseEstacoes = await listarEstacoes();

        if (!responseEstacoes || !responseEstacoes.data) {
          throw new Error("Resposta da API não é válida.");
        }

        if (responseEstacoes.data.rows) {
          const estacoesAjustadas = responseEstacoes.data.rows.map((estacao: any) => ({
            id: estacao.id,
            nome: estacao.nome,
            endereco: estacao.endereco,
            latitude: parseFloat(estacao.latitude),
            longitude: parseFloat(estacao.longitude),
            mac_address: estacao.mac_address,
            sensores: estacao.sensores || []
          }));
          
          setEstacoes(estacoesAjustadas);
        } else {
          throw new Error("Formato de resposta da API inesperado.");
        }
      } catch (err) {
        console.error("Erro ao buscar estações e sensores:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Erro desconhecido.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchEstacoesESensores();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta estação?")) {
      try {
        await deletarEstacao(id);
        setEstacoes(estacoes.filter(estacao => estacao.id !== id));
      } catch (error) {
        console.error("Erro ao excluir estação:", error);
        setError("Erro ao excluir estação. Tente novamente.");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="spinner-container">
        <ClipLoader size={50} color={"#123abc"} loading={isLoading} />
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const columns = [
    {
      name: 'Nome',
      selector: (row: Estacao) => row.nome,
      sortable: true,
    },
    {
      name: 'Endereço',
      selector: (row: Estacao) => row.endereco,
      sortable: true,
    },
    {
      name: 'Latitude',
      selector: (row: Estacao) => row.latitude,
      sortable: true,
    },
    {
      name: 'Longitude',
      selector: (row: Estacao) => row.longitude,
      sortable: true,
    },
    {
      name: 'MAC Address',
      selector: (row: Estacao) => row.mac_address,
      sortable: true,
    },
    {
      name: 'Sensores',
      selector: (row: Estacao) => row.sensores ? row.sensores.map(sensor => sensor.nome).join(', ') : 'Nenhum sensor',
      sortable: false,
    },
    {
      name: 'Ações',
      cell: (row: Estacao) => (
        <div>
          <Link to={`/edita/estacao/${row.id}`} className="icon-button">
            <FaEdit />
          </Link>
          <button 
            onClick={() => row.id !== undefined && handleDelete(row.id)} 
            className="icon-button"
          >
            <FaTrash />
          </button>
        </div>
      ),
      ignoreRowClick: true,
    }
  ];

  return (
    <div className="lista-estacao"> 
      <div className="container">
        <h2 className="text-wrapper-titulo">Lista de Estações</h2> 
        
        <DataTable
          columns={columns}
          data={estacoes}
          pagination
          striped
          highlightOnHover
        />
      </div>
    </div>
  );
}