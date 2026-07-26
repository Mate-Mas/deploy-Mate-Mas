import axios from 'axios';
import { supabase } from './supabaseClient';

const rawBaseURL = import.meta.env.VITE_API_URL;

const cleanBaseURL = rawBaseURL
    ? rawBaseURL.replace(/^VITE_API_URL:/, '').replace(/['"]/g, '')
    : null;

console.log('📡 API BaseURL:', cleanBaseURL || 'Usando fallback');

const api = axios.create({
    baseURL: cleanBaseURL || (
        import.meta.env.MODE === 'production'
        ? '/api'
        : 'http://localhost:3001/api'),
    timeout: 15000
});

console.log("MODE:", import.meta.env.MODE);
console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);
console.log("BASE URL:", api.defaults.baseURL);

api.interceptors.request.use(async (config) => {
    const { data: { session } } = await supabase.auth.getSession();

    if (session) {
        config.headers.Authorization = `Bearer ${session.access_token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
