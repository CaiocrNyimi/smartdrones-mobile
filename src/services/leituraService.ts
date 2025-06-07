import api from './api';

export async function fetchLeituras() {
  const response = await api.get('/leituras');
  return response.data;
}