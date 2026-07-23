import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import LeccionCompleta from "../components/layouts/LeccionCompleta/LeccionCompleta";
const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <div>

        <h1>Perfil de Usuario</h1>
        <p>Usuario actual: {user?.name}</p>
        <p>Correo: {user?.email}</p>
        <button type="button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </>
  );
};

export default ProfilePage;
