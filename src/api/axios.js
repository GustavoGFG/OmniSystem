import axios from 'axios';

export const req = axios.create({
  baseURL: import.meta.env.VITE_OMNISYSTEM_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const reqdev = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
});
