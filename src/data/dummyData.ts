export interface Drone {
  drone_id: number;
  modelo: string;
  status: 'Ativo' | 'Manutenção' | 'Desativado';
}

export interface Sensor {
  sensor_id: number;
  tipo: string;
  drone_id: number;
}

export interface LeituraSensor {
  leitura_id: number;
  sensor_id: number;
  valor: number;
  timestamp: Date;
}

let drones: Drone[] = [
  { drone_id: 1, modelo: 'DJI Phantom', status: 'Ativo' },
  { drone_id: 2, modelo: 'Parrot Anafi', status: 'Manutenção' },
  { drone_id: 3, modelo: 'DJI Mavic', status: 'Ativo' },
  { drone_id: 4, modelo: 'Autel EVO', status: 'Ativo' },
  { drone_id: 5, modelo: 'Skydio 2', status: 'Desativado' },
];

let sensors: Sensor[] = [
  { sensor_id: 1, tipo: 'Temperatura', drone_id: 1 },
  { sensor_id: 2, tipo: 'Umidade', drone_id: 1 },
  { sensor_id: 3, tipo: 'Pressão', drone_id: 2 },
  { sensor_id: 4, tipo: 'Gás', drone_id: 3 },
  { sensor_id: 5, tipo: 'Luminosidade', drone_id: 4 },
];

let leituras: LeituraSensor[] = [
  { leitura_id: 1, sensor_id: 1, valor: 25.3, timestamp: new Date(Date.now() - 12 * 3600 * 1000) },
  { leitura_id: 2, sensor_id: 2, valor: 70.1, timestamp: new Date(Date.now() - 24 * 3600 * 1000) },
  { leitura_id: 3, sensor_id: 3, valor: 1013, timestamp: new Date(Date.now() - 2 * 24 * 3600 * 1000) },
  { leitura_id: 4, sensor_id: 4, valor: 400, timestamp: new Date(Date.now() - 0.2 * 24 * 3600 * 1000) },
  { leitura_id: 5, sensor_id: 5, valor: 500, timestamp: new Date() },
];

let nextDroneId = Math.max(...drones.map(d => d.drone_id)) + 1;
let nextSensorId = Math.max(...sensors.map(s => s.sensor_id)) + 1;
let nextLeituraId = Math.max(...leituras.map(l => l.leitura_id)) + 1;

export const getDrones = (): Drone[] => {
  return [...drones];
};

export const getDroneById = (id: number): Drone | undefined => {
  return drones.find(d => d.drone_id === id);
};

export const createDrone = (newDrone: Omit<Drone, 'drone_id'>): Drone => {
  const drone = { ...newDrone, drone_id: nextDroneId++ };
  drones.push(drone);
  return drone;
};

export const updateDrone = (updatedDrone: Drone): Drone | undefined => {
  const index = drones.findIndex(d => d.drone_id === updatedDrone.drone_id);
  if (index !== -1) {
    drones[index] = updatedDrone;
    return updatedDrone;
  }
  return undefined;
};

export const deleteDrone = (id: number): boolean => {
  const initialLength = drones.length;
  const sensorsAssociated = sensors.filter(s => s.drone_id === id);
  if (sensorsAssociated.length > 0) {
      console.warn(`Não é possível deletar o drone ${id} porque ele tem sensores associados.`);
      return false;
  }
  drones = drones.filter(d => d.drone_id !== id);
  return drones.length < initialLength;
};

export const getSensores = (): Sensor[] => {
  return [...sensors];
};

export const getSensorById = (id: number): Sensor | undefined => {
  return sensors.find(s => s.sensor_id === id);
};

export const createSensor = (newSensor: Omit<Sensor, 'sensor_id'>): Sensor => {
  const sensor = { ...newSensor, sensor_id: nextSensorId++ };
  sensors.push(sensor);
  return sensor;
};

export const updateSensor = (updatedSensor: Sensor): Sensor | undefined => {
  const index = sensors.findIndex(s => s.sensor_id === updatedSensor.sensor_id);
  if (index !== -1) {
    sensors[index] = updatedSensor;
    return updatedSensor;
  }
  return undefined;
};

export const deleteSensor = (id: number): boolean => {
  const initialLength = sensors.length;
  const leiturasAssociated = leituras.filter(l => l.sensor_id === id);
  if (leiturasAssociated.length > 0) {
      console.warn(`Não é possível deletar o sensor ${id} porque ele tem leituras associadas.`);
      return false;
  }
  sensors = sensors.filter(s => s.sensor_id !== id);
  return sensors.length < initialLength;
};

