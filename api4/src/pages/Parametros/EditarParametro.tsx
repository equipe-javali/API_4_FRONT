import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { useParams, useNavigate } from "react-router-dom";
import { editarParametro, buscarParametroPorID } from "../../services/parametroServices"; 
import { listarUnidades } from "../../services/unidademedidaServices"; 
import { Parametro } from '../../types/Parametro';
import "./css/Parametros.css";
import { ClipLoader } from "react-spinners";

export function EditarParametro() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<Parametro | null>(null);
    const [unidadeOptions, setUnidadeOptions] = useState<any[]>([]);
    const [mensagem, setMensagem] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const carregarDados = async () => {
          try {
              // Carregar unidades de medida
              const responseUnidades = await listarUnidades();
              console.log('Unidades retornadas:', responseUnidades);  
              if (responseUnidades.data && Array.isArray(responseUnidades.data.rows)) {
                  setUnidadeOptions(responseUnidades.data.rows.map((unidade: any) => ({
                      value: unidade.id,
                      label: unidade.nome
                  })));
              } else {
                  console.error('Formato inesperado para unidades de medida:', responseUnidades);
              }
  
              // Carregar os dados do parâmetro por ID
              if (id) {
                  const responseParametro = await buscarParametroPorID(id);
                  console.log('Parâmetro retornado:', responseParametro);  
                  if (responseParametro.data && responseParametro.data.rows && responseParametro.data.rows.length > 0) {
                      setFormData(responseParametro.data.rows[0]); // Acessa o primeiro item do array
                  } else {
                      console.error('Erro ao buscar parâmetro:', responseParametro);
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
  

    
    // Manter os valores do formData ao mudar os inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (formData) {
            const { name, value } = e.target;
            setFormData({ 
                ...formData, 
                [name]: name === 'fator' || name === 'offset' ? parseFloat(value) : value 
            });
        }
    };

    // Atualizar a unidade de medida selecionada
    const handleSelectChange = (selectedOption: any) => {
        if (formData) {
            setFormData({ 
                ...formData, 
                unidade_medida: selectedOption ? selectedOption.value : 0 
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData) {
            try {
                const updatedData: Parametro = {
                    ...formData,
                    id: Number(id),
                };

                await editarParametro(updatedData); 
                setMensagem("Parâmetro atualizado com sucesso!");
                navigate('/lista/parametros');
            } catch (error) {
                console.error("Erro ao atualizar parâmetro:", error);
                setMensagem("Erro ao atualizar parâmetro. Verifique os dados e tente novamente.");
            }
        }
    };

    // Limpar a mensagem após 5 segundos
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
        <div className="editar-parametro">
            <div className="container">
                <h2 className="text-wrapper-titulo">Editar Parâmetro</h2>
                <form onSubmit={handleSubmit}>
                    <div className="content">
                        <div className="form">
                            <div className="form-group">
                                <label className="text-wrapper">Unidade de Medida</label>
                                <Select
                                    name="unidade_medida"
                                    options={unidadeOptions}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    onChange={handleSelectChange}
                                    value={unidadeOptions.find(option => option.value === formData.unidade_medida) || null} 
                                />
                            </div>
                            <div className="form-group">
                                <label className="text-wrapper">Nome</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Digite o nome..."
                                    name="nome"
                                    value={formData.nome ?? ''} 
                                    onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label className="text-wrapper">Fator</label>
                                <input
                                    type="number"
                                    className="input"
                                    placeholder="Digite o fator..."
                                    name="fator"
                                    value={formData.fator ?? 0} 
                                    onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label className="text-wrapper">Offset</label>
                                <input
                                    type="number"
                                    className="input"
                                    placeholder="Digite o offset..."
                                    name="offset"
                                    value={formData.offset ?? 0} 
                                    onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <button className="button" type="submit">Atualizar</button>
                                {mensagem && <div className={mensagem.includes("Erro") ? "error-message" : "success-message"}>{mensagem}</div>}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
