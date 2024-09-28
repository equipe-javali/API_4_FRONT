import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { cadastrarParametro } from "../../services/parametroServices";
import { listarUnidades } from '../../services/unidadeServices';
import "./css/Parametros.css";

export function CadastroParametro() {
  const [formData, setFormData] = useState({
    unidade_medida: 0, 
    nome: '',
    fator: 0,
    offset: 0,
    nome_json: ''
  });

  const [unidadeOptions, setUnidadeOptions] = useState<any[]>([]);
  const [mensagem, setMensagem] = useState<string | null>(null);

  useEffect(() => {
    const carregarUnidades = async () => {
      try {
        const response = await listarUnidades();
        if (response.data && Array.isArray(response.data.rows)) {
          setUnidadeOptions(response.data.rows.map((unidade: any) => ({
            value: unidade.id,
            label: unidade.nome
          })));
        } else {
          console.error('Resposta da API não é um array:', response);
        }
      } catch (error) {
        console.error('Erro ao carregar unidades:', error);
      }
    };

    carregarUnidades();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'fator' || name === 'offset' ? parseFloat(value) : value });
  };

  const handleSelectChange = (selectedOption: any) => {
    setFormData({ ...formData, unidade_medida: selectedOption ? selectedOption.value : 0 }); 
  };

  const handleSubmitParametro = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data before submit:", formData); 
  
    try {
      const responseParametro = await cadastrarParametro(formData);
      if (responseParametro.errors && responseParametro.errors.length > 0) {
        setMensagem("Erro ao cadastrar parâmetro: " + responseParametro.errors.join(", "));
      } else {
        setMensagem("Parâmetro cadastrado com sucesso!");
        setFormData({
          unidade_medida: 0,
          nome: '',
          fator: 0,
          offset: 0,
          nome_json: ''
        });
      }
    } catch (error) {
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
    <div className="cadastro-parametro">
      <div className="container">
        <h2 className="text-wrapper-titulo">Cadastrar Parâmetro</h2>
        <form onSubmit={handleSubmitParametro}>
          <div className="content">
            <div className="form">
              <div className="form-group">
                <label className="text-wrapper">Unidade de Medida</label>
                <Select
                  name="unidade_medida" 
                  options={unidadeOptions}
                  className="basic-single"
                  classNamePrefix="select"
                  onChange={handleSelectChange}
                  value={unidadeOptions.find(option => option.value === formData.unidade_medida) || null} 
                />
              </div>
              <div className="form-group">
                <label className="text-wrapper">Nome</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Digite o nome..."
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="text-wrapper">Fator</label>
                <input
                  type="number"
                  className="input"
                  placeholder="Digite o fator..."
                  name="fator"
                  value={formData.fator}
                  onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="text-wrapper">Offset</label>
                <input
                  type="number"
                  className="input"
                  placeholder="Digite o offset..."
                  name="offset"
                  value={formData.offset}
                  onChange={handleChange} />
              </div>
              <div className="form-group">
                <button className="button" type="submit">Salvar</button>
                {mensagem && <div className={mensagem.includes("Erro") ? "error-message" : "success-message"}>{mensagem}</div>}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
