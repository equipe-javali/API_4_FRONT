import React, { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import { Link, useNavigate } from "react-router-dom";
import "./css/ListaAlertas.css"; 
import { listarAlertas, deletarAlerta } from "../../services/alertaServices";
import { listarEstacoes } from "../../services/estacaoServices";
import { listarParametros } from "../../services/parametroServices";
import { ClipLoader } from "react-spinners"; 
import { FaEdit, FaTrash } from 'react-icons/fa'; 
import Alerta from "../../types/Alerta";
import { Estacao } from "../../types/Estacao";
import { Parametro } from "../../types/Parametro";

export function ListaAlertas() {
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [estacoes, setEstacoes] = useState<Estacao[]>([]);
  const [parametros, setParametros] = useState<Parametro[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    // Verifica se o token existe
    if (!token) {
      setError("Você precisa estar logado para acessar esta página.");
      return;
    }

    // Log para mostrar que o token foi encontrado
    console.log("Token encontrado:", token);

    const fetchData = async () => {
      try {
        const [responseAlertas, responseEstacoes, responseParametros] = await Promise.all([
          listarAlertas(),
          listarEstacoes(),
          listarParametros()
        ]);

        if (!responseAlertas || !responseAlertas.data || !responseEstacoes || !responseEstacoes.data || !responseParametros || !responseParametros.data) {
          throw new Error("Resposta da API não é válida.");
        }

        // Log para mostrar que o token foi utilizado para buscar os alertas
        console.log("Token utilizado para listar alertas:", token);
        
        setAlertas(responseAlertas.data.rows);
        setEstacoes(responseEstacoes.data.rows);
        setParametros(responseParametros.data.rows);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Erro desconhecido.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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

  const getEstacaoNome = (id: number) => {
    const estacao = estacoes.find(estacao => estacao.id === id);
    return estacao ? estacao.nome : 'N/A';
  };

  const getParametroNome = (id: number) => {
    const parametro = parametros.find(parametro => parametro.id === id);
    return parametro ? parametro.nome : 'N/A';
  };

  const columns = [
    {
      name: 'Nome',
      selector: (row: Alerta) => row.nome,
      sortable: true,
      wrap: true,
    },
    {
      name: 'Condição',
      selector: (row: Alerta) => row.condicao,
      sortable: true,
      wrap: true,
    },
    {
      name: 'Valor',
      selector: (row: Alerta) => row.valor,
      sortable: true,
      wrap: true,
    },
    {
      name: 'Estação',
      selector: (row: Alerta) => getEstacaoNome(row.id_estacao),
      sortable: true,
      wrap: true,
    },
    {
      name: 'Parâmetro',
      selector: (row: Alerta) => getParametroNome(row.id_parametro),
      sortable: true,
      wrap: true,
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
