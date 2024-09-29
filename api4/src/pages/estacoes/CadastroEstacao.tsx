import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { cadastrarEstacao, adicionarSensor } from "../../services/estacaoServices";
import { Estacao } from '../../types/Estacao';
import "./css/CadastraEstacoes.css";
import { listarSensores } from '../../services/sensorServices'; 

export function CadastroEstacao() {
  const [formData, setFormData] = useState<Estacao>({
    nome: '',
    endereco: '',
    latitude: 0,
    longitude: 0,
    mac_address: '',
    id_sensores: [], 
  });

  const [sensores, setSensores] = useState<any[]>([]); 
  const [sensoresSelecionados, setSensoresSelecionados] = useState<any[]>([]); 
  const [mensagem, setMensagem] = useState<string | null>(null);

  useEffect(() => {
    const carregarSensores = async () => {
      try {
        const response = await listarSensores();
        if (response.data && Array.isArray(response.data.rows)) {
          setSensores(response.data.rows);
        } else {
          console.error('Resposta da API não é um array:', response);
        }
      } catch (error) {
        console.error('Erro ao carregar sensores:', error);
      }
    };

    carregarSensores();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'latitude' || name === 'longitude' ? parseFloat(value) : value });
  };

  const handleSelectChange = (selectedOptions: any) => {
    const selectedIds = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
    setFormData({ ...formData, id_sensores: selectedIds });    
    const sensoresSelecionados = sensores.filter(sensor => selectedIds.includes(sensor.id));
    setSensoresSelecionados(sensoresSelecionados);
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
        
        const estacaoId = responseEstacao.data.id;
        for (const sensorId of formData.id_sensores) {
          await adicionarSensor(estacaoId, sensorId);
        }

        setFormData({
          nome: '',
          endereco: '',
          latitude: 0,
          longitude: 0,
          mac_address: '',
          id_sensores: [],
        });
        setSensoresSelecionados([]); 
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

  const sensorOptions = sensores.map(sensor => ({
    value: sensor.id,
    label: sensor.nome
  }));

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
              <div className="form-group">
                <label className="text-wrapper">Sensores</label>
                <Select
                  isMulti
                  name="id_sensor"
                  options={sensorOptions}
                  className="basic-select"
                  classNamePrefix="select"
                  onChange={handleSelectChange}
                  value={sensorOptions.filter(option => formData.id_sensores.includes(option.value))}
                />
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