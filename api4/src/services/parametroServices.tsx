import axios from 'axios';
import { Parametro } from '../types/Parametro';

// `${process.env.REACT_APP_API_BACK}/
const API_URL = `${process.env.REACT_APP_API_BACK}/parametro`; 

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

export const listarParametros = async (quantidade: number = 200, pagina: number = 0) => { 
  try {
    const response = await axios.get(`${API_URL}/${quantidade}/${pagina}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao listar parâmetros:', error);
    throw error;
  }
};

export const deletarParametro = async (id: number, token: string) => {
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



