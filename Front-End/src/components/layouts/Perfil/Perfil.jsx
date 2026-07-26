import React, { useState } from 'react';
import Header from '../Desafios/headerDash/HeaderDash';
import fondoCuadrille from '../../../assets/Fondo_error.png'; 
import mascotaPlaceholder from '../../../assets/Foto_perfil.png'; 

function Perfil() {
  // Estado para controlar cuál opción del menú lateral está seleccionada
  const [activeTab, setActiveTab] = useState('tu-inventario');

  const opcionesMenu = [
    { id: 'foto-perfil', label: 'Foto Perfil', icon: '👤' },
    { id: 'tu-inventario', label: 'Tu Inventario', icon: '📦' },
    { id: 'tienda', label: 'Tienda', icon: '🏪' },
    { id: 'marcos-avatar', label: 'Marcos de Avatar', icon: '🖼️' },
  ];

  return (
    <div className="perfil-page-container">
      {/* Header Dashboard superior */}
      <Header />

      {/* Contenedor principal con fondo cuadriculada */}
      <div 
        className="perfil-main-content"
        style={{ backgroundImage: `url(${fondoCuadrille})` }}
      >
        <div className="perfil-layout-grid">
          
          {/* BARRA LATERAL AMARILLA */}
          <aside className="perfil-sidebar">
            <h2 className="sidebar-title">Personalizá</h2>
            <nav className="sidebar-menu">
              {opcionesMenu.map((opcion) => (
                <button
                  key={opcion.id}
                  className={`sidebar-link ${activeTab === opcion.id ? 'is-active' : ''}`}
                  onClick={() => setActiveTab(opcion.id)}
                >
                  <span className="sidebar-icon">{opcion.icon}</span>
                  {opcion.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* CONTENIDO DERECHO */}
          <main className="perfil-details-zone">
            
            {/* Título de la Página */}
            <h1 className="perfil-page-title">Editar tu Perfil</h1>

            {/* Ficha de Información de Usuario (Sin Background) */}
            <section className="perfil-user-header">
              <div className="perfil-avatar-wrapper">
                {/* Reemplazar con la foto real del usuario */}
                <div className="perfil-avatar-circle">🐑</div> 
              </div>
              
              <div className="perfil-user-meta">
                <h2 className="perfil-username">Paula</h2>
                <div className="perfil-badge-tag">
                  As del porcentaje
                </div>
              </div>
            </section>

            {/* CUADRADO BLANCO (DINÁMICO EN EL FUTURO) */}
            <section className="perfil-content-card">
              <div className="placeholder-content">
                <p className="placeholder-text">
                  Sección actual: <strong>{opcionesMenu.find(o => o.id === activeTab)?.label}</strong>
                </p>
                <img 
                  src={mascotaPlaceholder} 
                  alt="Mascota de referencia" 
                  className="placeholder-mascot-img"
                />
                <span className="development-tag">Sección en desarrollo</span>
              </div>
            </section>

          </main>

        </div>
      </div>
    </div>
  );
}

export default Perfil;
