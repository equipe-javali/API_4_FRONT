import React, { useEffect, useState } from "react";
import "./css/CadastraAlerta.css";
import Select from 'react-select';
import { useParams, useNavigate } from 'react-router-dom';
import { editarAlerta, buscarAlertaPorId } from "../../services/alertaServices";
import Alerta from '../../types/Alerta';
import { listarParametros } from '../../services/parametroServices'; 
import { ClipLoader } from "react-spinners";


export function EditaAlerta() {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Alerta | null>(null);
  const [parametros, setParametros] = useState<any[]>([]); 
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); 
  const condicoesOptions = [
    { value: '>', label: '>' },
    { value: '<', label: '<' },
    { value: '>=', label: '>=' },
    { value: '<=', label: '<=' },
    { value: '=', label: '=' }
  ];

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const responseParametros = await listarParametros();
        console.log('Parâmetros retornados:', responseParametros);  
        if (responseParametros.data && Array.isArray(responseParametros.data.rows)) {
          setParametros(responseParametros.data.rows);
        } else {
          console.error('Formato inesperado para parâmetros:', responseParametros);
        }

        if (id) {
          const responseAlerta = await buscarAlertaPorId(id);
          console.log('Alerta retornado:', responseAlerta);  
          if (responseAlerta.data && responseAlerta.data.rows && responseAlerta.data.rows.length > 0) {
            const alerta = responseAlerta.data.rows[0];
            setFormData(alerta);
          } else {
            console.error('Erro ao buscar alerta:', responseAlerta);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      const { name, value } = e.target;
      setFormData({ 
        ...formData, 
        [name]: name === 'valor' ? parseFloat(value) : value 
      });
    }
  };

  const handleSelectChange = (selectedOption: any) => {
    if (formData) {
      setFormData({ ...formData, id_parametro: selectedOption ? selectedOption.value : 0 });
    }
  };

  const handleSubmitAlerta = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData && id) {
      try {
        const updatedData: Alerta = {
          ...formData,
          id: Number(id), 
        };
  
        const responseAlerta = await editarAlerta(updatedData);
  
        if (responseAlerta.errors && responseAlerta.errors.length > 0) {
          setMensagem("Erro ao atualizar alerta: " + responseAlerta.errors.join(", "));
        } else {
          setMensagem("Alerta atualizado com sucesso!");
          navigate('/lista/alertas');
        }
      } catch (error) {
        console.error('Erro ao atualizar alerta:', error);
        setMensagem("Erro ao atualizar alerta. Verifique os dados e tente novamente.");
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
    <div className="cadastro-alerta">
      <div className="container">
        <h2 className="text-wrapper-titulo">Alerta ID {id}</h2>

        <form onSubmit={handleSubmitAlerta}>
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
                  onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="text-wrapper">Condição</label>
                <Select
                  name="condicao"
                  options={condicoesOptions}
                  className="basic-single"
                  classNamePrefix="select"
                  onChange={(selectedOption) => {
                    if (formData) {
                      setFormData({ ...formData, condicao: selectedOption?.value || '' });
                    }
                  }}
                  value={condicoesOptions.find(option => option.value === formData.condicao) || null}
                />
              </div>
              <div className="form-group">
                <label className="text-wrapper">Valor</label>
                <input
                  type="number"
                  className="input"
                  placeholder="Digite o valor..."
                  name="valor"
                  value={formData.valor}
                  onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="text-wrapper">Parâmetro</label>
                <Select
                  name="id_parametro"
                  options={parametroOptions}
                  className="basic-single-select"
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