export interface Estacao {
  id?: number;
  nome: string;
  endereco: string;
  latitude: number;
  longitude: number;
  mac_address: string;    
  id_sensores: Array<number>;
  sensores?: Array<{ id: number; nome: string }>; // Adicione esta linha
}