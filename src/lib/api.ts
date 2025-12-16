import axios from 'axios';

// O endereço do seu backend no Vercel.
const VITE_API_URL = import.meta.env.VITE_API_URL || 'https://backendapi-hazet-eight.vercel.app/api';

const api = axios.create({
  baseURL: VITE_API_URL,
});

// A mágica acontece aqui: antes de QUALQUER requisição, este código
// pega o "crachá" de acesso (token) que salvamos no login e o anexa
// no cabeçalho da requisição, provando que o usuário está logado.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;