import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const AUTH_MODE =
    (import.meta.env.VITE_AUTH_MODE || 'SUPABASE').toUpperCase();

const FORCE_MOCK = AUTH_MODE === 'MOCK';

const isValidConfig = supabaseUrl &&
                     supabaseKey &&
                     !supabaseUrl.includes('[TU_PROYECTO]') &&
                     !supabaseKey.includes('[ANON_KEY]');

let supabase;

if (!FORCE_MOCK && isValidConfig) {
    console.log('Supabase Client (Front-End): Intentando inicializar con credenciales reales.');
    try {
        supabase = createClient(supabaseUrl, supabaseKey);
        if (localStorage.getItem('supabase.mock.session')) localStorage.removeItem('supabase.mock.session');
    } catch (error) {
        console.error("Error al inicializar Supabase Client:", error);
        console.warn('Supabase Client (Front-End): Falló la inicialización con credenciales reales, se usará el mock.');
    }
}

if (FORCE_MOCK) {
    console.log('🧪 AUTH_MODE=MOCK → usando cliente Mock');
}

if (!supabase) {
    const MOCK_STORAGE_KEY = 'supabase.mock.session';

    supabase = {
        auth: {
            getSession: async () => {
                const saved = localStorage.getItem(MOCK_STORAGE_KEY);
                return { data: { session: saved ? JSON.parse(saved) : null } };
            },
            onAuthStateChange: (callback) => {
                const saved = localStorage.getItem(MOCK_STORAGE_KEY);
                callback('INITIAL_SESSION', saved ? JSON.parse(saved) : null);
                return { data: { subscription: { unsubscribe: () => {} } } };
            },
            signInWithPassword: async () => Promise.reject(new Error("SUPABASE_UNAVAILABLE_MOCK")),
            signUp: async () => Promise.reject(new Error("SUPABASE_UNAVAILABLE_MOCK")),
            signOut: async () => {
                localStorage.removeItem(MOCK_STORAGE_KEY);
                return { error: null };
            },
            _updateMockSession: (session) => {
                if (session) localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(session));
                else localStorage.removeItem(MOCK_STORAGE_KEY);
            }
        }
    };
    console.warn('\x1b[33m%s\x1b[0m', '--- Supabase Client (Front-End): MOCK/Placeholder mode (no conexión real) ---');
}

export { supabase };
