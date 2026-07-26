import React from 'react';
import { LuBookText, LuX } from 'react-icons/lu';
import './SidebarDesafios.css';

const desafiosList = [
    'Porcentajes',
    'Geometría básica',
    'Finanzas cotidianas',
    'Fracciones y proporciones',
    'Estimulación cognitiva'
];

const SidebarDesafios = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Fondo oscuro traslúcido para cerrar al hacer clic afuera */}
      {/* {isOpen && <div className="sidebar-backdrop" onClick={onClose} />} */}

      {/* Drawer Lateral con animación de grid */}
      <div style={{
        display: "grid",
        gridTemplateRows: isOpen ? "1fr" : "0fr",
        transition: "grid-template-rows 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: isOpen ? "320px" : "0px",
        zIndex: 1000,
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
        boxShadow: isOpen ? "2px 0 10px rgba(0,0,0,0.1)" : "none",
      }}>
        <div style={{
          overflow: "hidden",
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "translateX(0)" : "translateX(-20px)",
          transition: "opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          height: "100vh",
          width: "320px",
          padding: "1.5rem",
          paddingTop: "2rem",
        }}>
          <aside className={`sidebar-desafios ${isOpen ? 'open' : ''}`} style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#FFFFFF",
          }}>
            {/* Botón de Cierre (X) */}
            <button 
              className="sidebar-close-btn" 
              onClick={onClose} 
              aria-label="Cerrar menú"
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "none",
                border: "none",
                cursor: "pointer"
              }}
            >
              <LuX size={24} />
            </button>

            <h2 className="sidebar-title">Desafíos</h2>
            <div className="sidebar-divider" />

            {/* Opción Destacada 1 */}
            <div className="sidebar-item item-highlighted active">
              <div className="item-icon-wrapper">
                <LuBookText size={20} color="#111111" />
              </div>
              <span className="item-text text-bold">Porcentajes</span>
            </div>

            {/* Opción Destacada 2 */}
            <div className="sidebar-item item-highlighted">
              <span className="item-text text-bold">Geometría</span>
            </div>

            <div className="sidebar-divider" />

            <p className="sidebar-subtitle">+ desafíos</p>

            {/* Lista de Desafíos Secundarios */}
            <ul className="sidebar-list">
              {desafiosList.map((desafio, index) => (
                <li key={index} className="sidebar-list-item">
                  {desafio}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </>
  );
};

export default SidebarDesafios;