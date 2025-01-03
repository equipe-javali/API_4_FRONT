import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { editarParametro, buscarParametroPorID } from "../../services/parametroServices"; 
import { listarUnidades } from "../../services/unidadeServices"; 
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
  
              if (id) {
                  const responseParametro = await buscarParametroPorID(id);
                  console.log('Parâmetro retornado:', responseParametro);  
                  if (responseParametro.data && responseParametro.data.rows && responseParametro.data.rows.length > 0) {
                      const parametro = responseParametro.data.rows[0];
                      setFormData({
                          ...parametro,
                          unidade_medida: { id: parametro.id_unidade } 
                      });
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (formData) {
            const { name, value } = e.target;
            setFormData({ 
                ...formData, 
                [name]: name === 'fator' ? parseFloat(value) : value 
            });
        }
    };    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData && id) {
          try {
            const token = localStorage.getItem('token'); // Pegando o token do local storage
      
            if (!token) {
              setMensagem("Token não encontrado. Por favor, faça login novamente.");
              return;
            }
      
            const updatedData: Parametro = {
              ...formData,
              id: Number(id), 
            };
      
            const responseParametro = await editarParametro(updatedData, token);
      
            if (responseParametro.errors && responseParametro.errors.length > 0) {
              setMensagem("Erro ao atualizar parâmetro: " + responseParametro.errors.join(", "));
            } else {
              setMensagem("Parâmetro atualizado com sucesso!");
              navigate('/lista/parametros');
            }
          } catch (error) {
            console.error('Erro ao atualizar parâmetro:', error);
            setMensagem("Erro ao atualizar parâmetro. Verifique os dados e tente novamente.");
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
        <div className="cadastro-parametro">
            <div className="container">
                <h2 className="text-wrapper-titulo">Editar Parâmetro</h2>
                <form onSubmit={handleSubmit}>
                    <div className="content">
                        <div className="form">
                            <div className="form-group">
                                <label className="text-wrapper">Unidade de Medida</label>
                                
                                <div className="unidade-display">
                                    {unidadeOptions.find(option => option.value === formData.unidade_medida.id)?.label || 'Nenhuma unidade selecionada'}
                                </div>
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
                                <label className="text-wrapper">Nome JSON</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Digite o nome JSON..."
                                    name="nome_json"
                                    value={formData.nome_json ?? ''} 
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
