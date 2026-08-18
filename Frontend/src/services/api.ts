import axios from 'axios';

// Replace this with your real backend URL.
// Android emulator: http://10.0.2.2:3000/api
// iOS simulator:     http://localhost:3000/api
// Physical device:   http://YOUR-PC-IP:3000/api
const API_URL = 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Required for session-based authentication.
  withCredentials: true,
  timeout: 10000,
});
