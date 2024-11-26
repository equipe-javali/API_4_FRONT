import { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import { Link, useNavigate } from "react-router-dom"; // useNavigate para redirecionamento
import { Estacao } from "../../types/Estacao";
import "./css/ListaEstacoes.css"; 
import { listarEstacoes, deletarEstacao } from "../../services/estacaoServices";
import { ClipLoader } from "react-spinners"; 
import { FaEdit, FaTrash, FaChevronDown, FaChevronUp } from 'react-icons/fa'; 

export function ListaEstacoes() {
  const [estacoes, setEstacoes] = useState<Estacao[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const navigate = useNavigate(); // Para redirecionar

  // Função para obter o token do local storage
  const getToken = () => {
    const token = localStorage.getItem('token'); // Busca o token armazenado
    console.log("Token recebido:", token); // Log do token
    return token;
  };

  useEffect(() => {
    const fetchEstacoesESensores = async () => {
      const token = getToken(); // Obter o token

      // Verifica se o token existe
      if (!token) {
        setError("Usuário não autenticado. Faça login.");
        navigate("/login"); // Redireciona para a página de login se o token não existir
        return;
      }

      console.log("Iniciando a listagem de estações com o token:", token); // Log antes da requisição

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
          console.log("Estações carregadas:", estacoesAjustadas); // Log das estações carregadas
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
  }, [navigate]);

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta estação?")) {
      try {
        const token = localStorage.getItem('token'); // Pegando o token do local storage
  
        if (!token) {
          setError("Token não encontrado. Faça login novamente.");
          return;
        }
  
        const estacaoParaDeletar = estacoes.find(estacao => estacao.id === id);
        if (estacaoParaDeletar) {
          await deletarEstacao(id, token);
          console.log(`Estação deletada: Nome - ${estacaoParaDeletar.nome}, ID - ${id}`);
          setEstacoes(estacoes.filter(estacao => estacao.id !== id));
        } else {
          console.error("Estação não encontrada.");
        }
      } catch (error) {
        console.error("Erro ao excluir estação:", error);
        setError("Erro ao excluir estação. Tente novamente.");
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
      cell: (row: Estacao) => (
        <div>
          {row.sensores && row.sensores.length > 1 ? (
            <button onClick={() => toggleRowExpansion(row.id!)} className="icon-button">
              {expandedRows.includes(row.id!) ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          ) : (
            row.sensores ? row.sensores.map(sensor => sensor.nome).join(', ') : 'Nenhum sensor'
          )}
          {row.sensores && expandedRows.includes(row.id!) && (
            <div className="sensor-list">
              {row.sensores.map(sensor => (
                <div key={sensor.id}>{sensor.nome}</div>
              ))}
            </div>
          )}
        </div>
      ),
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