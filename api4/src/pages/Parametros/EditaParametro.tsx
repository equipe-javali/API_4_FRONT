
import React, { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import { Link } from "react-router-dom";
import { Parametro } from "../../types/Parametro";
import "./css/Parametros.css";

import { listarParametros, deletarParametro } from "../../services/parametroServices";
import { ClipLoader } from "react-spinners"; 
import { FaEdit, FaTrash } from 'react-icons/fa'; 

export function ListaParametros() {
  const [parametros, setParametros] = useState<Parametro[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchParametros = async () => {
      try {
        const response = await listarParametros();
        if (!response || !response.data) {
          throw new Error("Resposta da API não é válida.");
        }
        if (response.data.rows) {
          setParametros(response.data.rows);
        } else {
          throw new Error("Formato de resposta da API inesperado.");
        }
      } catch (err) {
        console.error("Erro ao buscar parâmetros:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Erro desconhecido.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchParametros();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este parâmetro?")) {
      try {
        await deletarParametro(id);
        setParametros(parametros.filter(parametro => parametro.id !== id));
      } catch (error) {
        console.error("Erro ao excluir parâmetro:", error);
        setError("Erro ao excluir parâmetro. Tente novamente.");
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
      selector: (row: Parametro) => row.nome,
      sortable: true,
    },
    {
      name: 'Fator',
      selector: (row: Parametro) => row.fator,
      sortable: true,
    },
    {
      name: 'Offset',
      selector: (row: Parametro) => row.offset,
      sortable: true,
    },
    {
      name: 'Ações',
      cell: (row: Parametro) => (
        <div>
          <Link to={`/edita/parametro/${row.id}`} className="icon-button">
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
    <div className="lista-parametro"> 
      <div className="container">
        <h2 className="text-wrapper-titulo">Lista de Parâmetros</h2> 
        
        <DataTable
          columns={columns}
          data={parametros}
          pagination
          striped
          highlightOnHover
        />
      </div>
    </div>
  );
}
