export interface IArquivo {
    nomeArquivo: string,
    tabelas: IGraficos[]
}

export interface IBarras {
    y: number,
    x: string
}

export interface IFiltroRelatorios {
    dataInicio?: string,
    dataFim?: string,
    estacoes?: number[],

}

export interface IGraficos {
    dados: string[][],
    titulo: string,
    subtitulos: string[]
}

export interface IPontoMapa {
    latitude: number,
    longitude: number
}

export interface IRelatorios {
    data: {
        rows: {
            mapaEstacoes: IGraficos,
            alertaPorEstacoes: IGraficos,
            medicaoPorSensor: IGraficos,
            ocorrenciaPorAlerta: IGraficos,
            temperatura: IGraficos,
        }
        fields: string[][]
    }
};

export interface IRelatoriosProps {
    relatorios: IRelatorios;
}


export interface ExportarRelatoriosProps {
    relatorios?: IRelatorios | null;
}