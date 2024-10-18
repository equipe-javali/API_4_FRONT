import axios from "axios";

const API_URL = 'http://localhost:3001/ocorrencia'; 

export const listarOcorrencia = async (quantidade: number = 10, paginas: number = 0) => {
    try {
        const response = await axios.get(`${API_URL}/${quantidade}/${paginas}`);
        return response.data
    } catch (err) {
        throw err
    }
}