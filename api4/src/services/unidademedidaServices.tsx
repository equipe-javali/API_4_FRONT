import axios from "axios";

const API_URL = 'http://localhost:3001/unidademedida'; 

export const obterUnidadePorId = async (unidadeId: number) => {
  try {
    const response = await axios.get(`${API_URL}/unidademedida/${unidadeId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const listarUnidades = async () => { 
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Erro ao listar unidades de medida:', error);
      throw error;
    }
  };
