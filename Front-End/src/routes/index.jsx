import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Register from "../pages/Register";

import Landing from '../pages/Landing.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';
import LoginPage from '../pages/Login';
import ConsolaAdmin from '../pages/ConsolaAdmin';
import { useAuth } from '../context/AuthContext';
import StartedPage from '../pages/Started.jsx';
import Onboarding from '../pages/Onboarding';
import Nosotros from '../pages/Nosotros.jsx';
import Desafios from '../pages/Desafios.jsx';
import AuthCallback from '../pages/AuthCallback.jsx';
import ModuloEjercicios from '../pages/Ejercicios.jsx';
import DragConstraints from '../pages/DropAndDown.jsx';
import TermsOfService from '../pages/TermsOfService.jsx';
import MixtoPage from '../pages/Mixto.jsx';
import RankingPage from '../pages/Ranking.jsx';
import Configuracion from '../components/layouts/Configuracion/Configuracion.jsx';

// Componente para proteger rutas autenticadas
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location.pathname }} />
  );
};

// Componente para redireccionar si ya está autenticado
const PublicRoute = ({ children, forceRedirect = true }) => {
  const { isAuthenticated, profile } = useAuth();

    // Solo redireccionamos si hay sesión Y perfil cargado.
    // Si hay sesión pero no perfil (error de red), dejamos que vea la página pública.
    
    if(isAuthenticated && profile && forceRedirect) {
        if(profile?.sentimiento || profile?.desafio || profile?.edad) {
            return <Navigate to="/dashboard" /> 
        }
        
        return <Navigate to="/onboarding" />
    }

    return children
};

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route
          path="/"
          element={
            <PublicRoute forceRedirect={false}>
              <Landing />
            </PublicRoute>
          }
        />
        <Route
          path="/nosotros"
          element={
            <PublicRoute>
              <Nosotros />
            </PublicRoute>
          }
        />
        <Route
          path="/TermsOfService"
          element={
            <PublicRoute>
              <TermsOfService />
            </PublicRoute>
          }
        />

        <Route
          path="/started"
          element={
            <PublicRoute>
              <StartedPage />
            </PublicRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route path="/auth/callback" element={<AuthCallback />} />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Rutas públicas para previsualización */}
        <Route path="/desafios" element={<Desafios />} />

        <Route path="/ejercicios" element={<ModuloEjercicios />} />

        <Route path="/ejercicios2" element={<DragConstraints />} />

        {/* Rutas autenticadas */}
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
          }
        />

        {/* Ruta de desarrollo para previsualizar Onboarding sin autenticación */}
        {import.meta.env.DEV && (
          <Route path="/dev-onboarding" element={<Onboarding />} />
        )}

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

                <Route
                    path="/mixto"
                    element={
                        <ProtectedRoute>
                            <MixtoPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/ranking"
                    element={
                        <ProtectedRoute>
                            <RankingPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/configuracion"
                    element={
                        <ProtectedRoute>
                            <Configuracion />
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
