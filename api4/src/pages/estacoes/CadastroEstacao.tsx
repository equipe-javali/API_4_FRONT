import React, { useEffect, useState } from "react";
import { cadastrarSensor } from '../../services/sensorServices';
import { Estacao } from '../../types/Estacao';
import "./css/CadastraEstacoes.css";
import { cadastrarEstacao } from "../../services/estacaoServices";
import Sensor from '../../types/Sensor'

export function CadastroEstacao() {
  const [formData, setFormData] = useState<Estacao>({
    nome: '',
    endereco: '',
    latitude: 0,
    longitude: 0,
    mac_address: '',
  });

  const [sensorData, setSensorData] = useState<Sensor>({
    nome: '',
    id_parametro: 0,
    estacaoId: '',
  });

  const [mensagem, setMensagem] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name.startsWith('sensor_')) {
      const sensorFieldName = name.substring(7);
      setSensorData({ ...sensorData, [sensorFieldName]: value });
    } else {
      setFormData({ ...formData, [name]: name === 'latitude' || name === 'longitude' ? parseFloat(value) : value });
    }
  };

  const handleSubmitEstacao = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const responseEstacao = await cadastrarEstacao(formData);

      if (responseEstacao.errors && responseEstacao.errors.length > 0) {
        console.error('Erro na resposta da API:', responseEstacao.errors);
        setMensagem("Erro ao cadastrar estação: " + responseEstacao.errors.join(", "));
      } else {
        console.log('Sucesso:', responseEstacao);
        setMensagem("Estação cadastrada com sucesso!");

        const estacaoId = responseEstacao.id;
        setFormData({
          nome: '',
          endereco: '',
          latitude: 0,
          longitude: 0,
          mac_address: '',
        });

        // Cadastrar o sensor após cadastrar a estação
        const responseSensor = await cadastrarSensor({ ...sensorData, estacaoId });

        if (responseSensor.errors && responseSensor.errors.length > 0) {
          console.error('Erro na resposta da API:', responseSensor.errors);
          setMensagem("Erro ao cadastrar sensor: " + responseSensor.errors.join(", "));
        } else {
          console.log('Sucesso:', responseSensor);
          setMensagem("Sensor cadastrado com sucesso!");
          setSensorData({
            nome: '',
            id_parametro: 0,
            estacaoId: '',
          });
        }
      }
    } catch (error) {
      console.error('Erro:', error);
      setMensagem("Erro ao cadastrar estação e sensor. Verifique os dados e tente novamente.");
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
        <h2 className="text-wrapper-titulo">Cadastrar Estação</h2>

        <form onSubmit={handleSubmitEstacao}>
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

              <div className="form">
              <h2 className="text-wrapper-titulo">Cadastrar Sensor</h2>
              <div className="form-group">
                <label className="text-wrapper">Nome do Sensor</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Nome do Sensor"
                  name="sensor_nome"
                  value={sensorData.nome}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="text-wrapper">Parâmetros do Sensor</label>
                <select
                  className="input"
                  name="sensor_parametros"
                  value={sensorData.id_parametro}
                  onChange={handleChange}
                >
                  <option value="1">Opção 1</option>
                  <option value="2">Opção 2</option>
                </select>
              </div> 
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