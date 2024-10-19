import React, { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import { Link, useNavigate } from "react-router-dom";
import "./css/ListaParametro.css";
import { listarParametros, deletarParametro } from "../../services/parametroServices";
import { ClipLoader } from "react-spinners"; 
import { FaEdit, FaTrash } from 'react-icons/fa'; 

export function ListaParametros() {
  const [parametros, setParametros] = useState<Record<string, any>[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Função para obter o token do localStorage
  const getToken = () => {
    const token = localStorage.getItem('token');
    console.log("Token recebido do localStorage:", token); // Log para verificar se o token foi obtido
    return token;
  };

  useEffect(() => {
    const fetchParametros = async () => {
      // Verifica se o token existe
      const token = getToken();

      if (!token) {
        setError("Usuário não autenticado. Faça login.");
        console.log("Token não encontrado. Redirecionando para login."); // Log de verificação
        navigate("/login");
        return;
      }

      try {
        console.log("Enviando requisição para listar parâmetros com token:", token); // Verifica se o token está sendo enviado
        const response = await listarParametros();

        if (!response || !response.data) {
          throw new Error("Resposta da API não é válida.");
        }

        if (response.data.rows) {
          const parametrosAjustados = response.data.rows.map((parametro: any) => ({
            id: parametro.id,
            unidade_medida: parametro.id_unidade ?? 0,  
            nome: parametro.nome,
            fator: parseFloat(parametro.fator), 
            offset: parseFloat(parametro.valor_offset),  
            nome_json: parametro.nome_json
          }));
          
          setParametros(parametrosAjustados);
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
  }, [navigate]);

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
      selector: (row: Record<string, any>) => row.nome || 'N/A', 
      sortable: true,
    },
    {
      name: 'Fator',
      selector: (row: Record<string, any>) => row.fator || 'N/A', 
      sortable: true,
    },
    {
      name: 'Offset',  
      selector: (row: Record<string, any>) => row.offset || 'N/A', 
      sortable: true,
    },
    {
      name: 'Unidade de Medida',  
      selector: (row: Record<string, any>) => row.unidade_medida || 'N/A',
      sortable: true,
    },
    {
      name: 'Nome JSON',
      selector: (row: Record<string, any>) => row.nome_json || 'N/A',
      sortable: true,
    },
    {
      name: 'Ações',
      cell: (row: Record<string, any>) => (
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
