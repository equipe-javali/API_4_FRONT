import axios from 'axios';
import { CadastrarParametro } from '../types/Parametro'; 

const API_URL = 'http://localhost:3000/parametro'; 

export const cadastrarParametro = async (parametroData: CadastrarParametro) => { 
  try {
    const response = await axios.post(`${API_URL}/cadastrar`, parametroData);
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

