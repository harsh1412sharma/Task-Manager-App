import axios from 'axios';

const api = axios.create({
  baseURL: 'https://task-manager-app-3gac.onrender.com', // our backend API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;