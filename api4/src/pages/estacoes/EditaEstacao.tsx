import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { useParams } from 'react-router-dom';
import { editarEstacao, buscarEstacaoPorId } from "../../services/estacaoServices";
import { Estacao } from '../../types/Estacao';
import "./css/CadastraEstacoes.css";
import { listarSensores } from '../../services/sensorServices'; 
import { ClipLoader } from "react-spinners";

export function EditaEstacao() {
  const { id } = useParams<{ id: string }>(); 
  const [formData, setFormData] = useState<Estacao | null>(null);
  const [sensores, setSensores] = useState<any[]>([]); 
  const [sensoresSelecionados, setSensoresSelecionados] = useState<any[]>([]); 
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const responseSensores = await listarSensores();
        if (responseSensores.data && Array.isArray(responseSensores.data.rows)) {
          setSensores(responseSensores.data.rows);
        } else {
          console.error('Resposta da API não é um array:', responseSensores);
        }

        if (id) {
          const responseEstacao = await buscarEstacaoPorId(id);
          if (responseEstacao && responseEstacao.data) {
            const estacao = responseEstacao.data.rows[0];
            setFormData({
              ...estacao,
              id_sensores: estacao.id_sensores || [] 
            });
            const sensoresSelecionados = estacao.id_sensores.map((sensorId: number) => 
              responseSensores.data.rows.find((sensor: any) => sensor.id === sensorId)
            ).filter((sensor: any) => sensor !== undefined);
            setSensoresSelecionados(sensoresSelecionados);
          } else {
            console.error('Erro ao buscar estação:', responseEstacao);
          }
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setIsLoading(false); 
      }
    };

    carregarDados();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (formData) {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: name === 'latitude' || name === 'longitude' ? parseFloat(value) : value });
    }
  };

  const handleSelectChange = (selectedOptions: any) => {
    if (formData) {
      const selectedIds = selectedOptions.map((option: any) => option.value);
      setFormData({ ...formData, id_sensores: selectedIds });

      // Atualizar os sensores selecionados
      const sensoresSelecionados = sensores.filter(sensor => selectedIds.includes(sensor.id));
      setSensoresSelecionados(sensoresSelecionados);
    }
  };

  const handleSubmitEstacao = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData) {
      try {
        const responseEstacao = await editarEstacao(formData);

        if (responseEstacao.errors && responseEstacao.errors.length > 0) {
          console.error('Erro na resposta da API:', responseEstacao.errors);
          setMensagem("Erro ao atualizar estação: " + responseEstacao.errors.join(", "));
        } else {
          console.log('Sucesso:', responseEstacao);
          setMensagem("Estação atualizada com sucesso!");
        }
      } catch (error) {
        console.error('Erro:', error);
        setMensagem("Erro ao atualizar estação. Verifique os dados e tente novamente.");
      }
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

  if (isLoading) {
    return (
      <div className="spinner-container">
        <ClipLoader size={50} color={"#123abc"} loading={isLoading} />
      </div>
    );
  }

  if (!formData) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="cadastro-estacao">
      <div className="container">
        <h2 className="text-wrapper-titulo">Estação ID {id}</h2>

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
                  name="id_sensores"
                  options={sensorOptions}
                  className="basic-multi-select"
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