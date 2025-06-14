import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:8080/api',
});

export function setAuthToken(token: string | null) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
}

export default api;