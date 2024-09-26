import axios from 'axios';
import Sensor from '../types/Sensor';

const API_URL = 'http://localhost:3001/sensor'; 

export const cadastrarSensor = async (sensorData: Sensor) => { 
  try {
    const response = await axios.post(`${API_URL}/cadastrar`, sensorData);
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

export const listarSensores = async (quantidade: number = 10, pagina: number = 0) => { 
  try {
    const response = await axios.get(`${API_URL}/${quantidade}/${pagina}`); 
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

export const editarSensor = async (sensorData: Sensor) => { 
  try {
    const response = await axios.patch(`${API_URL}/atualizar`, sensorData);
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

export const deletarSensor = async (id: number) => { 
  try {
    const response = await axios.delete(`${API_URL}/deletar`, {
      data: { id }
    });
    return response.data; 
  } catch (error) {
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