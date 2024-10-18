import React, { useEffect, useState } from 'react';
import './css/alertView.css';
import { userInfo } from 'os';
import Alerta from '../types/Alerta';
import Ocorrencia from '../types/Ocorrencia';
import { listarOcorrencia } from '../services/ocorrenciaServices';
import { listarAlertas } from '../services/alertaServices';
import { Estacao } from '../types/Estacao';
import { listarEstacoes } from '../services/estacaoServices';

export default function AlertView() {
    const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
    const [alertas, setAlertas] = useState<Alerta[]>([]);
    const [estacoes, setEstacoes] = useState<Estacao[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseOcorrencias = await listarOcorrencia();
                const responseAlertas = await listarAlertas();
                const responseEstacoes = await listarEstacoes();

                setOcorrencias(responseOcorrencias.data.rows)
                setAlertas(responseAlertas.data.rows)
                setEstacoes(responseEstacoes.data.rows)

            } catch (err) {
                console.error("Erro ao buscar dados:", err)
                if (err instanceof Error) {
                    setError(err.message)
                } else {
                    setError("Erro desconhecido")
                }
            }
        }

        fetchData()
        console.log(ocorrencias)
    }, []);

    const getAlertaNome = (id: number) => {
        const alerta = alertas.find( alerta => alerta.id === id )
        return alerta ? alerta.nome : "N/A"
    }

    const getEstacao = (id: number) => {
        const estacao = estacoes.find( estacao => estacao.id === id )
        return estacao ? estacao.nome : "N/A"
    }

    const getEstacaoByAlerta = (id_alerta: number) => {
        const alerta = alertas.find( alerta => alerta.id === id_alerta )
        return getEstacao(alerta ? alerta.id_estacao : 0)
    }

    return (
        <section className='alert-section'>

            {Array.isArray(ocorrencias) && ocorrencias?.map((ocorrencia) => (
                <div className='alert-card' key={ ocorrencia.id }>
                    <p>📢 { getEstacaoByAlerta(ocorrencia.id_alerta) } : { getAlertaNome(ocorrencia.id_alerta) }</p>
                </div>
            ))}

        </section>
    )

}