import axios from 'axios';
import { Parametro } from '../types/Parametro'; 

const API_URL = 'http://localhost:3000/parametro'; 

export const cadastrarParametro = async (parametroData: Parametro) => { 
  try {
    const response = await axios.post(`${API_URL}/cadastrar`, parametroData);
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
