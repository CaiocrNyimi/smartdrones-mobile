export interface LeituraSensor {
  id: number;
  valor: number;
  timestamp: string;
  sensor?: { id: number };
}