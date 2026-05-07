// lib/api/client.ts
import axios from 'axios';
import { API_BASE_URL } from './config';

// Create a configured axios instance
// Think of this as creating a "messenger" that knows where to go
export const apiClient = axios.create({
    baseURL: API_BASE_URL,  // Where to send requests
    timeout: 10000,          // Give up after 10 seconds
});

export default apiClient;