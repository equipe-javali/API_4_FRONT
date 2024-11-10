import axios from 'axios';
import { IArquivo, IFiltroRelatorios, IRelatorios } from '../types/Relatorios';

const API_URL = `${process.env.REACT_APP_API_BACK}/relatorio`;

export const fetchRelatorios = async (filtroData: IFiltroRelatorios, token: string): Promise<IRelatorios> => {
    try {
        const response = await axios.post<IRelatorios>(`${API_URL}/geral`, filtroData, {
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar relatórios:', error);
        throw error;
    }
};

export const fetchRelatoriosDownload = async (arquivoData: IArquivo, token: string) => {
    try {
        const response = await axios.post(`${API_URL}/download`, arquivoData, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                Authorization: `Bearer ${token}`
            },

            responseType: 'blob'
        });

        return response.data;
        
    } catch (error) {
        console.error('Erro ao buscar relatórios:', error);
        if (axios.isAxiosError(error) && error.response) {
            console.error("Detalhes do erro:", error.response.data);
        }
        throw error;
    }
};