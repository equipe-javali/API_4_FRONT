import React, { useEffect, useState } from "react";
import { cadastrarSensor } from '../../services/sensorServices';
import "./css/CadastraSensor.css";
import Sensor from '../../types/Sensor';
import { listarParametros } from '../../services/parametroServices'; 
import { Parametro } from '../../types/Parametro'; 

export function CadastroSensor() {
  const [formData, setFormData] = useState<Sensor>({
    nome: '',
    id_parametro: 0,
  });  

  const [parametros, setParametros] = useState<Parametro[]>([]);
  const [mensagem, setMensagem] = useState<string | null>(null);

  useEffect(() => {
    const carregarParametros = async () => {
      try {
        const response = await listarParametros();
        if (Array.isArray(response)) {
          setParametros(response);
        } else {
          console.error('Resposta da API não é um array:', response);
        }
      } catch (error) {
        console.error('Erro ao carregar parâmetros:', error);
      }
    };

    carregarParametros();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitSensor = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const responseSensor = await cadastrarSensor(formData);

      if (responseSensor.errors && responseSensor.errors.length > 0) {
        console.error('Erro na resposta da API:', responseSensor.errors);
        setMensagem("Erro ao cadastrar sensor: " + responseSensor.errors.join(", "));
      } else {
        console.log('Sucesso:', responseSensor);
        setMensagem("Sensor cadastrado com sucesso!");
        setFormData({
          nome: '',
          id_parametro: 0,            
        });
      }
    } catch (error) {
      console.error('Erro:', error);
      setMensagem("Erro ao cadastrar sensor. Verifique os dados e tente novamente.");
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

  return (
    <div className="cadastro-sensor">
      <div className="container">
        <h2 className="text-wrapper-titulo">Cadastrar Sensor</h2>

        <form onSubmit={handleSubmitSensor}>
          <div className="content">            
            <div className="form">
              <div className="form-group">
                <label className="text-wrapper">Nome</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Digite o nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="text-wrapper">Parâmetros</label>
                <select
                  className="input"
                  name="id_parametro"
                  value={formData.id_parametro}
                  onChange={handleChange}
                >
                  {Array.isArray(parametros) && parametros.map((parametro) => (
                    <option key={parametro.id} value={parametro.id}>{parametro.nome}</option>
                  ))}
                </select>
              </div>  
              <div className="form-group">
                <button className="button" type="submit">Salvar</button>
                {mensagem && <div className={mensagem.includes("Erro") ? "error-message" : "success-message"}>{mensagem}</div>}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}