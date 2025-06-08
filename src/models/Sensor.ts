export interface Sensor {
  id: number;
  tipo: string;
  drone?: { id: number };
}