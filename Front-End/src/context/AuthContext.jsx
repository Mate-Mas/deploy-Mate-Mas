import { createContext, useContext, useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { supabase } from '../config/supabaseClient';
import api from '../config/api';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [initialized, setInitialized] = useState(false);
    const lastFetchedId = useRef(null);
    const isFetching = useRef(false);

    const logout = useCallback(async () => {
        try {
            setLoading(true);
            await supabase.auth.signOut();
        } catch (err) {
            console.warn("⚠️ Error al cerrar sesión en Supabase, limpiando estado local.", err);
        } finally {
            setSession(null);
            setProfile(null);
            lastFetchedId.current = null;
            setLoading(false);
        }
    }, []);

    const fetchProfile = useCallback(async (user) => {
        console.log(`🔄 fetchProfile called for user: ${user.id}`);
        if (isFetching.current) return;
        
        isFetching.current = true;
        try {
            const { data } = await api.post('/api/usuarios/registro', {
                uid: user.id,
                email: user.email,
                nombre: user.user_metadata?.full_name || user.email.split('@')[0]
            });
            setProfile(data || null);
        } catch (error) {
            console.error('🔴 Error de sincronización con Back-End:', error.message);

            if (error.response?.status === 401) {
                console.warn("⚠️ Sesión inválida detectada. Limpiando...", error);
                logout();
            }
            if (error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED' || !error.response) {
                lastFetchedId.current = null;
            }
            setProfile(null);
        } finally {
            isFetching.current = false;
        }
    }, [logout]);
    const completeInitialization = useCallback(() => {
        if (!initialized) {
            setInitialized(true);
            setLoading(false);
        }
    }, [initialized]);

    // REGLA CRÍTICA: fetchProfile NO debe estar en las dependencias
    useEffect(() => {
        let isMounted = true;
        let timeoutId = null;

        timeoutId = setTimeout(() => {
            if (isMounted && !initialized) {
                console.warn("⚠️ Timeout de inicialización - forzando carga de la aplicación");
                completeInitialization();
            }
        }, 3000);

        const initializeAuth = async () => {
            try {
                const { data: { session: currentSession }, error } = await supabase.auth.getSession();

                if (error) {
                    console.warn("⚠️ Error al obtener sesión:", error);
                }

                if (currentSession?.user) {
                    console.log("✅ Sesión existente encontrada");
                    setSession(currentSession);
                    lastFetchedId.current = currentSession.user.id;
                    await fetchProfile(currentSession.user);
                } else {
                    console.log("ℹ️ No hay sesión activa");
                    setSession(null);
                    setProfile(null);
                }
            } catch (error) {
                console.error("🔴 Error en inicialización:", error);
            } finally {
                if (isMounted) {
                    completeInitialization();
                }
            }
        };

        initializeAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
            console.log(`🔐 AuthEvent: ${_event}`);

            if (!isMounted) return;

            setSession(newSession || null);

            if (newSession?.user) {
                // Solo fetch si es un nuevo usuario o evento SIGNED_IN
                if (lastFetchedId.current !== newSession.user.id || _event === 'SIGNED_IN') {
                    lastFetchedId.current = newSession.user.id;
                    fetchProfile(newSession.user);
                }
            } else {
                setProfile(null);
                lastFetchedId.current = null;
            }

            if (!initialized) {
                completeInitialization();
            }
        });

        return () => {
            isMounted = false;
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            subscription.unsubscribe();
        };
        // IMPORTANTE: Sacar fetchProfile y completeInitialization de las dependencias
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialized]); // Solo depende de initialized

    const login = useCallback(async (email, password) => {
        try {
            setLoading(true);
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) {
                if (error.status === 400) throw error;
                throw new Error("SUPABASE_UNAVAILABLE");
            }
            if (data.user) fetchProfile(data.user);
            setLoading(false);
            return data;
        } catch (err) {
            setLoading(false);
            const isMockMode = !import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('[TU_PROYECTO]');

            if (isMockMode || err.message === "SUPABASE_UNAVAILABLE" || err.message === "SUPABASE_UNAVAILABLE_MOCK") {
                console.warn("⚠️ Usando autenticación de respaldo (Back-End Mock)");
                const response = await api.post('/usuarios/login', {
                    email,
                    password
                });
                if (response.data) {
                    const mockSession = {
                        user: { email, id: response.data.user?.id || 'local-auth' },
                        access_token: response.data.user?.token || 'local-mock-token'
                    };
                    if (supabase.auth._updateMockSession) supabase.auth._updateMockSession(mockSession);
                    setSession(mockSession);
                }
                return response.data;
            }
            throw err;
        }
    }, [fetchProfile]);

    const register = useCallback(async (email, password, nombre, extraData = {}) => {
        try {
            const redirectUrl = 'https://matemas.vercel.app/auth/callback';
            setLoading(true);
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { full_name: nombre, ...extraData },
                    emailRedirectTo: redirectUrl
                },
            });
            if (error) throw error;
            setLoading(false);
            return data;
        } catch (err) {
            setLoading(false);
            if (err.message === "SUPABASE_UNAVAILABLE_MOCK" || err.status === 400) {
                console.warn("⚠️ Supabase no disponible. Entrando en modo de autenticación local (Mock)");
                const response = await api.post('/api/usuarios/registro', {
                    uid: 'mock-' + Date.now(),
                    email,
                    password,
                    nombre,
                    ...extraData
                });
                if (response.data) {
                    const mockSession = { user: { email, id: 'local-auth' }, access_token: 'local-mock-token' };
                    setSession(mockSession);
                }
                return response.data;
            }
            throw err;
        }
    }, []);

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
            initialized,
            refreshProfile: () => session?.user && fetchProfile(session.user)
        }),
        [session, profile, login, register, logout, loading, initialized, fetchProfile]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
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