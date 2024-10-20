import axios from 'axios';
import { Parametro } from '../types/Parametro';

const API_URL = 'http://localhost:3001/parametro'; 

export const cadastrarParametro = async (parametroData: Parametro, token: string) => { 
  try {
    const response = await axios.post(`${API_URL}/cadastrar`, parametroData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data; 
  } catch (error) {
    console.error('Erro ao cadastrar parâmetro:', error);
    throw error; 
  }
};

export const listarParametros = async (quantidade: number = 10, pagina: number = 0) => { 
  try {
    const response = await axios.get(`${API_URL}/${quantidade}/${pagina}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao listar parâmetros:', error);
    throw error;
  }
};

export const deletarParametro = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/deletar/`, {
    data: { id }
    });
  return response.data;
  } catch (error) {
    console.error(`Erro ao excluir o parâmetro de id ${id}:`, error);
    throw error;
  }
};

export const editarParametro = async (parametroData: Parametro, token: string) => { 
  try {
    const response = await axios.patch(`${API_URL}/atualizar`, parametroData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data; 
  } catch (error) {
    throw error; 
  }
};


export const buscarParametroPorID = async (id: string) => { 
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data; 
  } catch (error) {
    throw error; 
  }
};



