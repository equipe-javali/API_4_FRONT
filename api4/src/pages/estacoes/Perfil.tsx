import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import './css/Perfil.css';

const Perfil: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [editable, setEditable] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); 
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (field: string, value: string) => {
    setUserData({ ...userData, [field]: value });
  };

  const handleEdit = () => {
    setEditable(true);
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        id: userData.id,
        nome: userData.nome,
        email: userData.email,
        senha: userData.senha
      };

      const response = await axios.patch(`http://localhost:3001/usuario/atualizar`, updatedData);

      if (response.status === 200) {
        setEditable(false); 
        setSuccessMessage('Alterações salvas com sucesso!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setErrorMessage('Erro ao salvar as alterações.');
      }
    } catch (error) {
      setErrorMessage('Erro ao salvar as alterações.');
    }
  };

  const handleCancel = () => {
    setEditable(false);
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`http://localhost:3001/usuario/deletar`, {
        data: { id: userData.id }
      });
      console.log('Conta deletada com sucesso!');
      navigate('/login');
    } catch (error) {
      setErrorMessage('Erro ao deletar a conta.');
      console.error('Erro ao deletar a conta:', error);
    }
  };

  const confirmDeleteAccount = () => {
    setShowDeleteConfirmation(true); 
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false); 
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
        const response = await axios.get(`http://localhost:3001/usuario/${usuarioId}`);
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
      <h2>{userData.nome}</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="perfil-info">
        <p>
          <strong>Nome:</strong>
          <input
            type="text"
            value={userData.nome}
            readOnly={!editable}
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
        <div className="button-group-1">
          <button onClick={handleSave} className="save-button">Salvar</button>
          {successMessage && <div className="success-message">{successMessage}</div>}
          <button onClick={handleCancel} className="cancel-button">Cancelar</button>
        </div>
      ) : (
        <div className="button-group">
          <button onClick={handleEdit} className="edit-button">Editar</button>
          <button onClick={confirmDeleteAccount} className="delete-button">Deletar Conta</button>
        </div>        
      )}

      {/* Modal de confirmação para deletar a conta */}
      {showDeleteConfirmation && (
        <div className="modal">
          <div className="modal-content">
            <p>Tem certeza que deseja apagar a conta?</p>
            <div className="modal-buttons">
              <button onClick={handleDeleteAccount} className="confirm-button">Sim</button>
              <button onClick={cancelDelete} className="cancel-button">Não</button>
            </div>
          </div>
        </div>
      )}

      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
};

export default Perfil;
