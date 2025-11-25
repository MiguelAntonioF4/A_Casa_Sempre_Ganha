import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Criar instância do axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('casino_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      localStorage.removeItem('casino_token');
      localStorage.removeItem('casino_user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// ===== AUTH ENDPOINTS =====
export const authAPI = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  }
};

// ===== GAME ENDPOINTS =====
export const gameAPI = {
  getSession: async () => {
    const response = await api.get('/game/session');
    return response.data;
  },

  updateSession: async (sessionData) => {
    const response = await api.put('/game/session', sessionData);
    return response.data;
  },

  resetGame: async () => {
    const response = await api.post('/game/reset');
    return response.data;
  }
};

// ===== LEADERBOARD ENDPOINTS =====
export const leaderboardAPI = {
  getLeaderboard: async () => {
    const response = await api.get('/leaderboard');
    return response.data;
  },

  getUserRank: async () => {
    const response = await api.get('/leaderboard/rank');
    return response.data;
  }
};

export default api;