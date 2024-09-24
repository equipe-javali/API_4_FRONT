import { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import { Link } from "react-router-dom";
import { Estacao } from "../../types/Estacao";
import "./css/ListaEstacoes.css";
import { listarEstacoes } from "../../services/estacaoServices";

export function ListaEstacoes() {
  const [estacoes, setEstacoes] = useState<Estacao[]>([]);
  console.log(estacoes)
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEstacoes = async () => {
      try {
        const response = await listarEstacoes();
        if (!response || !response.data) {
          throw new Error("Resposta da API não é válida.");
        }
        if (response.data.rows) {
          setEstacoes(response.data.rows);
        } else {
          throw new Error("Formato de resposta da API inesperado.");
        }
      } catch (err) {
        console.error("Erro ao buscar estações:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Erro desconhecido.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchEstacoes();
  }, []);

  if (isLoading) {
    return <div>Carregando...</div>; // Considere um spinner aqui
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
      name: 'Ações',
      cell: (row: Estacao) => (
        <Link to={`/estacao/${row.id}/editar`} className="edit-button">Editar</Link>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
  ];

  return (
    <div className="estacoes-container">
      <h2>Lista de Estações</h2>
      <DataTable
        columns={columns}
        data={estacoes}
        pagination
        striped
        highlightOnHover
      />
    </div>
  );
}
