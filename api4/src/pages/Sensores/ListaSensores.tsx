import { useEffect, useState } from "react";  
import DataTable from 'react-data-table-component';
import { Link } from "react-router-dom";
import Sensor from "../../types/Sensor";
import "./css/ListaSensores.css"; 
import { listarSensores, deletarSensor } from "../../services/sensorServices";
import { FaEdit, FaTrash } from 'react-icons/fa'; 
import { listarParametros } from "../../services/parametroServices";
import { Parametro } from "../../types/Parametro";

export function ListaSensores() {
  const [sensores, setSensores] = useState<Sensor[]>([]);
  const [parametros, setParametros] = useState<Parametro[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Verifica o token do localStorage
    console.log('Token obtido:', token); // Log do token

    if (!token) {
      setError("Você precisa estar logado para listar os sensores."); // Mensagem de erro se o token não existir
      return; // Impede a execução se não houver token
    }

    const fetchSensores = async () => {
      try {
        const response = await listarSensores();
        if (!response || !response.data) {
          throw new Error("Resposta da API não é válida.");
        }
        if (response.data.rows) {
          console.log("Dados recebidos dos sensores:", response.data.rows); 
          setSensores(response.data.rows);
        } else {
          throw new Error("Formato de resposta da API inesperado.");
        }
      } catch (err) {
        console.error("Erro ao buscar sensores:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Erro desconhecido.");
        }
      }
    };

    const fetchParametros = async () => {
      try {
        const response = await listarParametros();
        if (!response || !response.data) {
          throw new Error("Resposta da API não é válida.");
        }
        if (response.data.rows) {
          console.log("Dados recebidos dos parametros:", response.data.rows); 
          setParametros(response.data.rows);
        } else {
          throw new Error("Formato de resposta da API inesperado.");
        }
      } catch (err) {
        console.error("Erro ao buscar parametros:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Erro desconhecido.");
        }
      }
    };

    async function fetchAllData() {
      await Promise.all([fetchSensores(), fetchParametros()]);
    }

    fetchAllData();
  }, []);

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem('token'); // Verifica o token do localStorage
    console.log("Token utilizado para deleção:", token); // Log do token

    if (!token) {
      alert("Você precisa estar logado para deletar um sensor.");
      return; // Se não houver token, não permite a deleção
    }

    if (window.confirm("Tem certeza que deseja excluir este sensor?")) {
      console.log("Tentando deletar o sensor com ID:", id); // Log do ID do sensor

      try {
        await deletarSensor(id);
        console.log("Sensor com ID:", id, "deletado com sucesso."); // Log de sucesso
        setSensores(sensores.filter(sensor => sensor.id !== id));
      } catch (error) {
        console.error("Erro ao excluir sensor:", error);
        setError("Erro ao excluir sensor. Tente novamente.");
      }
    }
  };

  

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const token = localStorage.getItem('token'); // Verifica o token do localStorage

  const columns = [
    {
      name: 'Nome',
      selector: (row: Sensor) => row.nome,
      sortable: true,
    },
    {
      name: 'ID do Parâmetro',
      selector: (row: Sensor) => row.id_parametro,
      sortable: true,
    },
    {
      name: 'Nome do Parâmetro',
      selector: (row: Sensor) => {
        const parametro = parametros.find(p => p.id === row.id_parametro);
        return parametro ? parametro.nome : 'N/A';
      },
      sortable: true,
    },
    {
      name: 'Ações',
      cell: (row: Sensor) => (
        <div>
          <Link 
            to={`/edita/sensor/${row.id}`} 
            className="icon-button" 
            // Desabilita o link se não houver token
            onClick={(e) => {
              if (!token) {
                e.preventDefault(); // Impede o clique no link se não houver token
                alert("Você precisa estar logado para editar um sensor.");
              }
            }}
          >
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
    <div className="lista-sensor"> 
      <div className="container">
        <h2 className="text-wrapper-titulo">Lista de Sensores</h2> 
        
        <DataTable
          columns={columns}
          data={sensores}
          pagination
          striped
          highlightOnHover
        />
      </div>
    </div>
  );
}
