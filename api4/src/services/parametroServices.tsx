import axios from 'axios';
import { Parametro } from '../types/Parametro';

const API_URL = 'http://localhost:3000/parametro'; // URL base da API

// Função para cadastrar um novo parâmetro
export const cadastrarParametro = async (parametroData: Parametro) => { 
  try {
    const response = await axios.post(`${API_URL}/cadastrar`, parametroData);
    return response.data; 
  } catch (error) {
    console.error('Erro ao cadastrar parâmetro:', error);
    throw error; 
  }
};

// Função para listar parâmetros com paginação
export const listarParametros = async (quantidade: number = 10, pagina: number = 0) => { 
  try {
    const response = await axios.get(`${API_URL}/${quantidade}/${pagina}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao listar parâmetros:', error);
    throw error;
  }
};

// Função para deletar um parâmetro pelo seu ID
export const deletarParametro = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/excluir/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao excluir o parâmetro de id ${id}:`, error);
    throw error;
  }
};
