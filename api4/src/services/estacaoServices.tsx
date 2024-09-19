import axios from 'axios';
import { Estacao } from '../types/Estacao'; 

const API_URL = 'http://localhost:3000/estacao'; 

export const cadastrarEstacao = async (estacaoData: Estacao) => { 
  try {
    const response = await axios.post(`${API_URL}/cadastrar`, estacaoData);
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

export const editarEstacao = async (estacaoData: Estacao) => { 
  try {
    const response = await axios.put(`${API_URL}/atualizar`, estacaoData);
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

export const deletarEstacao = async (id: number) => { 
  try {
    const response = await axios.delete(`${API_URL}/deletar/${id}`);
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

