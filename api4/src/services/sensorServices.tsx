import axios from 'axios';
import Sensor from '../types/Sensor';

const API_URL = `http://34.204.31.143:3001/sensor`; 

export const cadastrarSensor = async (sensorData: Sensor, token: string) => {
  try {
    const response = await axios.post(`${API_URL}/cadastrar`, sensorData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao cadastrar sensor:', error);
    throw error;
  }
};

export const listarSensores = async (quantidade: number = 200, pagina: number = 0) => { 
  try {
    const response = await axios.get(`${API_URL}/${quantidade}/${pagina}`); 
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

export const editarSensor = async (sensorData: Sensor, token: string) => { 
  try {
    const response = await axios.patch(`${API_URL}/atualizar`, sensorData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao cadastrar sensor:', error);
    throw error;
  }
};

export const deletarSensor = async (id: number) => { 
  const token = localStorage.getItem('token'); // Obtém o token do localStorage

  try {
    const response = await axios.delete(`${API_URL}/deletar`, {
      data: { id },
      headers: {
        Authorization: `Bearer ${token}` // Adiciona o token no cabeçalho
      }
    });
    return response.data; 
  } catch (error) {
    console.error('Erro ao deletar sensor:', error);
    throw error; 
  }
};

export const buscarSensorPorId = async (id: string) => { 
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data; 
  } catch (error) {
    throw error; 
  }
};