import axios from 'axios';

const apiJWT = axios.create({
    baseURL: process.env.REACT_APP_API_BACK || 'http://localhost:3001', // Fallback para localhost
});

// Adiciona o token em todas as requisições feitas com esta instância
apiJWT.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor de resposta para tratamento de erros
apiJWT.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 401 || error.response.status === 403) {
                // Redireciona para a página de login se não autorizado
                window.location.href = '/login';
            }
            console.error('Erro na resposta da API:', error.response.data);
        }
        return Promise.reject(error);
    }
);

export default apiJWT;