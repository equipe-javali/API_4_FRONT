import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { cadastrarAlerta } from '../../services/alertaServices';
import "./css/CadastraAlerta.css";
import Alerta from '../../types/Alerta';
import { listarParametros } from '../../services/parametroServices'; 
import { listarEstacoes } from '../../services/estacaoServices'; // Importar o serviço de estações
import { Parametro } from '../../types/Parametro'; 

export function CadastroAlerta() {
  const [formData, setFormData] = useState<Alerta>({
    nome: '',
    condicao: '', 
    valor: 0,  
    id_parametro: 0,
    id_estacao: 0, 
  });  

  const [parametros, setParametros] = useState<Parametro[]>([]);
  const [estacoes, setEstacoes] = useState<any[]>([]); 
  const [mensagem, setMensagem] = useState<string | null>(null);
  const condicoesOptions = [
    { value: '>', label: '>' },
    { value: '<', label: '<' },
    { value: '>=', label: '>=' },
    { value: '<=', label: '<=' },
    { value: '=', label: '=' }
  ];

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const responseParametros = await listarParametros();
        if (responseParametros.data && Array.isArray(responseParametros.data.rows)) {
          setParametros(responseParametros.data.rows);
        } else {
          console.error('Resposta da API de parâmetros não é um array:', responseParametros);
        }

        const responseEstacoes = await listarEstacoes();
        if (responseEstacoes.data && Array.isArray(responseEstacoes.data.rows)) {
          setEstacoes(responseEstacoes.data.rows);
        } else {
          console.error('Resposta da API de estações não é um array:', responseEstacoes);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    carregarDados();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (selectedOption: any, action: any) => {
    setFormData({ ...formData, [action.name]: selectedOption ? selectedOption.value : '' });
  };

  const handleSubmitAlerta = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const responseAlerta = await cadastrarAlerta(formData);

      if (responseAlerta.errors && responseAlerta.errors.length > 0) {
        console.error('Erro na resposta da API:', responseAlerta.errors);
        setMensagem("Erro ao cadastrar alerta: " + responseAlerta.errors.join(", "));
      } else {
        console.log('Sucesso:', responseAlerta);
        setMensagem("Alerta cadastrado com sucesso!");
        setFormData({
          nome: '',
          condicao: '', 
          valor: 0,  
          id_parametro: 0,
          id_estacao: 0,
        });
      }
    } catch (error) {
      console.error('Erro:', error);
      setMensagem("Erro ao cadastrar alerta. Verifique os dados e tente novamente.");
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

  const parametroOptions = parametros.map(parametro => ({
    value: parametro.id,
    label: parametro.nome
  }));

  const estacaoOptions = estacoes.map(estacao => ({
    value: estacao.id,
    label: estacao.nome
  }));

  return (
    <div className="cadastro-alerta">
      <div className="container">
        <h2 className="text-wrapper-titulo">Cadastrar alerta</h2>
        <form onSubmit={handleSubmitAlerta}>
          <div className="form-group">
            <label className="text-wrapper">Nome</label>
            <input
              type="text"
              className="input"
              placeholder="Nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="text-wrapper">Condição</label>
            <Select
              name="condicao"
              options={condicoesOptions}
              className="basic-single"
              classNamePrefix="select"
              onChange={(selectedOption) => handleSelectChange(selectedOption, { name: 'condicao' })}
              value={condicoesOptions.find(option => option.value === formData.condicao) || null}
            />
          </div>
          <div className="form-group">
            <label className="text-wrapper">Valor</label>
            <input
              type="number"
              className="input"
              placeholder="Valor"
              name="valor"
              value={formData.valor}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="text-wrapper">Estação</label>
            <Select
              name="id_estacao"
              options={estacaoOptions}
              className="basic-select"
              classNamePrefix="select"
              onChange={handleSelectChange}
              value={estacaoOptions.find(option => option.value === formData.id_estacao)}
            />
          </div>
          <div className="form-group">
            <label className="text-wrapper">Parâmetro</label>
            <Select
              name="id_parametro"
              options={parametroOptions}
              className="basic-select"
              classNamePrefix="select"
              onChange={handleSelectChange}
              value={parametroOptions.find(option => option.value === formData.id_parametro)}
            />
          </div>
          <div className="form-group">
            <button className="button" type="submit">Salvar</button>
            {mensagem && <div className={mensagem.includes("Erro") ? "error-message" : "success-message"}>{mensagem}</div>}
          </div>
        </form>
      </div>
    </div>
  );
}