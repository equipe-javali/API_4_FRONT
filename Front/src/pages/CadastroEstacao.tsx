import React, { useState } from "react";
import "./css/Estacoes.css";
import { cadastrarEstacao } from '../services/estacaoServices';
import { CadastrarEstacao } from '../types/Estacao'; 

export const CadastroEstacao = () => {
  const [formData, setFormData] = useState<CadastrarEstacao>({ 
    nome: '',
    endereco: '', 
    latitude: 0, 
    longitude: 0, 
    mac_address: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { 
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'latitude' || name === 'longitude' ? parseFloat(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    try {
      const response = await cadastrarEstacao(formData);
      console.log('Sucesso:', response);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <div className="cadastro-estacao">
      <div className="container">
        <h1 className="text-wrapper-titulo">Cadastrar Estação</h1>
        <form onSubmit={handleSubmit}>  
          <div className="content">          
            <div className="form">
              <div className="form-group">
                <label className="text-wrapper">Nome</label>
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
                <label className="text-wrapper">MAC adress UID</label>
                <input 
                  type="text" 
                  className="input" 
                  placeholder="Digite o MAC adress UID..." 
                  name="mac_address" 
                  value={formData.mac_address} 
                  onChange={handleChange} 
                />
              </div>
              <div className="form-group">
                <label className="text-wrapper">Parâmetros</label>
                <select 
                  className="input" 
                  name="parametros"  
                  value={formData.parametros} 
                  onChange={handleChange} 
                >
                  <option>Opção 1</option>
                  <option>Opção 2</option>
                </select>
              </div>
              <div className="form-group">
                <label className="text-wrapper">Localização</label>
                <input 
                  type="text" 
                  className="input" 
                  placeholder="Digite a localização e/ou ponto de referência..." 
                  name="endereco" 
                  value={formData.endereco} 
                  onChange={handleChange} 
                />
              </div>
              <div className="form-group">
                <label className="text-wrapper">Latitude</label>
                <input 
                  type="text" 
                  className="input" 
                  placeholder="Latitude" 
                  name="latitude" 
                  value={formData.latitude} 
                  onChange={handleChange} 
                />
              </div>
              <div className="form-group">
                <label className="text-wrapper">Longitude</label>
                <input 
                  type="text" 
                  className="input" 
                  placeholder="Longitude" 
                  name="longitude" 
                  value={formData.longitude} 
                  onChange={handleChange} 
                />
              </div>
            </div>
              <div className="foto-container">
                <div className="foto" />
                <label className="text-wrapper">Foto</label>
              </div>
            </div>            

            <h2 className="text-wrapper">Cadastrar alerta</h2>
            <div className="form-group">
              <label className="text-wrapper">Nome</label>
              <input type="text" className="input" placeholder="Nome" />
            </div>
            <div className="form-group">
              <label className="text-wrapper">Condição</label>
              <input type="text" className="input" placeholder="Condição" />
            </div>
            <div className="form-group">
              <label className="text-wrapper">Valor</label>
              <input type="text" className="input" placeholder="Valor" />
            </div>
            <div className="form-group">
              <button className="button" type="submit">Salvar</button> 
            </div>
          </form> 
        </div>
      </div>    
  );
};