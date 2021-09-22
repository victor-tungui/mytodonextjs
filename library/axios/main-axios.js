import axios from 'axios';

const mainAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API,
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
});

export default mainAxios;
