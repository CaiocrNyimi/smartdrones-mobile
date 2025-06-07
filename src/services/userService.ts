import api, { setAuthToken } from './api';

export async function login(username: string, password: string) {
  const response = await api.post('/auth/login', { username, password });
  const { token } = response.data;
  setAuthToken(token);
  return token;
}

export async function register(username: string, email: string, password: string, role: string = 'USER') {
  const response = await api.post('/users', { username, email, password, role });
  return response.data;
}
