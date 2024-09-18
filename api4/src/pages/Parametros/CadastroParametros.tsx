import React, { useState, useEffect } from "react";
import "../css/Estacoes.css";
import { cadastrarParametro } from '../../services/estacaoParametro';
import { CadastrarParametro} from '../../types/Parametro'; 

export const CadastroParametro = () => {
  const [formData, setFormData] = useState<CadastrarParametro>({ 
    nome: '',
    fator: '',  
    offset: '', 
    unidademedida: '', 
  });

  const [mensagem, setMensagem] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await cadastrarParametro(formData);
  
      if (response.errors && response.errors.length > 0) { 
        console.error('Erro na resposta da API:', response.errors);
        setMensagem("Erro ao cadastrar estação: " + response.errors.join(", ")); 
      } else {
        console.log('Sucesso:', response);
        setMensagem("Estação cadastrada com sucesso!");
        setFormData({ 
          nome: '',
          fator: '',
          offset: '',
          unidademedida: '',
        });
      }
    } catch (error) {
      console.error('Erro:', error);
      setMensagem("Erro ao cadastrar parâmetro. Verifique os dados e tente novamente.");
    }
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    if (mensagem) {
      timeoutId = setTimeout(() => {
        setMensagem(null);
      }, 5000); 
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [mensagem]);

  return (
    <div className="cadastro-estacao">
      <div className="container">
        <h1 className="text-wrapper-titulo">Cadastrar tipo de Parâmetro</h1>      

        <form onSubmit={handleSubmit}>  
          <div className="content">          
            <div className="form">
              <div className="form-group">
                <label className="text-wrapper">Nome</label>
                <input 
                  type="text" 
                  className="input" 
                  placeholder="Digite o nome..." 
                  name="nome" 
                  value={formData.nome} 
                  onChange={handleChange} 
                />
              </div>
              <div className="form-group">
                <label className="text-wrapper">Fator</label>
                <input 
                  type="text" 
                  className="input" 
                  placeholder="Digite o fator..." 
                  name="fator" 
                  value={formData.fator} 
                  onChange={handleChange} 
                />
              </div>
              <div className="form-group">
                <label className="text-wrapper">Offset</label>
                <input 
                  type="text" 
                  className="input" 
                  placeholder="Digite a localização..." 
                  name="offset" 
                  value={formData.offset} 
                  onChange={handleChange} 
                />
              </div>
              <div className="form-group">
                <label className="text-wrapper">Unidade de medida</label>
                <select 
                  className="input" 
                  name="unidademedida"  
                  value={formData.unidademedida} 
                  onChange={handleChange} 
                >
                  <option value="">Selecione uma unidade</option>
                  <option value="opcao1">Opção 1</option>
                  <option value="opcao2">Opção 2</option>
                </select>
              </div>
              <button type="submit" className="button">Cadastrar</button>
            </div>
          </div>            
          {mensagem && <div className="success-message">{mensagem}</div>}
        </form> 
      </div>
    </div>    
  );
};
