import axios from 'axios';
import { Estacao } from '../types/Estacao'; 

// `${process.env.REACT_APP_API_BACK}/estacao
const API_URL = `${process.env.REACT_APP_API_BACK}/estacao`; 

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

export const listarEstacoes = async (quantidade: number = 200, pagina: number = 0) => { 
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

export const deletarEstacao = async (id: number, token: string) => {
  try {
    const response = await axios.delete(`${API_URL}/deletar`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: { id } 
    });
    return response.data;
  } catch (error) {
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
    const response = await axios.post(`${API_URL}/removerSensor`, { id_estacao: estacaoId, id_sensor: sensorId }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data; 
  } catch (error) {
    throw error; 
  }
};