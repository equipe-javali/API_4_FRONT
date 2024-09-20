// import React from "react";
// import "./css/ListaEstacoes.css";

// export function ListaEstacoes() {
//     return (
//         <div className="estaes">
//             <div className="div">                
//                 <div className="text-wrapper">Estações</div>
//                 <div className="overlap-group">
//                     <div className="div-2">
//                         <div className="text-wrapper-2">Nome</div>
//                     </div>
//                     <div className="text-wrapper-3">Foto</div>
//                 </div>
//                 <div className="overlap-2">
//                     <div className="div-2">
//                         <div className="text-wrapper-2">Nome</div>
//                     </div>
//                     <div className="text-wrapper-3">Foto</div>
//                 </div>
//                 <div className="div-wrapper">
//                     <div className="text-wrapper-4">Adicionar</div>
//                 </div>
//                 <div className="overlap-3">
//                     <div className="div-2">
//                         <div className="text-wrapper-2">Nome</div>
//                     </div>
//                     <div className="text-wrapper-3">Foto</div>
//                 </div>
//                 <div className="overlap-4">
//                     <div className="div-2" />
//                     <div className="text-wrapper-3">Foto</div>
//                 </div>
//                 <div className="overlap-5">
//                     <div className="div-2">
//                         <div className="text-wrapper-2">Nome</div>
//                     </div>
//                     <div className="text-wrapper-3">Foto</div>
//                 </div>
//                 <div className="overlap-6">
//                     <div className="div-2">
//                         <div className="text-wrapper-2">Nome</div>
//                     </div>
//                     <div className="text-wrapper-3">Foto</div>
//                 </div>
//                 <div className="overlap-7">
//                     <div className="div-2">
//                         <div className="text-wrapper-2">Nome</div>
//                     </div>
//                     <div className="text-wrapper-3">Foto</div>
//                 </div>
//                 <div className="overlap-group-2">
//                     <div className="div-2">
//                         <div className="text-wrapper-2">Nome</div>
//                     </div>
//                     <div className="text-wrapper-3">Foto</div>
//                 </div>
//                 <div className="overlap-8">
//                     <div className="div-2">
//                         <div className="text-wrapper-2">Nome</div>
//                     </div>
//                     <div className="text-wrapper-3">Foto</div>
//                 </div>
//                 <div className="overlap-9">
//                     <div className="div-2">
//                         <div className="text-wrapper-2">Nome</div>
//                     </div>
//                     <div className="text-wrapper-3">Foto</div>
//                 </div>
//                 <div className="overlap-10">
//                     <div className="div-2">
//                         <div className="text-wrapper-2">Nome</div>
//                     </div>
//                     <div className="text-wrapper-3">Foto</div>
//                 </div>
//                 <div className="overlap-11">
//                     <div className="div-2">
//                         <div className="text-wrapper-2">Nome</div>
//                     </div>
//                     <div className="text-wrapper-3">Foto</div>
//                 </div>
//             </div>
//         </div>
//     );
// }
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listarEstacoes } from "../../services/estacaoServices";
import { Estacao } from "../../types/Estacao";
import "./css/ListaEstacoes.css";

export function ListaEstacoes() {
  const [estacoes, setEstacoes] = useState<Estacao[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
const fetchEstacoes = async () => {
    try {
    const response = await listarEstacoes();
    if (response.errors && response.errors.length > 0) {
        throw new Error(response.errors.join(", ")); 
    }
    // Check if 'data' and 'rows' exist before accessing them
    if (response.data && response.data.rows) {
        setEstacoes(response.data.rows);
    } else {
        throw new Error("Formato de resposta da API inesperado."); 
    }
    } catch (err) {
    console.error("Erro ao buscar estações:", err);
    setError("Erro ao carregar as estações. Tente novamente mais tarde.");
    } finally {
    setIsLoading(false);
    }
};

fetchEstacoes();
}, []);

if (isLoading) {
return <div>Carregando...</div>;
}

if (error) {
return <div className="error-message">{error}</div>;
}

  return (
    <div className="estacoes-container"> 
      <h2>Lista de Estações</h2>
      <div className="estacoes-grid"> 
        {estacoes.map((estacao) => (
          <div className="estacao-card" key={estacao.id}> 
            <h3>{estacao.nome}</h3>
            <p>Endereço: {estacao.endereco}</p>
            {/* Adicione mais informações conforme necessário */}
            <Link to={`/estacao/${estacao.id}/editar`} className="edit-button">Editar</Link> 
          </div>
        ))}
      </div>
    </div>
  );
}