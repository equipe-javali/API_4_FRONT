import { render, screen, waitFor } from '@testing-library/react';
import { ListaSensores } from '../pages/Sensores/ListaSensores';
import { listarSensores, deletarSensor } from '../services/sensorServices';
import { listarParametros } from '../services/parametroServices';

jest.mock('../services/sensorServices');
jest.mock('../services/parametroServices');

describe('ListaSensores', () => {
  const mockSensores = {
    data: {
      rows: [
        { id: 1, nome: 'Sensor 1', id_parametro: 1 },
        { id: 2, nome: 'Sensor 2', id_parametro: 2 }
      ]
    }
  };

  const mockParametros = {
    data: {
      rows: [
        { id: 1, nome: 'Temperatura' },
        { id: 2, nome: 'Umidade' }
      ]
    }
  };

  beforeEach(() => {
    localStorage.setItem('token', 'fake-token');
  });

  test('deve listar sensores corretamente', async () => {
    (listarSensores as jest.Mock).mockResolvedValue(mockSensores);
    (listarParametros as jest.Mock).mockResolvedValue(mockParametros);

    render(<ListaSensores />);

    await waitFor(() => {
      expect(screen.getByText('Sensor 1')).toBeInTheDocument();
      expect(screen.getByText('Sensor 2')).toBeInTheDocument();
      expect(screen.getByText('Temperatura')).toBeInTheDocument();
      expect(screen.getByText('Umidade')).toBeInTheDocument();
    });
  });

  test('deve mostrar mensagem quando não houver token', async () => {
    localStorage.removeItem('token');
    render(<ListaSensores />);

    expect(screen.getByText(/você precisa estar logado/i)).toBeInTheDocument();
  });
});