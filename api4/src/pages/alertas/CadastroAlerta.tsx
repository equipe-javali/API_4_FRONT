import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { cadastrarAlerta } from '../../services/alertaServices';
import "./css/CadastraAlerta.css";
import Alerta from '../../types/Alerta';
import { listarParametros } from '../../services/parametroServices'; 
import { Parametro } from '../../types/Parametro'; 

export function CadastroAlerta() {
  const [formData, setFormData] = useState<Alerta>({
    nome: '',
    condicao: '', 
    valor: 0,  
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

  const handleSubmitAlerta = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const responseAlerta = await cadastrarAlerta(formData);

      if (responseAlerta.errors && responseAlerta.errors.length > 0) {
        console.error('Erro na resposta da API:', responseAlerta.errors);
        setMensagem("Erro ao cadastrar alerta: " + responseAlerta.errors.join(", "));
      } else {
        console.log('Sucesso:', responseAlerta);
        setMensagem("Alerta cadastrado com sucesso!");
        setFormData({
          nome: '',
          id_parametro: 0,
          parametro: {
            nome: '',
            fator: 0,
            offset: 0,
            nome_json:'',
            unidade_medida: {
              id: 0
            }
          }          
        });
      }
    } catch (error) {
      console.error('Erro:', error);
      setMensagem("Erro ao cadastrar alerta. Verifique os dados e tente novamente.");
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
    <div className="cadastro-parametro">
      <div className="container">
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
}