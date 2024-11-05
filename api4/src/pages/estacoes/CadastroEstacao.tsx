import React, { useEffect, useState, useRef } from "react";
import Select from 'react-select';
import { cadastrarEstacao, adicionarSensor } from "../../services/estacaoServices";
import { Estacao } from '../../types/Estacao';
import "./css/CadastraEstacoes.css";
import { listarSensores } from '../../services/sensorServices'; 
import { useNavigate } from "react-router-dom"; // Para redirecionar o usuário
import L from 'leaflet'; // Importando o Leaflet

// Função para buscar as coordenadas a partir do nome do local (geocodificação)
const buscarCoordenadasPorEndereco = async (endereco: string) => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`;
  const response = await fetch(url);
  const data = await response.json();
  if (data && data[0]) {
    return {
      latitude: parseFloat(data[0].lat),
      longitude: parseFloat(data[0].lon),
    };
  }
  return null;
};

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
  const navigate = useNavigate(); // Para redirecionar

  const mapRef = useRef<HTMLDivElement>(null); // Ref para o mapa
  const mapInstanceRef = useRef<L.Map | null>(null); // Ref para a instância do mapa
  const markerRef = useRef<L.Marker | null>(null); // Ref para o marcador

  // Verificação do token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMensagem("Você precisa estar logado para cadastrar uma estação.");
      console.log("Token não encontrado. Redirecionando...");
      navigate('/login'); // Redireciona para a página de login
      return;
    }
    console.log("Token encontrado:", token);
  }, [navigate]);

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
      const token = localStorage.getItem('token');
      if (!token) {
        setMensagem("Erro: Token não encontrado. Faça login novamente.");
        return;
      }
      const responseEstacao = await cadastrarEstacao(formData, token);
      if (responseEstacao.errors && responseEstacao.errors.length > 0) {
        console.error('Erro na resposta da API:', responseEstacao.errors);
        setMensagem("Erro ao cadastrar estação: " + responseEstacao.errors.join(", "));
      } else {
        console.log('Sucesso:', responseEstacao);
        setMensagem("Estação cadastrada com sucesso!");
        
        const estacaoId = responseEstacao.data.id;
        for (const sensorId of formData.id_sensores) {
          await adicionarSensor(estacaoId, sensorId, token);
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

  // Função para inicializar o mapa
  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      const map = L.map(mapRef.current).setView([formData.latitude, formData.longitude], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Salva a instância do mapa
      mapInstanceRef.current = map;

      // Cria um marcador no mapa, com a opção de ser arrastável
      markerRef.current = L.marker([formData.latitude, formData.longitude], { draggable: true }).addTo(map);

      // Atualiza as coordenadas ao clicar no mapa
      map.on('click', (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        setFormData({
          ...formData,
          latitude: lat,
          longitude: lng
        });

        // Move o marcador para a nova posição
        markerRef.current?.setLatLng([lat, lng]);
      });

      // Atualiza as coordenadas quando o marcador for arrastado
      markerRef.current.on('dragend', () => {
        const { lat, lng } = markerRef.current!.getLatLng();
        setFormData({
          ...formData,
          latitude: lat,
          longitude: lng
        });
      });
    }
  }, [formData.latitude, formData.longitude]);

  // Função para lidar com a perda de foco do campo "Localização"
  const handleBlurLocalizacao = async () => {
    const coordenadas = await buscarCoordenadasPorEndereco(formData.endereco);
    if (coordenadas) {
      setFormData({
        ...formData,
        latitude: coordenadas.latitude,
        longitude: coordenadas.longitude
      });
      if (markerRef.current) {
        markerRef.current.setLatLng([coordenadas.latitude, coordenadas.longitude]);
        mapInstanceRef.current?.setView([coordenadas.latitude, coordenadas.longitude], 13);
      }
    } else {
      setMensagem("Localização não encontrada.");
    }
  };

  const handleBlur = () => {
    // Quando o campo de latitude ou longitude perde o foco, atualiza o mapa
    if (markerRef.current) {
      markerRef.current.setLatLng([formData.latitude, formData.longitude]);
      mapInstanceRef.current?.setView([formData.latitude, formData.longitude], 13);
    }
  };

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
                  onChange={handleChange}
                  onBlur={handleBlurLocalizacao} />
              </div>
              <div className="form-group">
                <label className="text-wrapper">Latitude</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Latitude"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  onBlur={handleBlur} />
              </div>
              <div className="form-group">
                <label className="text-wrapper">Longitude</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Longitude"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  onBlur={handleBlur} />
              </div>

              {/* Exibir o mapa interativo */}
              <div className="form-group">
                <div ref={mapRef} style={{ width: '100%', height: '200px' }} />
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
                  value={sensorOptions.filter(option => formData.id_sensores.includes(option.value))} />
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
