import React from "react";
import "./css/Estacoes.css";

export const CadastroEstacao = () => {
    return (
        <div className="cadastro-estacao">
            <div className="container">
                <h1 className="text-wrapper-titulo">Cadastrar Estação</h1>
                <div className="content">
                    <div className="form">
                        <div className="form-group">
                            <label className="text-wrapper">Nome</label>
                            <input type="text" className="input" placeholder="Digite o nome..." />
                        </div>
                        <div className="form-group">
                            <label className="text-wrapper">MAC adress UID</label>
                            <input type="text" className="input" placeholder="Digite o MAC adress UID..." />
                        </div>
                        <div className="form-group">
                            <label className="text-wrapper">Parâmetros</label>
                            <select className="input">
                                <option>Opção 1</option>
                                <option>Opção 2</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="text-wrapper">Localização</label>
                            <input type="text" className="input" placeholder="Digite a localização e/ou ponto de referência..." />
                        </div>
                        <div className="form-group">
                            <label className="text-wrapper">Latitude</label>
                            <input type="text" className="input" placeholder="Latitude" />
                        </div>
                        <div className="form-group">
                            <label className="text-wrapper">Longitude</label>
                            <input type="text" className="input" placeholder="Longitude" />
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
                    <button className="button">Salvar</button>
                </div>
            </div>
        </div>
    );
};