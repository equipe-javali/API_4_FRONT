import axios from 'axios';
import { IRelatorios } from '../types/Relatorios';

// URL base da API
const API_URL = `${process.env.REACT_APP_API_BACK}/relatorio`; 

// Função para buscar relatórios
export const fetchRelatorios = async (): Promise<IRelatorios> => {
    try {
        const response = await axios.post<IRelatorios>(`${API_URL}/geral`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar relatórios:', error);
        throw error;
    }
};

// Função para buscar um relatório específico
export const fetchRelatoriosDownload = async (): Promise<IRelatorios> => {
    try {
        const response = await axios.post<IRelatorios>(`${API_URL}/download`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar relatórios:', error);
        throw error;
    }
};