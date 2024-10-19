import axios from 'axios';
import { Estacao } from '../types/Estacao'; 

const API_URL = 'http://localhost:3001/estacao'; 

export const cadastrarEstacao = async (estacaoData: Estacao, token: string) => { 
  try {
    const response = await axios.post(`${API_URL}/cadastrar`, estacaoData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

export const listarEstacoes = async (quantidade: number = 10, pagina: number = 0) => { 
  try {
    const response = await axios.get(`${API_URL}/${quantidade}/${pagina}`); 
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

export const buscarEstacaoPorId = async (id: string) => { 
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

export const editarEstacao = async (estacaoData: Estacao, token: string) => { 
  try {
    const response = await axios.patch(`${API_URL}/atualizar`, estacaoData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

export const deletarEstacao = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/deletar`, {
      data: { id } 
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar estação:', error);
    throw error;
  }
};

export const adicionarSensor = async (id_estacao: number, id_sensor: number, token: string) => {
  try {
    const response = await axios.post(`${API_URL}/adicionarSensor`, { id_estacao, id_sensor }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removerSensor = async (estacaoId: number, sensorId: number, token: string) => { 
  try {
    const response = await axios.delete(`${API_URL}/${estacaoId}/removerSensor/${sensorId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data; 
  } catch (error) {
    throw error; 
  }
};