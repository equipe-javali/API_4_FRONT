import axios from 'axios';

const API_URL = 'http://localhost:3001/unidademedida';

export const listarUnidades = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; 
  } catch (error) {
    throw error;
  }
};
