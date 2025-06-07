import api from './api';

export async function fetchSensores() {
  const response = await api.get('/sensors');
  return response.data;
}