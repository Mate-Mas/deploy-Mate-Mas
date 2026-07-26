# Mate+

Una plataforma de entrenamiento para actividades matemáticas de la vida diaria

![Banner](Front-End/src/assets/Visuales_Readme/Banner.png)
![Lupa](Front-End/src/assets/Visuales_Readme/Lupa.png)
---

## Nuestro equipo

<p>
<img src="Front-End/src/assets/Visuales_Readme/Sol.png" alt="Sol" width="80">
<img src="Front-End/src/assets/Visuales_Readme/sofi.png" alt="Sofia" width="80">
<img src="Front-End/src/assets/Visuales_Readme/Romi.png" alt="Romina" width="80">
<img src="Front-End/src/assets/Visuales_Readme/Lis.png" alt="Lisandro" width="80">
<img src="Front-End/src/assets/Visuales_Readme/Isaac.png" alt="Isaac" width="80">
<img src="Front-End/src/assets/Visuales_Readme/Hernan.png" alt="Hernán" width="80">
<img src="Front-End/src/assets/Visuales_Readme/Gus.png" alt="Gustavo" width="80">
<img src="Front-End/src/assets/Visuales_Readme/Flor.png" alt="Flor" width="80">
<img src="Front-End/src/assets/Visuales_Readme/May.png" alt="May" width="80">
<img src="Front-End/src/assets/Visuales_Readme/Tony.png" alt="Tony" width="80">
<img src="Front-End/src/assets/Visuales_Readme/Cesar.png" alt="César" width="80">
</p>

## Backend Core

Pre-Beta 1.0 para el Back End del proyecto "Aplicación de aprendizaje de Matemática" en **InnovaLab**. La arquitectura está diseñada para ser escalable, profesional y compatible con entornos de despliegue serverless en **Vercel** y **PostgreSQL** en **Supabase**.

### Arquitectura

El proyecto se gestiona bajo una estructura de **Monorepo** utilizando `pnpm workspaces`. Esta configuración permite mantener el código del Back-End y del Front-End en un único repositorio "serverless", facilitando la gestión de dependencias compartidas y scripts de automatización desde la raíz del proyecto.

### Modelo de datos

