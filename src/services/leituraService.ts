import api from './api';

const LeituraService = {
  getAll: async () => {
    const response = await api.get('/leituras');
    return response.data.content;
  },

  getById: async (id: number) => {
    const response = await api.get(`/leituras/${id}`);
    return response.data;
  },

  create: async (leitura: any) => {
    const response = await api.post('/leituras', leitura);
    return response.data;
  },

  update: async (id: number, leitura: any) => {
    const response = await api.put(`/leituras/${id}`, leitura);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/leituras/${id}`);
    return response.status === 200 || response.status === 204;
  },
};

export default LeituraService;
