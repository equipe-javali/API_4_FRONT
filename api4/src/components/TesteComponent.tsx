import React from 'react';
import apiJWT from '../services/axiosJWT';

const TesteComponent: React.FC = () => {
    const testarUnauthorized = async () => {
        try {
            await apiJWT.get('/teste/unauthorized');
        } catch (error) {
            console.error('Erro ao testar unauthorized:', error);
        }
    };

    const testarForbidden = async () => {
        try {
            await apiJWT.get('/teste/forbidden');
        } catch (error) {
            console.error('Erro ao testar forbidden:', error);
        }
    };

    return (
        <div>
            <button onClick={testarUnauthorized}>Testar Unauthorized (401)</button>
            <button onClick={testarForbidden}>Testar Forbidden (403)</button>
        </div>
    );
};

export default TesteComponent;