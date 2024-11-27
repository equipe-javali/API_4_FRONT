import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../pages/login/Login';
import { login } from '../services/admServices';

jest.mock('../services/authService');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

describe('Login', () => {
  test('deve realizar login com sucesso', async () => {
    const mockResponse = {
      data: {
        token: 'fake-token',
        user: { id: 1, email: 'teste@teste.com' }
      }
    };

    (login as jest.Mock).mockResolvedValue(mockResponse);

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'teste@teste.com' }
    });
    fireEvent.change(screen.getByLabelText(/senha/i), {
      target: { value: '123456' }
    });

    fireEvent.click(screen.getByText(/entrar/i));

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('fake-token');
      expect(localStorage.getItem('usuarioId')).toBe('1');
    });
  });

  test('deve mostrar erro com credenciais inválidas', async () => {
    (login as jest.Mock).mockRejectedValue(new Error('Credenciais inválidas'));

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'invalido@teste.com' }
    });
    fireEvent.change(screen.getByLabelText(/senha/i), {
      target: { value: 'senha-errada' }
    });

    fireEvent.click(screen.getByText(/entrar/i));

    await waitFor(() => {
      expect(screen.getByText(/credenciais inválidas/i)).toBeInTheDocument();
    });
  });
});