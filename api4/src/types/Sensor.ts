import { Parametro } from './Parametro';

export default interface Sensor{    
        id?: number;
        nome: string;
        id_parametro: number;
        parametro?: Parametro;
              
}