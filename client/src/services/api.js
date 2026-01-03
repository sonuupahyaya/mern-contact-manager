import axios from 'axios';

const API_BASE_URL =
  import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_API_URL
    : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const contactService = {
  getAll: async (params = {}) => {
    const response = await api.get('/contacts');
    return response.data;
  },

  create: async (contactData) => {
    const response = await api.post('/contacts', contactData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/contacts/${id}`);
    return response.data;
  },
};

export default api;