Los archivos ubicados en Back-End/data/*.csv representan el modelo lógico de datos del proyecto.
Durante el desarrollo pueden editarse directamente para agregar registros o modificar datos iniciales.
Puede utilizarse Prisma con estos archivos para que, durante el proceso de inicialización, se pueble automáticamente la base PostgreSQL (Supabase), evitando la edición manual desde el panel web.

#### Stack Tecnológico

- **Runtime:** **Node.js** v24+
- **Framework:** **Express.js** v5 (Beta/LTS compatible)
- **ORM:** **Prisma** v6.4.1 (Stable - Native Engines)
- **Gestor de Paquetes:** `pnpm`
- **Base de Datos:** **PostgreSQL** (vía **Supabase**)
- **Gestor de Registro e Inicio de Sesión:** **Supabase Auth**
- **Despliegue:** **Vercel**
- **Integración LLM-CLI:** **Groq (Llama 3.1 / Qwen)**
- **UX/UI:** Plantilla **FIGMA**

#### Roles y Permisos
- **usuario:** Perfil estándar para participantes. Acceso a escenarios interactivos y seguimiento de progreso.
- **admin:** Perfil con permisos de edición sobre contenidos (Secciones y Escenarios), edición de "prompt" de modelado del CLI pedagógico y acceso a Cuadros Estadísticos.
- **superadmin:** Perfil de gestión total, incluyendo edición de contenidos y manejo de credenciales/permisos.

#### Resiliencia en respuesta LLM-CLI (Fallback):
En caso de que no haya una Key configurada o se excedan los límites de cuota, el sistema activará automáticamente un modo de respaldo. En lugar de fallar, el servidor responderá utilizando la explicación técnica predefinida en el campo `explicacion` de la tabla **Escenarios**.

#### Auditoría
Se mantiene un seguimiento de las actividades de modificación en la tabla Auditoría.

### Nodo Administrativo

Consola de relevamiento y actividades administrativas, con acceso desde dirección web [/ConsolaAdmin](https://deploy-mate-mas-front-end.vercel.app/ConsolaAdmin) y requerimientos de inicio de sesión para su uso, brinda información relativa al estado y funcionamiento del Back-End, el LLM-CLI y la conexión de datos y también es el punto de acceso para los administradores desde el que pueden manejar condiciones y probar resultados del LLM-CLI, crear, editar buscar o eliminar en las tablas de Secciones y Escenarios y acceder a los gráficos de Analisis de Datos en tiempo real.

### Estructura del Proyecto

```bash
proyecto-matematicas-grupo8/
├── Back-End/
│   ├── api/
│   │   └── index.js
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.js
│   ├── src/
│   │   ├── assets
│   │   │   ├── logonodo.png
│   │   │   ├── mascota_32.webp
│   │   │   └── mascota_510.webp
│   │   ├── config/
│   │   │   ├── prisma.js
│   │   │   └── supabase.js
│   │   ├── controllers/
│   │   │   ├── admin.controller.js
│   │   │   ├── auditoria.controller.js
│   │   │   ├── debug.controller.js
│   │   │   ├── escenario.controller.js
│   │   │   ├── progreso.controller.js
│   │   │   ├── seccion.controller.js
│   │   │   └── usuarios.controller.js
│   │   ├── exceptions/
│   │   │   └── api.exception.js
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js
│   │   │   ├── audit.middleware.js
│   │   │   └── error.middleware.js
│   │   ├── routes/
│   │   │   ├── api.routes.js
│   │   │   ├── progreso.routes.js
│   │   │   ├── seccion.routes.js
│   │   │   └── usuarios.routes.js
│   │   ├── services/
│   │   │   └── llm-cli.service.js
│   │   ├── validators/
│   │   │   ├── seccion.validator.js
│   │   │   └── usuarios.validator.js
│   │   └── app.js
│   ├── supabase/
│   │   ├── .gitignore
│   │   └── config.toml
│   ├── .gitignore
│   ├── nodemon.json
│   ├── package.json
│   ├── vercel.json
│   ├── Readme.md
│   └── test.sql
├── Front-End/
├── .gitignore
├── .npmrc
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
└── Readme.md
```

### Diagrama de Entidad-Relación (ERD)

```mermaid
erDiagram
    Usuario ||--o{ Progreso : "registra"
    Usuario ||--o{ SeccionAprobada : "aprueba"
    Usuario ||--o{ Recurso : "posee"
    Usuario ||--o{ Auditoria : "genera"
    Usuario }o--o{ Insignia : "gana"

    Seccion ||--o{ Escenario : "contiene"
    Seccion ||--o{ SeccionAprobada : "es_aprobada_por"
    Seccion ||--o| Recurso : "otorga"

    Escenario ||--o{ Opcion : "ofrece"
    Escenario ||--o{ Insignia : "recompensa_con"
    Escenario ||--o{ Progreso : "mide"

    Usuario {
        string id PK
        string email UK
        string nombre
        int puntos
        int tokens
        Rol rol
        string password
        string edad
        string genero
        string lugar
        string desafio
        string sentimiento
        int racha
        DateTime ultimaConexion
        DateTime createdAt
    }

    Auditoria {
        int id PK
        string usuarioId FK
        string accion
        string entidad
        string entidadId
        Json detalles
        DateTime timestamp
    }

    Seccion {
        int id PK
        string nombre
        string descripcion
        int grado
        int puntosRequeridos
        int puntosRecompensa
        float umbralAprobacion
    }

    SeccionAprobada {
        string usuarioId PK, FK
        int seccionId PK, FK
    }

    Escenario {
        int id PK
        string titulo
        string descripcion
        string pregunta
        string explicacion
        string categoria
        int seccionId FK
    }

    Opcion {
        int id PK
        string texto
        int puntos
        int escenarioId FK
    }

    Recurso {
        string id PK
        string nombre
        int valor
        string usuarioId FK
        int seccionId UK, FK
        DateTime createdAt
    }

    Insignia {
        string id PK
        string nombre
        string descripcion
        string imagenUrl
        int puntosRequeridos
        int escenarioId FK
        DateTime createdAt
    }

    Progreso {
        int id PK
        string usuarioId FK
        int escenarioId FK
        int puntosObtenidos
        boolean resuelto
        int intentosFallidos
        DateTime updatedAt
    }
```

---


### Diagrama de Clases

```mermaid
classDiagram
    class SeccionController {
        +getSecciones(req, res, next)
        +getSeccionById(req, res, next)
        +crearSeccion(req, res, next)
        +eliminarSeccion(req, res, next)
        +actualizarSeccion(req, res, next)
    }

    class UsuariosController {
        +registrarUsuario(req, res, next)
        +loginUsuario(req, res, next)
        +eliminarUsuario(req, res, next)
        +getUsuarios(req, res, next)
        +actualizarPerfil(req, res, next)
        -cleanEnv(val: String) List
    }

    class AdminController {
        <<Protected_Route>>
        +getAdminMain(req, res)
        +getCheckupStatus(req, res, next)
        +testFeedback(req, res, next)
        +getAnalyticsData(req, res, next)
        -checkIA(models: List, retries: int) Object
    }

    class PrismaClient {
        +usuario
        +seccion
        +auditoria
        +progreso
        +$queryRaw()
    }

    class GroqSDK {
        +chat.completions.create(config)
    }

    class Validators {
        <<Utility>>
        +crearEditarSeccionSchema
        +registroSchema
        +perfilSchema
        +loginSchema
    }

    %% Relaciones de uso y dependencia
    SeccionController --> PrismaClient : "consulta / muta datos"
    SeccionController ..> Validators : "valida con Zod"

    UsuariosController --> PrismaClient : "upsert / auth usuarios"
    UsuariosController ..> Validators : "valida credenciales"

    AdminController --> PrismaClient : "agrega métricas y logs"
    AdminController --> GroqSDK : "verifica estado e interactúa"

    note for AdminController "Middleware de Autenticación
    Acceso como admin / superadmin"
```

---
### Historial

- Revisión de tecnologías y arquitectura propuesta.
- Planteo de Proyecto “Math-Path”.
- Planteo de uso de tecnologías ‘pnpm’ y Prisma.
- Planteo de despliegue Vercel “serverless”.
- Primer commit.
- Definición e implementación de Stack.
  · Configuración de modelo y entorno para la base de datos remota (Prisma).
- Esquema de entidades: Usuarios, Sección, Escenario.
  . Lógica en controladores de Secciones y Escenarios.
  · Lógica en controladores de Usuarios, Admin y Superadmin.
- Documentación en “Back-End Readme.md”.
- Actualización en repositorio
- Configuración de Bd de test en PostgreSQL.
  · Migración de esquema ‘Prisma’.
  · Sembrado de datos mock.
  · Configuración de ‘Auth’.
- Configuración e implementación de ‘servidor modular local’ funcional.
- Listado e implementación de endpoints base para testing y pruebas de impacto.
- Actualización de Documentación y repositorio.
- Implementación de Test de LogIn y Registro.
  · Test “local” de ruteo del CRUD de endpoints.
  · Branch de oficio, acceso para Q&A.
- Infraestructura para Prueba de Concepto.
  · Cuentas Google, Supabase y Vercel.
- Inicio de implementación de validaciones.
  · Implementación de biblioteca y esquemas de validación Zod.
Actualización de Back-End en "main"
- Implementación de doble origen de datos
 · con archivos locales y WebDb
- Mecanismo para respuestas de inicio de sesión,
 · registro de usuarios persistente en archivo local
- Nodo administrativo (beta)
 · Gestión de estado Back-End
 · Gestión de asistencia CLI-LLM (beta)
 · Gestión de CRUDs de contenidos (beta)
 · Gestión de grafos estadísticos
Reunión con integrantes de Front-End y Q&A
Actualización de rama “producción-test” eliminando las implementaciones de simulación para Registro, Inicio de sesión y Db, actualización de Documentación
Test de despliegue de Producción activa en Vercel con conexión a WebDb
Revisión y optimización de Back-End

---

*Propuesta desarrollada para el equipo de Back End - InnovaLab 2026*


## INNOVALAB FRONT-END

Aplicación web educativa enfocada en el aprendizaje de matemática para adultos mediante ejercicios interactivos y elementos de gamificación.

El objetivo del proyecto es ofrecer una experiencia de aprendizaje accesible, dinámica y progresiva para personas que desean reforzar conocimientos matemáticos sin frustración ni presión académica tradicional.

--------------------------------------------------------------------------------------

# Tecnologías utilizadas

- React
- Vite
- React Router DOM
- Bootstrap
- React Bootstrap

--------------------------------------------------------------------------------------

# Gestor de paquetes

El proyecto utiliza **pnpm** como gestor de paquetes dentro de una arquitectura monorepo.

## Instalar pnpm globalmente

```bash
npm install -g pnpm
```

---------------------------------------------------------------------------------------

# Instalación y ejecución

## 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
```

---------------------------------------------------------------------------------------

## 2. Ingresar a la carpeta del Front-End

```bash
cd Front-End
```

---------------------------------------------------------------------------------------

## 3. Instalar dependencias

```bash
pnpm install
```

---------------------------------------------------------------------------------------

## 4. Ejecutar entorno de desarrollo

```bash
pnpm dev
```

La aplicación se ejecutará en:

```bash
http://localhost:5173
```

---------------------------------------------------------------------------------------

# Dependencias instaladas

## Crear proyecto con Vite

```bash
pnpm create vite@latest
```

## Bootstrap + React Bootstrap

```bash
pnpm add bootstrap react-bootstrap
```

## React Router DOM

```bash
pnpm add react-router-dom
```

## React Iconos

```bash
pnpm install font-awesome
pnpm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/fontawesome-svg-core
pnpm install @fortawesome/free-regular-svg-icons @fortawesome/free-brands-svg-icons
```



-----------------------------------------------------------------------------------------

# Estructura inicial del proyecto

![alt text](image.png)

```text
Front-End/
├── public/
├── src/
│   ├── assets/          # Imágenes, iconos y recursos estáticos
|       ├──              # Carpeta con el nombre (con los archivos de .jsx y .css)
│   ├── components/      # Componentes reutilizables
│   ├── pages/           # Vistas principales
│   ├── routes/          # Configuración de rutas
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── pnpm-lock.yaml
└── README.md
```

--------------------------------------------------------------------------------------------

# Objetivos iniciales del Front-End

- Construir una interfaz accesible y amigable
- Implementar navegación entre pantallas
- Crear sistema de módulos y micro-lecciones
- Diseñar experiencia gamificada
- Mantener una estructura escalable para trabajo en equipo

---------------------------------------------------------------------------------------------

# Estado actual del proyecto

🚧 Proyecto en etapa inicial de desarrollo.

Actualmente se encuentra en:
- planificación de arquitectura
- organización de componentes
- definición de flujo de usuario
- armado inicial de vistas y navegación

------------------------------------------------------------------------------------------------

# Futuras tecnologías a evaluar

Estas herramientas podrían incorporarse más adelante según las necesidades del proyecto:

- Axios
- Zustand
- React Hook Form
- Zod

-------------------------------------------------------------------------------------------------

# Arquitectura del proyecto

El proyecto forma parte de una arquitectura **Monorepo**, donde Front-End y Back-End conviven dentro de un mismo repositorio para facilitar:
- trabajo colaborativo
- organización del código
- manejo centralizado de dependencias
- scripts compartidos

Ejemplo:

```text
proyecto-matematicas/
├── Front-End/
├── Back-End/
└── package.json
```

-------------------------------------------------------------------------------------------------

# Scripts útiles

## Iniciar entorno de desarrollo

```bash
pnpm dev
```

## Generar build de producción

```bash
pnpm build
```

## Visualizar build localmente

```bash
pnpm preview
```

--------------------------------------------------------------------------------------------------

# Equipo Front-End

*Proyecto desarrollado para InnovaLab 2026.*
