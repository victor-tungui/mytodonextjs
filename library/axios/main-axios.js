import axios from 'axios';

const mainAxios = axios.create({
  baseURL: 'http://localhost:54637/api/',
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
});

export default mainAxios;
