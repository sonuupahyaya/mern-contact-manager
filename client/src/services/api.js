import axios from 'axios';

const API_BASE_URL =
  import.meta.env.MODE === 'production'
    ? `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/api`
    : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const contactService = {
  getAll: async () => {
    const res = await api.get('/contacts');
    return res.data;
  },

  create: async (data) => {
    const res = await api.post('/contacts', data);
    return res.data;
  },

  delete: async (id) => {
    const res = await api.delete(`/contacts/${id}`);
    return res.data;
  },
};

export default api;
