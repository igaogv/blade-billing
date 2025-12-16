import axios from 'axios';

// O endereço do seu backend no Vercel.
// Com fallback para o endereço padrão se a variável não estiver definida
const VITE_API_URL = import.meta.env.VITE_API_URL || 'https://backendapi-hazet-eight.vercel.app/api';

console.log('API URL inicializado:', VITE_API_URL);
console.log('Environment:', import.meta.env);

const api = axios.create({
  baseURL: VITE_API_URL,
});

// Log das requisições para debug
api.interceptors.request.use(
  (config) => {
    console.log(`${config.method?.toUpperCase()} para:`, config.url, 'Full URL:', config.baseURL + config.url);
    
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

// Log de respostas para debug
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na API:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export default api;