import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_BACK}/ocorrencia`; 

export const listarOcorrencia = async (quantidade: number = 200, paginas: number = 0) => {
    try {
        const response = await axios.get(`${API_URL}/${quantidade}/${paginas}`);
        return response.data
    } catch (err) {
        throw err
    }
}