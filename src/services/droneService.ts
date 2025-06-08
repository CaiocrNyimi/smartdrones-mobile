import api from './api';

const DroneService = {
  getAll: async () => {
    const response = await api.get('/drones');
    return response.data.content;
  },

  getById: async (id: number) => {
    const response = await api.get(`/drones/${id}`);
    return response.data;
  },

  create: async (drone: any) => {
    const response = await api.post('/drones', drone);
    return response.data;
  },

  update: async (id: number, drone: any) => {
    const response = await api.put(`/drones/${id}`, drone);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/drones/${id}`);
    return response.status === 200 || response.status === 204;
  },
};

export default DroneService;