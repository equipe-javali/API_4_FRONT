import { Parametro } from './Parametro'; 

export default interface Alerta {
  id?: number;
  nome: string;
  condicao: string; 
  valor: number;  
  id_parametro: number;
  id_estacao: number;
}