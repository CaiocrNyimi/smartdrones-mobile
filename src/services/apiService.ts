import {
  Drone,
  Sensor,
  LeituraSensor,
  getDrones,
  getDroneById,
  createDrone,
  updateDrone,
  deleteDrone,
  getSensores,
  getSensorById,
  createSensor,
  updateSensor,
  deleteSensor,
  getLeituras,
  getLeituraById,
  createLeitura,
  updateLeitura,
  deleteLeitura,
  calcularRiscoMedio,
  totalLeiturasPorTipo,
  getLeiturasPorSensor,
  getDroneStatusCounts,
  getLatestLeituraForSensor,
  getLeiturasUltimos3Dias,
  getAverageValorPorTipoSensor,
} from '../data/dummyData';

const simulateNetworkDelay = (ms: number = 500) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const fetchDrones = async (): Promise<Drone[]> => {
  await simulateNetworkDelay();
  return getDrones();
};

export const fetchDroneById = async (id: number): Promise<Drone | undefined> => {
  await simulateNetworkDelay();
  return getDroneById(id);
};

export const addDrone = async (drone: Omit<Drone, 'drone_id'>): Promise<Drone> => {
  await simulateNetworkDelay();
  return createDrone(drone);
};

export const modifyDrone = async (drone: Drone): Promise<Drone | undefined> => {
  await simulateNetworkDelay();
  return updateDrone(drone);
};

export const removeDrone = async (id: number): Promise<boolean> => {
  await simulateNetworkDelay();
  return deleteDrone(id);
};

export const fetchSensores = async (): Promise<Sensor[]> => {
  await simulateNetworkDelay();
  return getSensores();
};

export const fetchSensorById = async (id: number): Promise<Sensor | undefined> => {
  await simulateNetworkDelay();
  return getSensorById(id);
};

export const addSensor = async (sensor: Omit<Sensor, 'sensor_id'>): Promise<Sensor> => {
  await simulateNetworkDelay();
  return createSensor(sensor);
};

export const modifySensor = async (sensor: Sensor): Promise<Sensor | undefined> => {
  await simulateNetworkDelay();
  return updateSensor(sensor);
};

export const removeSensor = async (id: number): Promise<boolean> => {
  await simulateNetworkDelay();
  return deleteSensor(id);
};

export const fetchLeituras = async (): Promise<LeituraSensor[]> => {
  await simulateNetworkDelay();
  return getLeituras();
};

export const fetchLeituraById = async (id: number): Promise<LeituraSensor | undefined> => {
  await simulateNetworkDelay();
  return getLeituraById(id);
};

export const addLeitura = async (leitura: Omit<LeituraSensor, 'leitura_id' | 'timestamp'>): Promise<LeituraSensor> => {
  await simulateNetworkDelay();
  return createLeitura(leitura);
};

export const modifyLeitura = async (leitura: LeituraSensor): Promise<LeituraSensor | undefined> => {
  await simulateNetworkDelay();
  return updateLeitura(leitura);
};

export const removeLeitura = async (id: number): Promise<boolean> => {
  await simulateNetworkDelay();
  return deleteLeitura(id);
};

export const fetchRiscoMedio = async (): Promise<number> => {
  await simulateNetworkDelay();
  return calcularRiscoMedio();
};

export const fetchTotalLeiturasPorTipo = async (tipo: string): Promise<number> => {
  await simulateNetworkDelay();
  return totalLeiturasPorTipo(tipo);
};

export const fetchLeiturasBySensor = async (sensorId: number): Promise<LeituraSensor[]> => {
  await simulateNetworkDelay();
  return getLeiturasPorSensor(sensorId);
};

export const fetchDroneStatuses = async (): Promise<{ status: string; total_drones: number }[]> => {
  await simulateNetworkDelay();
  return getDroneStatusCounts();
};

export const fetchLatestLeituraBySensor = async (sensorId: number): Promise<LeituraSensor | undefined> => {
  await simulateNetworkDelay();
  return getLatestLeituraForSensor(sensorId);
};

export const fetchLeiturasLast3Days = async (): Promise<{ drone_id: number; modelo: string; leituras_ultimos_3dias: number }[]> => {
  await simulateNetworkDelay();
  return getLeiturasUltimos3Dias();
};

export const fetchAverageValorSensorType = async (): Promise<{ tipo: string; media_valor: number }[]> => {
  await simulateNetworkDelay();
  return getAverageValorPorTipoSensor();
};