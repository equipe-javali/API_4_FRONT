export interface Parametro {
  id?: number;
  unidade_medida: {
    id: number; 
  };
  nome: string;
  fator: number;
  offset: number;
  nome_json: string;
}
