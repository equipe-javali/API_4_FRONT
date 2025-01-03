import React, { useEffect, useState, useRef } from "react";
import Select from 'react-select';
import { useParams, useNavigate } from 'react-router-dom';
import { editarEstacao, buscarEstacaoPorId, adicionarSensor, removerSensor } from "../../services/estacaoServices";
import { Estacao } from '../../types/Estacao';
import "./css/CadastraEstacoes.css";
import { listarSensores } from '../../services/sensorServices'; 
import { ClipLoader } from "react-spinners";
import L from 'leaflet';  // Importando o Leaflet

export function EditaEstacao() {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Estacao | null>(null);
  const [sensores, setSensores] = useState<any[]>([]); 
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); 

  const mapRef = useRef<HTMLDivElement>(null); // Ref para o mapa
  const mapInstanceRef = useRef<L.Map | null>(null); // Ref para instância do mapa
  const markerRef = useRef<L.Marker | null>(null); // Ref para o marcador

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const responseSensores = await listarSensores();
        console.log('Sensores retornados:', responseSensores);  
        if (responseSensores.data && Array.isArray(responseSensores.data.rows)) {
          setSensores(responseSensores.data.rows);
        } else {
          console.error('Formato inesperado para sensores:', responseSensores);
        }

        if (id) {
          const responseEstacao = await buscarEstacaoPorId(id);
          console.log('Estação retornada:', responseEstacao);  
          if (responseEstacao.data && responseEstacao.data.rows && responseEstacao.data.rows.length > 0) {
            const estacao = responseEstacao.data.rows[0];
            setFormData({
              ...estacao,
              id_sensores: estacao.sensores ? estacao.sensores.map((sensor: any) => sensor.id) : [] 
            });
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

  useEffect(() => {
    if (formData && formData.latitude && formData.longitude && mapRef.current && !mapInstanceRef.current) {
      const map = L.map(mapRef.current).setView([formData.latitude, formData.longitude], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      mapInstanceRef.current = map;

      // Cria um marcador com a localização da estação
      markerRef.current = L.marker([formData.latitude, formData.longitude], { draggable: true }).addTo(map);

      // Atualiza a latitude e longitude quando o marcador for movido
      markerRef.current.on('dragend', () => {
        const { lat, lng } = markerRef.current!.getLatLng();
        setFormData(prevData => prevData ? { ...prevData, latitude: lat, longitude: lng } : prevData);
      });

      // Atualiza a latitude e longitude quando o mapa for clicado
      map.on('click', (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        setFormData(prevData => prevData ? { ...prevData, latitude: lat, longitude: lng } : prevData);
        markerRef.current?.setLatLng([lat, lng]);
      });
    }
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      const { name, value } = e.target;
      setFormData({ 
        ...formData, 
        [name]: name === 'latitude' || name === 'longitude' ? parseFloat(value) : value 
      });
    }
  };

  const handleSelectChange = (selectedOptions: any) => {
    if (formData) {
      const selectedIds = selectedOptions.map((option: any) => option.value);
      setFormData({ ...formData, id_sensores: selectedIds });
    }
  };

  const handleSubmitEstacao = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData && id) {
      try {
        const token = localStorage.getItem('token'); // Pegando o token do local storage
  
        if (!token) {
          setMensagem("Token não encontrado. Por favor, faça login novamente.");
          return;
        }
  
        const updatedData: Estacao = {
          ...formData,
          id: Number(id), 
        };
  
        const responseEstacao = await editarEstacao(updatedData, token);
  
        if (responseEstacao.errors && responseEstacao.errors.length > 0) {
          setMensagem("Erro ao atualizar estação: " + responseEstacao.errors.join(", "));
        } else {
          setMensagem("Estação atualizada com sucesso!");
  
          const estacaoId = parseInt(id, 10);
          const sensoresAntigos = formData.sensores ? formData.sensores.map(sensor => sensor.id) : [];
          const sensoresNovos = formData.id_sensores;          
          const sensoresParaRemover = sensoresAntigos.filter(sensorId => !sensoresNovos.includes(sensorId));
          for (const sensorId of sensoresParaRemover) {
            console.log(`Removendo sensor ${sensorId} da estação ${estacaoId}`);
            try {
              await removerSensor(estacaoId, sensorId, token);
            } catch (error) {
              console.error(`Erro ao remover sensor ${sensorId}:`, error);
            }
          }  
          
          const sensoresParaAdicionar = sensoresNovos.filter(sensorId => !sensoresAntigos.includes(sensorId));
          for (const sensorId of sensoresParaAdicionar) {
            console.log(`Adicionando sensor ${sensorId} à estação ${estacaoId}`);
            try {
              await adicionarSensor(estacaoId, sensorId, token); // Passando o token como terceiro argumento
            } catch (error) {
              console.error(`Erro ao adicionar sensor ${sensorId}:`, error);               
            }
          }
            
          setFormData(prevFormData => {
            if (!prevFormData) return prevFormData;
            return {
              ...prevFormData,
              sensores: sensores.filter(sensor => sensoresNovos.includes(sensor.id))
            };
          });
  
          navigate('/lista/estacoes');
        }
      } catch (error) {
        console.error('Erro ao atualizar estação:', error);
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
                <label className="text-wrapper">Mapa de Localização</label>
                <div className="map-container" style={{ height: "300px" }} ref={mapRef}></div>
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
