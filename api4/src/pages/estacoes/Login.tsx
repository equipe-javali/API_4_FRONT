import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/Login.css";

import axiosJWT from "../../services/axiosJWT";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', senha: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {      
      const response = await axiosJWT.post('http://localhost:3001/usuario/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        
        const { id, token } = response.data.data; 
        const { senha } = formData; 
        localStorage.setItem('usuarioId', id); 
        localStorage.setItem('token', token);
        localStorage.setItem('usuarioSenha', senha); 

        console.log('Login bem-sucedido:', response.data);
        
        navigate('/home');
      } else {
        setErrorMessage('Erro ao fazer login. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setErrorMessage('Erro ao fazer login. Por favor, tente novamente.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="login-form-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              required
            />
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button type="submit" className="login-button">Login</button>
        </form>
        <p className="footer-text">
          Ainda não possui cadastro? <a href="/cadastro">Cadastre-se aqui!</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
