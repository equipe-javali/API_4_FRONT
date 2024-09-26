import axios from 'axios';
import { cadastrarAdministrador, Perfil } from '../types/Administrador'; 
import { Login } from '../types/Administrador';

const API_URL = 'http://localhost:3000/usuario'; 

export const cadastrarAdm = async (usuarioData: cadastrarAdministrador) => { 
  try {
    const response = await axios.post(`${API_URL}/cadastrar`, usuarioData);
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

export const login = async (usuarioData: Login) => { 
  try {
    const response = await axios.post(`${API_URL}/login`, usuarioData);
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

export const ListarUsuario = async (perfilData: Perfil) => { 
  try {
    const response = await axios.post(`${API_URL}/{usuarioId}`, perfilData);
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

export const editarUsuario = async (perfilData: Perfil) => { 
  try {
    const response = await axios.put(`${API_URL}/atualizar`, perfilData);
    return response.data; 
  } catch (error) {
    throw error; 
  }
};
