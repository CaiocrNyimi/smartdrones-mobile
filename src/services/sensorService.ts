import api from './api';

const SensorService = {
  getAll: async () => {
    const response = await api.get('/sensors');
    return response.data.content;
  },

  getById: async (id: number) => {
    const response = await api.get(`/sensors/${id}`);
    return response.data;
  },

  create: async (sensor: any) => {
    const response = await api.post('/sensors', sensor);
    return response.data;
  },

  update: async (id: number, sensor: any) => {
    const response = await api.put(`/sensors/${id}`, sensor);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/sensors/${id}`);
    return response.data;
  },
};

export default SensorService;