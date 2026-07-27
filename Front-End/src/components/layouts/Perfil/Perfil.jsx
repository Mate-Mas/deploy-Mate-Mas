import React, { useState } from 'react';
import Header from '../Desafios/headerDash/HeaderDash'; 
import fondoCuadrille from '../../../assets/fondo_consejo.png';
import fotoPerfilUser from '../../../assets/Foto_perfil.png'; 
import enDesarrolloImg from '../../../assets/inventario.png'; 
import iconInventario from '../../../assets/icono_inventario.png';
import iconAvatar from '../../../assets/icono_avatar.png';
import iconMarcos from '../../../assets/icono_marcos.png';
import iconTitulos from '../../../assets/icono_titulos.png';
import iconMascotas from '../../../assets/icono_mascota.png';

import './Perfil.css';

function Perfil() {
  const [activeTab, setActiveTab] = useState('marcos');

  // Menú ajustado con las imágenes importadas
  const opcionesMenu = [
    { id: 'inventario', label: 'Inventario', iconImg: iconInventario },
    { id: 'avatar', label: 'Avatar', iconImg: iconAvatar },
    { id: 'marcos', label: 'Marcos', iconImg: iconMarcos },
    { id: 'titulos', label: 'Títulos', iconImg: iconTitulos },
    { id: 'mascota', label: 'Mascota', iconImg: iconMascotas },
  ];

  return (
    <div className="perfil-page-container">
      <Header />

      <div 
        className="perfil-main-content"
        style={{ backgroundImage: `url(${fondoCuadrille})` }}
      >
        <div className="perfil-layout-grid">
          
          {/* BARRA LATERAL (SIDEBAR) */}
          <aside className="perfil-sidebar">
            <h2 className="sidebar-title">Editar perfil</h2>
            <nav className="sidebar-menu">
              {opcionesMenu.map((opcion) => (
                <button
                  key={opcion.id}
                  className={`sidebar-link ${activeTab === opcion.id ? 'is-active' : ''}`}
                  onClick={() => setActiveTab(opcion.id)}
                >
                  <div className="sidebar-icon-wrapper">
                    <img src={opcion.iconImg} alt={opcion.label} className="sidebar-icon-img" />
                  </div>
                  <span className="sidebar-label-text">{opcion.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* DETALLES DE LA DERECHA */}
          <main className="perfil-details-zone">
                             
            {/* TARJETA CELESTE DE USUARIO */}
            <section className="perfil-user-card">
              <div className="perfil-avatar-wrapper">
                <img 
                  src={fotoPerfilUser} 
                  alt="Foto de perfil" 
                  className="perfil-user-avatar-img"
                />
              </div>
              
              <div className="perfil-user-meta">
                <h2 className="perfil-username">Paula</h2>
                <div className="perfil-badge-tag">
                  As de la Suma
                </div>
              </div>
            </section>

            {/* TARJETA BLANCA DE CONTENIDO */}
            <section className="perfil-content-card">
              
              {/* Título alineado a la izquierda */}
              <h2 className="content-card-title">
                {opcionesMenu.find(o => o.id === activeTab)?.label || 'Sección'}
              </h2>

              {/* Contenido en Desarrollo (Imagen) */}
              <div className="development-content-wrapper">
                <img 
                  src={enDesarrolloImg} 
                  alt="Sección en desarrollo" 
                  className="development-placeholder-img"
                />
              </div>

              {/* Botón Guardar Cambios */}
              <button type="button" className="save-profile-btn">
                Guardar
              </button>

            </section>

          </main>

        </div>
      </div>
    </div>
  );
}

export default Perfil;