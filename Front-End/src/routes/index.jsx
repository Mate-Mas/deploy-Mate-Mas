import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Register from '../pages/Register';

import Landing from '../pages/Landing.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';
import LoginPage from '../pages/Login';
import { useAuth } from '../context/AuthContext';

// Componente para proteger rutas autenticadas
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    return isAuthenticated
        ? children
        : <Navigate to="/login" replace state={{ from: location.pathname }} />;
};

// Componente para redireccionar si ya está autenticado
const PublicRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

export default function AppRouter() {
    return (
        <Router>
            <Routes>
                {/* Rutas públicas */}
                <Route path="/" element={<Landing />} />
                
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <LoginPage />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    }
                />

                {/* Rutas autenticadas */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                {/* Ruta 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}
