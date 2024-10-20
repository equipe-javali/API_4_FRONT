import axios from 'axios';
import Alerta from '../types/Alerta';

const API_URL = 'http://localhost:3001/alerta'; 

export const cadastrarAlerta = async (alertaData: Alerta, token: string) => { 
  try {
    const response = await axios.post(`${API_URL}/cadastrar`, alertaData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

export const listarAlertas = async (quantidade: number = 10, pagina: number = 0) => { 
  try {
    const response = await axios.get(`${API_URL}/${quantidade}/${pagina}`); 
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

export const editarAlerta = async (alertaData: Alerta, token: string) => { 
  try {
    const response = await axios.patch(`${API_URL}/atualizar`, alertaData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

export const deletarAlerta = async (id: number) => { 
  try {
    const response = await axios.delete(`${API_URL}/deletar`, {
      data: { id }
    });
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

export const buscarAlertaPorId = async (id: string) => { 
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data; 
  } catch (error) {
    throw error; 
  }
};