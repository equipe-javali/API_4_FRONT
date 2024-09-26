import React, { useState } from "react";
import { cadastrarParametro } from '../../services/parametroServices';
import { Parametro } from '../../types/Parametro';
import "./css/Parametros.css";

export function CadastroParametro() {
  const [formData, setFormData] = useState<Parametro>({
    nome: '',
    fator: 0, // Inicializar como número
    offset: 0, // Inicializar como número
    unidademedida: '',
  });

  const [mensagem, setMensagem] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === 'fator' || name === 'offset' ? parseFloat(value) : value, // Converter para número
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await cadastrarParametro(formData);

      if (response.errors && response.errors.length > 0) {
        console.error('Erro na resposta da API:', response.errors);
        setMensagem("Erro ao cadastrar parâmetro: " + response.errors.join(", "));
      } else {
        console.log('Sucesso:', response);
        setMensagem("Parâmetro cadastrado com sucesso!");

        setFormData({
          nome: '',
          fator: 0, // Resetar como número
          offset: 0, // Resetar como número
          unidademedida: '',
        });
      }
    } catch (error) {
      console.error('Erro:', error);
      setMensagem("Erro ao cadastrar parâmetro. Verifique os dados e tente novamente.");
    }
  };

  return (
    <div className="cadastro-parametro">
      <div className="container">
        <h2 className="text-wrapper-titulo">Cadastrar Parâmetro</h2>

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
                <label className="text-wrapper">Unidade de Medida</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Digite a unidade de medida..."
                  name="unidademedida"
                  value={formData.unidademedida}
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