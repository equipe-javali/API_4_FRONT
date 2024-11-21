import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import AlertView from '../components/AlertView';
import { listarOcorrencia } from '../services/ocorrenciaServices';
import { listarAlertas } from '../services/alertaServices';
import { listarEstacoes } from '../services/estacaoServices';

// Mocking axios
const mock = new MockAdapter(axios);

// Mocking the services
jest.mock('../services/ocorrenciaServices', () => ({
  listarOcorrencia: jest.fn(),
}));

jest.mock('../services/alertaServices', () => ({
  listarAlertas: jest.fn(),
}));

jest.mock('../services/estacaoServices', () => ({
  listarEstacoes: jest.fn(() => Promise.resolve({ data: { rows: [] } })),
}));

describe('AlertView', () => {
  beforeAll(() => {
    process.env.REACT_APP_API_BACK = 'http://localhost:3001';
  });

  afterEach(() => {
    mock.reset();
  });

  test('deve renderizar ocorrências, alertas e estações corretamente', async () => {
    const mockOcorrencias = {
      data: {
        rows: [
          { id: 1, id_alerta: 1, valor: 10 },
          { id: 2, id_alerta: 2, valor: 20 }
        ]
      }
    };
    const mockAlertas = {
      data: {
        rows: [
          { id: 1, nome: 'Alerta 1', id_estacao: 1 },
          { id: 2, nome: 'Alerta 2', id_estacao: 2 }
        ]
      }
    };
    const mockEstacoes = {
      data: {
        rows: [
          { id: 1, nome: 'Estação 1' },
          { id: 2, nome: 'Estação 2' }
        ]
      }
    };

    (listarOcorrencia as jest.Mock).mockResolvedValue(mockOcorrencias);
    (listarAlertas as jest.Mock).mockResolvedValue(mockAlertas);
    (listarEstacoes as jest.Mock).mockResolvedValue(mockEstacoes);

    render(<AlertView />);

    await waitFor(() => {
      expect(screen.getByText('📢 Estação 1 : Alerta 1 10')).toBeInTheDocument();
      expect(screen.getByText('📢 Estação 2 : Alerta 2 20')).toBeInTheDocument();
    });
  });

  test('deve lidar com erro na resposta da API', async () => {
    (listarOcorrencia as jest.Mock).mockRejectedValue(new Error('Erro ao buscar dados'));
    (listarAlertas as jest.Mock).mockRejectedValue(new Error('Erro ao buscar dados'));
    (listarEstacoes as jest.Mock).mockRejectedValue(new Error('Erro ao buscar dados'));

    render(<AlertView />);

    await waitFor(() => {
      const errorMessage = screen.getByTestId('error-message');
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveTextContent('Erro ao buscar dados');
    });
  });
});