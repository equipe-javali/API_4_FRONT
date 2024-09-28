import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import './css/Perfil.css';

const Perfil: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [editable, setEditable] = useState(false);  // Estado para controlar edição
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Estado para mensagem de sucesso
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (field: string, value: string) => {
    setUserData({ ...userData, [field]: value });
  };

  const handleEdit = () => {
    setEditable(true);  // Torna os campos editáveis
  };

  const handleSave = async () => {
    try {
      // Monta o JSON de acordo com o backend
      const updatedData = {
        id: userData.id,
        nome: userData.nome,
        email: userData.email,
        senha: userData.senha
      };

      // Requisição PATCH para salvar os dados editados
      const response = await axios.patch(`http://localhost:3000/usuario/atualizar`, updatedData);

      if (response.status === 200) {
        setEditable(false); // Volta para o modo não editável
        setSuccessMessage('Alterações salvas com sucesso!');
        setTimeout(() => setSuccessMessage(''), 3000); // Limpa a mensagem após 3 segundos
      } else {
        setErrorMessage('Erro ao salvar as alterações.');
      }
    } catch (error) {
      setErrorMessage('Erro ao salvar as alterações.');
    }
  };

  const handleCancel = () => {
    setEditable(false);  // Cancela a edição e retorna ao modo read-only
  };

  useEffect(() => {
    const usuarioId = localStorage.getItem('usuarioId');
    const usuarioSenha = localStorage.getItem('usuarioSenha');

    if (!usuarioId) {
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/usuario/${usuarioId}`);
        if (response.status === 200) {
          setUserData({ ...response.data.data, senha: usuarioSenha });
        } else {
          setErrorMessage('Erro ao carregar os dados do perfil.');
        }
      } catch (error) {
        setErrorMessage('Erro ao carregar os dados do perfil.');
      }
    };

    fetchUserData();
  }, [navigate]);

  if (!userData) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="perfil-container">
      <h2> {userData.nome}</h2> {/* Nome do usuário no título */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="perfil-info">
        <p>
          <strong>Nome:</strong>
          <input
            type="text"
            value={userData.nome}
            readOnly={!editable}  // Editável apenas quando `editable` for true
            onChange={(e) => handleInputChange('nome', e.target.value)}
          />
        </p>
        <p>
          <strong>Email:</strong>
          <input
            type="email"
            value={userData.email}
            readOnly={!editable}  
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
        </p>
        <p>
          <strong>Senha:</strong>
          <input
            type={showPassword ? 'text' : 'password'}
            value={userData.senha}
            readOnly={!editable}  
            onChange={(e) => handleInputChange('senha', e.target.value)}
          />
          <button onClick={togglePasswordVisibility} className="toggle-password">
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </p>
      </div>
      {editable ? (
        <div className="button-group">
          <button onClick={handleSave} className="save-button">Salvar</button>
          {successMessage && <div className="success-message">{successMessage}</div>}
          <button onClick={handleCancel} className="cancel-button">Cancelar</button>
        </div>
      ) : (
        <button onClick={handleEdit} className="edit-button">Editar</button>
      )}
      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
};

export default Perfil;
