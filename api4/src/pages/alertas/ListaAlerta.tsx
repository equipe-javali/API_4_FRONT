import React, { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import { Link } from "react-router-dom";
import "./css/ListaAlertas.css"; 
import { listarAlertas, deletarAlerta } from "../../services/alertaServices";
import { ClipLoader } from "react-spinners"; 
import { FaEdit, FaTrash, FaChevronDown, FaChevronUp } from 'react-icons/fa'; 
import Alerta from "../../types/Alerta";

export function ListaAlertas() {
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  useEffect(() => {
    const fetchAlertas = async () => {
      try {
        const responseAlertas = await listarAlertas();

        if (!responseAlertas || !responseAlertas.data) {
          throw new Error("Resposta da API não é válida.");
        }

        if (responseAlertas.data.rows) {
          setAlertas(responseAlertas.data.rows);
        } else {
          throw new Error("Formato de resposta da API inesperado.");
        }
      } catch (err) {
        console.error("Erro ao buscar alertas:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Erro desconhecido.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlertas();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este alerta?")) {
      try {
        await deletarAlerta(id);
        setAlertas(alertas.filter(alerta => alerta.id !== id));
      } catch (error) {
        console.error("Erro ao excluir alerta:", error);
        setError("Erro ao excluir alerta. Tente novamente.");
      }
    }
  };

  const toggleRowExpansion = (id: number) => {
    setExpandedRows(prevState =>
      prevState.includes(id) ? prevState.filter(rowId => rowId !== id) : [...prevState, id]
    );
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
      selector: (row: Alerta) => row.nome,
      sortable: true,
    },
    {
      name: 'Condição',
      selector: (row: Alerta) => row.condicao,
      sortable: true,
    },
    {
      name: 'Valor',
      selector: (row: Alerta) => row.valor,
      sortable: true,
    },
    {
      name: 'Estação',
      selector: (row: Alerta) => row.id_estacao,
      sortable: true,
    },
    {
      name: 'Parâmetro',
      selector: (row: Alerta) => row.id_parametro,
      sortable: true,
    },
    {
      name: 'Ações',
      cell: (row: Alerta) => (
        <div>
          <Link to={`/edita/alerta/${row.id}`} className="icon-button">
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
    <div className="lista-alerta"> 
      <div className="container">
        <h2 className="text-wrapper-titulo">Lista de Alertas</h2> 
        
        <DataTable
          columns={columns}
          data={alertas}
          pagination
          striped
          highlightOnHover
        />
      </div>
    </div>
  );
}