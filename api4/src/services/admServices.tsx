import axios from 'axios';
import { CadastrarAdministrador, Perfil, Login } from '../types/Administrador';

// `${process.env.REACT_APP_API_BACK}/usuario
const API_URL = `${process.env.REACT_APP_API_BACK}/usuario`; 

export const cadastrarAdm = async (usuarioData: CadastrarAdministrador) => { 
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
