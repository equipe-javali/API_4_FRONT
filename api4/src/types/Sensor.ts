import { Parametro } from './Parametro'; // Certifique-se de que o caminho está correto

export default interface Sensor {
  id?: number;
  nome: string;
  id_parametro: number; // Propriedade existente
  id_parametros?: number[]; // Nova propriedade para múltiplos parâmetros
  parametro?: Parametro;
}