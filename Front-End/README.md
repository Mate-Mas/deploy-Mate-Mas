# Comandos útiles

Instalar dependencias 

Desde la carpeta raíz 

# Proyecto

Web app realizada con React y Bootstrap

## Tecnologías 

    UI: React + React Router DOM
    Estilos: Bootstrap 
    Formularios: React Hook Form + Zod
    Estado cliente: Zustand (Context)
    Peticiones: Axios

## Estructura de carpetas 

```
src/
├── components/           # Componentes reutilizables
│   ├── ui/               # Componentes UI básicos
│   │   ├── Button.jsx
│   │   ├── Icon.jsx
│   │   ├── Image.jsx
│   │   └── Input.jsx
│   ├── layout/           # Componentes de estructura de página
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── Sidebar.jsx
│   └── widgets/          # Componentes complejos o secciones
│       ├── ProductCard.jsx
│       ├── UserProfile.jsx
│       └── SearchBar.jsx
├── pages/                # Páginas principales
│   ├── Home.jsx          
│   ├── Login.jsx         
│   ├── Registro.jsx
│   ├── About.jsx
│   └── Contact.jsx
└── assets/               # Archivos estáticos (imágenes, iconos, etc.)
```