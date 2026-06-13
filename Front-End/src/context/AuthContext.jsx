import { createContext, useContext, useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { supabase } from '../config/supabaseClient';
import api from '../config/api';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const lastFetchedId = useRef(null);
    const isFetching = useRef(false);

    const fetchProfile = useCallback(async (user) => {
        console.log(`🔄 fetchProfile called for user: ${user.id}, isFetching: ${isFetching.current}, currentProfile: ${profile?.id}`);
        if (isFetching.current) return;
        isFetching.current = true;
        try {
            const { data } = await api.post('/usuarios/registro', {
                uid: user.id,
                email: user.email,
                nombre: user.user_metadata?.full_name || user.email.split('@')[0]
            });
            setProfile(data || null);
        } catch (error) {
            console.error('🔴 Error de sincronización con Back-End:', error.message);

            // Si el Back-End nos tira 401, la sesión de Supabase que tenemos es basura.
            // Forzamos el cierre de sesión para que el usuario pueda volver al login.
            if (error.response?.status === 401) {
                console.warn("⚠️ Sesión inválida detectada. Limpiando...");
                logout();
            }

            // Si es un error de red, permitimos re-intento en el próximo evento
            if (error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED' || !error.response) {
                lastFetchedId.current = null;
            }
            setProfile(null);
        } finally {
            isFetching.current = false;
        }
    }, []);

    useEffect(() => {
        // Failsafe: Si en 5 segundos Supabase no respondió, soltamos el loading
        const timer = setTimeout(() => setLoading(false), 5000);

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            console.log(`🔐 AuthEvent: ${_event}`);
            setSession(session || null);

            if (session?.user) {
                if (lastFetchedId.current !== session.user.id || (!profile && _event !== 'USER_UPDATED')) {
                    lastFetchedId.current = session.user.id;
                    fetchProfile(session.user);
                }
            } else {
                setProfile(null);
            }
            setLoading(false);
            clearTimeout(timer);
        });

        return () => {
            subscription.unsubscribe();
            clearTimeout(timer);
        };
    }, [fetchProfile]);

    const login = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) {
                if (error.status === 400) throw error;
                throw new Error("SUPABASE_UNAVAILABLE");
            }
            // No bloqueamos el login esperando al perfil, lo tiramos en paralelo
            if (data.user) fetchProfile(data.user);

            return data;
        } catch (err) {
            throw err;
        }
    };

    const register = async (email, password, nombre, extraData = {}) => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: { data: { full_name: nombre, ...extraData } }
            });
            if (error) throw error;
            return data;
        } catch (err) {
            throw err;
        }
    };

    const logout = async () => {
        try {
            await supabase.auth.signOut();
        } catch (err) {
            console.warn("⚠️ Error al cerrar sesión en Supabase, limpiando estado local.");
        } finally {
            setSession(null);
            setProfile(null);
            lastFetchedId.current = null;
        }
    };

    const value = useMemo(
        () => ({
            user: session?.user ?? null,
            profile,
            token: session?.access_token ?? null,
            isAuthenticated: !!session,
            login,
            register,
            logout,
            loading,
            refreshProfile: () => session?.user && fetchProfile(session.user)
        }),
        [session, profile, loading, fetchProfile]
    );

    return (
        <AuthContext.Provider value={value}>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#1a1a1a', color: '#00ff00' }}>
                    <div style={{ textAlign: 'center' }}>
                        <h3>InnovaLab</h3>
                        <p>Cargando módulos de seguridad...</p>
                    </div>
                </div>
            ) : children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth debe usarse dentro de AuthProvider');
    }

    return context;
};
