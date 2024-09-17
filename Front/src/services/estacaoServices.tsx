import axios from 'axios';
import { CadastrarEstacao } from '../types/Estacao'; // Importe a interface

const API_URL = 'http://localhost:3000/estacao'; 

export const cadastrarEstacao = async (estacaoData: CadastrarEstacao) => { 
  try {
    const response = await axios.post(`${API_URL}/cadastrar`, estacaoData);
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

