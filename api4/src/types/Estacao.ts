export interface Estacao {
  nome: string;
  endereco: string;
  latitude: number;
  longitude: number;
  mac_address: string;
  id?: number;
  parametros?: string;
};