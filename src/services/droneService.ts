import api from './api';

export async function fetchDrones() {
  const response = await api.get('/drones');
  return response.data;
}