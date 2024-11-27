// src/tests/CadastroEstacao.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CadastroEstacao } from '../pages/estacoes/CadastroEstacao';
import { cadastrarEstacao } from '../services/estacaoServices';
import { listarSensores } from '../services/sensorServices';

jest.mock('../services/estacaoServices');
jest.mock('../services/sensorServices');

describe('CadastroEstacao', () => {
  const mockEstacao = {
    nome: 'Estação Teste',
    latitude: -23.5505,
    longitude: -46.6333,
    sensores: [1, 2]
  };

  test('deve cadastrar uma estação com sucesso', async () => {
    (cadastrarEstacao as jest.Mock).mockResolvedValue({ data: mockEstacao });
    (listarSensores as jest.Mock).mockResolvedValue({ 
      data: { 
        rows: [
          { id: 1, nome: 'Sensor 1' },
          { id: 2, nome: 'Sensor 2' }
        ] 
      } 
    });

    render(<CadastroEstacao />);

    fireEvent.change(screen.getByLabelText(/nome/i), {
      target: { value: mockEstacao.nome }
    });
    fireEvent.change(screen.getByLabelText(/latitude/i), {
      target: { value: mockEstacao.latitude }
    });
    fireEvent.change(screen.getByLabelText(/longitude/i), {
      target: { value: mockEstacao.longitude }
    });

    fireEvent.click(screen.getByText(/cadastrar/i));

    await waitFor(() => {
      expect(cadastrarEstacao).toHaveBeenCalledWith(expect.objectContaining(mockEstacao));
      expect(screen.getByText(/estação cadastrada com sucesso/i)).toBeInTheDocument();
    });
  });
});