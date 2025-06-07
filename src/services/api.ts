import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.133:8080/api',
});

export function setAuthToken(token: string | null) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
}

export default api;