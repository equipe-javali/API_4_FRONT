import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CadastroAdm.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface FormData {
  nome: string;
  email: string;
  senha: string;
}

export const CadastroAdm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ nome: '', email: '', senha: '' });
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(process.env)
    e.preventDefault();
    try {

      const response = await axios.post(`http://34.204.31.143:3001/usuario/cadastrar`, formData);

      if (response.data && response.data.errors && response.data.errors.length > 0) {
        console.error('Erro na resposta da API:', response.data.errors);
        setMensagem("Erro ao cadastrar usuário: " + response.data.errors.join(", "));
      } else {
        console.log('Sucesso:', response.data);
        setMensagem("Usuário cadastrado com sucesso!");
        setFormData({
          nome: '',
          email: '',
          senha: '',
        });
      }
    } catch (error) {
      console.error('Erro:', error);
      setMensagem("Erro ao cadastrar Usuário. Verifique os dados e tente novamente.");
    }
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    if (mensagem) {
      timeoutId = setTimeout(() => {
        setMensagem(null);
      }, 5000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [mensagem]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="cadastro-adm">
      <div className="cadastro-adm-container">
        <h1 className="text-wrapper-titulo">Cadastrar Usuário</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Nome</label>
            <input
              type="text"
              className="input"
              placeholder="Digite o nome..."
              name="nome"
              value={formData.nome}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="Digite o email..."
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="label">Senha</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                className="input"
                placeholder="Digite a senha..."
                name="senha"
                value={formData.senha}
                onChange={handleChange}
              />
              <button type="button" className="toggle-password" onClick={toggleShowPassword}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className="form-group">
            <button className="button" type="submit">Cadastrar</button>
            {mensagem && <div className={mensagem.includes("Erro") ? "error-message" : "success-message"}>{mensagem}</div>}
          </div>
        </form>

        <p className="footer-text">
          Já possui cadastro? <a href="/login">Entre aqui!</a>
        </p>
      </div>
    </div>
  );
};

export default CadastroAdm;