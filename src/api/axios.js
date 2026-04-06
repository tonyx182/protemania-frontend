import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:7289/api',  
});

export default api;