export const getLeituras = (): LeituraSensor[] => {
  return [...leituras].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

export const getLeituraById = (id: number): LeituraSensor | undefined => {
  return leituras.find(l => l.leitura_id === id);
};

export const createLeitura = (newLeitura: Omit<LeituraSensor, 'leitura_id' | 'timestamp'>): LeituraSensor => {
  const leitura = { ...newLeitura, leitura_id: nextLeituraId++, timestamp: new Date() };
  leituras.push(leitura);
  return leitura;
};

export const updateLeitura = (updatedLeitura: LeituraSensor): LeituraSensor | undefined => {
  const index = leituras.findIndex(l => l.leitura_id === updatedLeitura.leitura_id);
  if (index !== -1) {
    leituras[index] = updatedLeitura;
    return updatedLeitura;
  }
  return undefined;
};

export const deleteLeitura = (id: number): boolean => {
  const initialLength = leituras.length;
  leituras = leituras.filter(l => l.leitura_id !== id);
  return leituras.length < initialLength;
};

export const calcularRiscoMedio = (): number => {
  if (leituras.length === 0) return 0;
  const totalRisco = leituras.reduce((sum, leitura) => {
    if (leitura.valor > 400) return sum + 3;
    if (leitura.valor >= 200 && leitura.valor <= 400) return sum + 2;
    return sum + 1;
  }, 0);
  return totalRisco / leituras.length;
};

export const totalLeiturasPorTipo = (tipo: string): number => {
  return leituras.filter(leitura => {
    const sensor = getSensorById(leitura.sensor_id);
    return sensor && sensor.tipo === tipo;
  }).length;
};

export const getLeiturasPorSensor = (sensorId: number): LeituraSensor[] => {
  return leituras.filter(leitura => leitura.sensor_id === sensorId);
};

export const getDroneStatusCounts = (): { status: string; total_drones: number }[] => {
  const counts: { [key: string]: number } = {};
  drones.forEach(drone => {
    counts[drone.status] = (counts[drone.status] || 0) + 1;
  });
  return Object.keys(counts).map(status => ({ status, total_drones: counts[status] }));
};

export const getLatestLeituraForSensor = (sensorId: number): LeituraSensor | undefined => {
  const sensorLeituras = leituras.filter(l => l.sensor_id === sensorId);
  if (sensorLeituras.length === 0) return undefined;
  return sensorLeituras.reduce((prev, current) => (prev.timestamp > current.timestamp ? prev : current));
};

export const getLeiturasUltimos3Dias = (): { drone_id: number; modelo: string; leituras_ultimos_3dias: number }[] => {
  const threeDaysAgo = new Date(Date.now() - 3 * 24 * 3600 * 1000);
  const result: { [key: number]: { modelo: string; count: number } } = {};

  leituras.forEach(leitura => {
    if (leitura.timestamp >= threeDaysAgo) {
      const sensor = getSensorById(leitura.sensor_id);
      if (sensor) {
        const drone = getDroneById(sensor.drone_id);
        if (drone) {
          if (!result[drone.drone_id]) {
            result[drone.drone_id] = { modelo: drone.modelo, count: 0 };
          }
          result[drone.drone_id].count++;
        }
      }
    }
  });

  return Object.keys(result).map(droneId => ({
    drone_id: parseInt(droneId),
    modelo: result[parseInt(droneId)].modelo,
    leituras_ultimos_3dias: result[parseInt(droneId)].count,
  })).sort((a, b) => b.leituras_ultimos_3dias - a.leituras_ultimos_3dias);
};

export const getAverageValorPorTipoSensor = (): { tipo: string; media_valor: number }[] => {
  const sensorData: { [key: string]: { sum: number; count: number } } = {};

  leituras.forEach(leitura => {
    const sensor = getSensorById(leitura.sensor_id);
    if (sensor) {
      if (!sensorData[sensor.tipo]) {
        sensorData[sensor.tipo] = { sum: 0, count: 0 };
      }
      sensorData[sensor.tipo].sum += leitura.valor;
      sensorData[sensor.tipo].count++;
    }
  });

  return Object.keys(sensorData)
    .filter(tipo => (sensorData[tipo].sum / sensorData[tipo].count) > 10)
    .map(tipo => ({
      tipo,
      media_valor: sensorData[tipo].sum / sensorData[tipo].count,
    }))
    .sort((a, b) => b.media_valor - a.media_valor);
};