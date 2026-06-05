import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AUTH_STORAGE_KEY = 'frontend_auth_user';

const AuthContext = createContext(undefined);

const getStoredUser = () => {
    const rawUser = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!rawUser) return null;

    try {
        return JSON.parse(rawUser);
    } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        return null;
    }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => getStoredUser());
    const isAuthenticated = Boolean(user);

    const login = (payload = {}) => {
        const fallbackName = payload.email ? payload.email.split('@')[0] : 'Usuario';

        setUser({
            id: payload.id || 'demo-user',
            name: payload.name || fallbackName,
            email: payload.email || 'demo@correo.com',
        });
    };

    const logout = () => {
        setUser(null);
    };

    useEffect(() => {
        if (user) {
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
            return;
        }

        localStorage.removeItem(AUTH_STORAGE_KEY);
    }, [user]);

    const value = useMemo(
        () => ({
            user,
            isAuthenticated,
            login,
            logout,
        }),
        [user, isAuthenticated]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth debe usarse dentro de AuthProvider');
    }

    return context;
};