import React, { useEffect, useState } from "react"; 
import Select from 'react-select';
import { useParams } from 'react-router-dom';
import { editarSensor, buscarSensorPorId } from '../../services/sensorServices';
import { listarParametros } from '../../services/parametroServices'; 
import Sensor from '../../types/Sensor';
import { Parametro } from '../../types/Parametro'; 
import "./css/CadastraSensor.css";
import { ClipLoader } from "react-spinners";

export function EditaSensor() {
  const { id } = useParams<{ id: string }>(); 
  const [formData, setFormData] = useState<Sensor | null>(null);
  const [parametros, setParametros] = useState<Parametro[]>([]);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const responseParametros = await listarParametros();
        if (responseParametros.data && Array.isArray(responseParametros.data.rows)) {
          setParametros(responseParametros.data.rows);
        } else {
          console.error('Resposta da API não é um array:', responseParametros);
        }

        if (id) {
          const responseSensor = await buscarSensorPorId(id);
          if (responseSensor && responseSensor.data) {
            const sensor = responseSensor.data.rows[0];
            setFormData(sensor);
          } else {
            console.error('Erro ao buscar sensor:', responseSensor);
          }
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setIsLoading(false); 
      }
    };

    carregarDados();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (formData) {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSelectChange = (selectedOption: any) => {
    if (formData) {
      setFormData({ ...formData, id_parametro: selectedOption ? selectedOption.value : 0 });
    }
  };

  const handleSubmitSensor = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData) {
      const token = localStorage.getItem('token'); // Obter o token do localStorage
      console.log('Token obtido:', token); // Log do token

      if (!token) {
        setMensagem("Erro: Você precisa estar logado para editar um sensor.");
        console.log('Token não encontrado. Edição não permitida.'); // Log se o token não estiver presente
        return;
      }

      try {
        console.log('Tentando editar sensor com token:', token); // Log antes de chamar a função de edição
        const responseSensor = await editarSensor(formData, token); // Passa o token para a função

        if (responseSensor.errors && responseSensor.errors.length > 0) {
          console.error('Erro na resposta da API:', responseSensor.errors);
          setMensagem("Erro ao atualizar sensor: " + responseSensor.errors.join(", "));
        } else {
          console.log('Sucesso:', responseSensor);
          setMensagem("Sensor atualizado com sucesso!");
        }
      } catch (error) {
        console.error('Erro:', error);
        setMensagem("Erro ao atualizar sensor. Verifique os dados e tente novamente.");
      }
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

  if (isLoading) {
    return (
      <div className="spinner-container">
        <ClipLoader size={50} color={"#123abc"} loading={isLoading} />
      </div>
    );
  }

  if (!formData) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="cadastro-sensor">
      <div className="container">
        <h2 className="text-wrapper-titulo">Sensor ID {id}</h2>

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
