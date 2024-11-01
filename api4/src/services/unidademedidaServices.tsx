import axios from "axios";

// `${process.env.REACT_APP_API_BACK}/
const API_URL = `${process.env.REACT_APP_API_BACK}/unidademedida`; 

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
