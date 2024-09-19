import React, { useEffect, useState } from "react";
import { cadastrarEstacao } from '../../services/estacaoServices';
import { Estacao } from '../../types/Estacao';
import "./css/CadastraEstacoes.css";

export function CadastroEstacao() {
  const [formData, setFormData] = useState<Estacao>({
    nome: '',
    endereco: '',
    latitude: 0,
    longitude: 0,
    mac_address: '',
  });

  const [alertaData, setAlertaData] = useState({
    nome: '',
    condicao: '',
    valor: '',
  });

  const [mensagem, setMensagem] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name.startsWith('alerta_')) {
      const alertaFieldName = name.substring(7);
      setAlertaData({ ...alertaData, [alertaFieldName]: value });
    } else {
      setFormData({ ...formData, [name]: name === 'latitude' || name === 'longitude' ? parseFloat(value) : value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await cadastrarEstacao(formData);

      if (response.errors && response.errors.length > 0) {
        console.error('Erro na resposta da API:', response.errors);
        setMensagem("Erro ao cadastrar estação: " + response.errors.join(", "));
      } else {
        console.log('Sucesso:', response);
        setMensagem("Estação cadastrada com sucesso!");
        setFormData({
          nome: '',
          endereco: '',
          latitude: 0,
          longitude: 0,
          mac_address: '',
        });
        setAlertaData({
          nome: '',
          condicao: '',
          valor: '',
        });
      }
    } catch (error) {
      console.error('Erro:', error);
      setMensagem("Erro ao cadastrar estação. Verifique os dados e tente novamente.");
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
        <h1 className="text-wrapper-titulo">Cadastrar Estação</h1>

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
                <label className="text-wrapper">MAC adress UID</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Digite o MAC adress UID..."
                  name="mac_address"
                  value={formData.mac_address}
                  onChange={handleChange} />
              </div>
              {/* <div className="form-group">
                <label className="text-wrapper">Parâmetros</label>
                <select
                  className="input"
                  name="parametros"
                  value={formData.parametros}
                  onChange={handleChange}
                >
                  <option>Opção 1</option>
                  <option>Opção 2</option>
                </select>
              </div> */}
              <div className="form-group">
                <label className="text-wrapper">Localização</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Digite a localização e/ou ponto de referência..."
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="text-wrapper">Latitude</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Latitude"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="text-wrapper">Longitude</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Longitude"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange} />
              </div>
            </div>
            <div className="foto-container">
              <div className="foto" />
              <label className="text-wrapper">Foto</label>
            </div>
          </div>

          {/* <h2 className="text-wrapper">Cadastrar alerta</h2>
            <div className="form-group">
              <label className="text-wrapper">Nome</label>
              <input
                type="text"
                className="input"
                placeholder="Nome"
                name="alerta_nome"
                value={alertaData.nome}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="text-wrapper">Condição</label>
              <input
                type="text"
                className="input"
                placeholder="Condição"
                name="alerta_condicao"
                value={alertaData.condicao}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="text-wrapper">Valor</label>
              <input
                type="text"
                className="input"
                placeholder="Valor"
                name="alerta_valor"
                value={alertaData.valor}
                onChange={handleChange}
              />
            </div>
            */}
          <div className="form-group">
            <button className="button" type="submit">Salvar</button>
            {mensagem && <div className={mensagem.includes("Erro") ? "error-message" : "success-message"}>{mensagem}</div>}
          </div>
        </form>
      </div>
    </div>
  );
}