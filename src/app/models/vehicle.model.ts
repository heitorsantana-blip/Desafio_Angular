export interface Veiculo {
  id: number;
  vehicle: string;
  volumetotal: number;
  connected: number;
  softwareUpdates: number;
  img: string;
}

export interface TelemetriaVeiculo {
  id: number;
  odometro: number;
  nivelCombustivel: number;
  status: string;
  lat: number;
  long: number;
}