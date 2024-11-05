export interface Arquivo {
    nomeArquivo: string,
    tabelas: Graficos[]
}

export interface Barras {
    y: number,
    x: string
}

export interface FiltroRelatorios {
    dataInicio?: Date,
    dataFim?: Date,
    estacoes?: number[]
}

export interface Graficos {
    dados: string[][],
    titulo: string,
    subtitulos: string[]
}

export interface PontoMapa {
    latitude: number,
    longitude: number
}

export interface Relatorios {
    mapaEstacoes: Graficos,
    alertaPorEstacoes: Graficos,
    medicaoPorSensor: Graficos,
    ocorrenciaPorAlerta: Graficos
};

interface RelatoriosProps {
    relatorios: Relatorios;
}