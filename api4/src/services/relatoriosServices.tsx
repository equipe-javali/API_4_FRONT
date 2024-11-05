import axios from 'axios';// Ajuste o caminho conforme necessário
import { Relatorios } from '../types/Relatorios';

// URL base da API
const API_URL = `${process.env.REACT_APP_API_BACK}/relatorio`; 

// Função para buscar relatórios
export const fetchRelatorios = async (): Promise<Relatorios> => {
    try {
        const response = await axios.get<Relatorios>(`${API_URL}/relatorios`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar relatórios:', error);
        throw error;
    }
};

// Função para buscar um relatório específico
export const fetchRelatorioById = async (id: string): Promise<Relatorios> => {
    try {
        const response = await axios.get<Relatorios>(`${API_URL}/relatorios/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar relatório:', error);
        throw error;
    }
};

// Função para criar um novo relatório
export const createRelatorio = async (relatorio: Relatorios): Promise<Relatorios> => {
    try {
        const response = await axios.post<Relatorios>(`${API_URL}/relatorios`, relatorio);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar relatório:', error);
        throw error;
    }
};

// Função para atualizar um relatório existente
export const updateRelatorio = async (id: string, relatorio: Relatorios): Promise<Relatorios> => {
    try {
        const response = await axios.put<Relatorios>(`${API_URL}/relatorios/${id}`, relatorio);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar relatório:', error);
        throw error;
    }
};

// Função para deletar um relatório
export const deleteRelatorio = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/relatorios/${id}`);
    } catch (error) {
        console.error('Erro ao deletar relatório:', error);
        throw error;
    }
};