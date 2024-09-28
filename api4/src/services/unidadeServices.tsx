import axios from 'axios';

const API_URL = 'http://localhost:3001/unidademedida';

export const listarUnidades = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Supondo que a resposta seja um array de unidades
  } catch (error) {
    throw error;
  }
};
