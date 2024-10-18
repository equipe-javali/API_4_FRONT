import axios from "axios";

const API_URL = 'http://localhost:3001/ocorrencia'; 

export const listarOcorrencia = async () => {
    try {
        const response = await axios.get(`${API_URL}/1`);
        return response.data
    } catch (err) {
        throw err
    }
}