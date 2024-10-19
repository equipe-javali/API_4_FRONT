import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { cadastrarSensor } from '../../services/sensorServices';
import "./css/CadastraSensor.css";
import Sensor from '../../types/Sensor';
import { listarParametros } from '../../services/parametroServices'; 
import { Parametro } from '../../types/Parametro'; 

export function CadastroSensor() {
  const [formData, setFormData] = useState<Sensor>({
    nome: '',
    id_parametro: 0,
    parametro: {
      nome: '',
      fator: 0,
      offset: 0,
      nome_json: '',
      unidade_medida: {
        id: 0
      }
    }
  });

  const [parametros, setParametros] = useState<Parametro[]>([]);
  const [mensagem, setMensagem] = useState<string | null>(null);

  useEffect(() => {
    const carregarParametros = async () => {
      try {
        const response = await listarParametros();
        if (response.data && Array.isArray(response.data.rows)) {
          setParametros(response.data.rows);
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

  const handleSelectChange = (selectedOption: any) => {
    setFormData({ ...formData, id_parametro: selectedOption ? selectedOption.value : 0 });
  };

  const handleSubmitSensor = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Obter o token do localStorage
    const token = localStorage.getItem('token'); 
    console.log('Token obtido:', token); // Verifica se o token foi obtido corretamente

    if (!token) {
      setMensagem("Erro: Você precisa estar logado para cadastrar um sensor.");
      return;
    }

    try {
      // Passa o token no cabeçalho da requisição
      console.log('FormData enviado:', formData); // Verifica os dados enviados
      const responseSensor = await cadastrarSensor(formData, token);
      console.log('Token enviado na requisição:', token); // Verifica se o token está sendo enviado corretamente

      if (responseSensor.errors && responseSensor.errors.length > 0) {
        console.error('Erro na resposta da API:', responseSensor.errors);
        setMensagem("Erro ao cadastrar sensor: " + responseSensor.errors.join(", "));
      } else {
        console.log('Sucesso:', responseSensor);
        setMensagem("Sensor cadastrado com sucesso!");
        setFormData({
          nome: '',
          id_parametro: 0,
          parametro: {
            nome: '',
            fator: 0,
            offset: 0,
            nome_json: '',
            unidade_medida: {
              id: 0
            }
          }          
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

  const parametroOptions = parametros.map(parametro => ({
    value: parametro.id,
    label: parametro.nome
  }));

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
                <Select
                  name="id_parametro"
                  options={parametroOptions}
                  className="basic-select"
                  classNamePrefix="select"
                  onChange={handleSelectChange}
                  value={parametroOptions.find(option => option.value === formData.id_parametro)}
                />
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
