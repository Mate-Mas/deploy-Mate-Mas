# InnovaLab - Backend Core

Propuesta de estructura para el Back End del proyecto "Aplicación de aprendizaje de Matemática" en InnovaLab. La arquitectura está diseñada para ser escalable, con formato amigable para trabajo en equipo y compatible con entornos de despliegue serverless en Vercel y PostgreSQL en Supabase.

### Arquitectura Monorepo
El proyecto se gestiona bajo una estructura de **Monorepo** utilizando `pnpm workspaces`. Esta configuración permite mantener el código del Back-End y del Front-End en un único repositorio, facilitando la gestión de dependencias compartidas y scripts de automatización desde la raíz del proyecto.

### Estado Actual: "Mock Mode"
El sistema está configurado actualmente para funcionar con datos estáticos incrustados (Mocks). Esto permite probar los endpoints y la navegación sin necesidad de configurar una base de datos externa.

### Roles y Permisos
- **usuario**: Perfil estándar para participantes. Acceso a lecciones y seguimiento de progreso.
- **admin**: Perfil con permisos de edición sobre contenidos (secciones y ejercicios).
- **superadmin**: Perfil de gestión total, incluyendo edición de contenidos y manejo de credenciales/permisos.

## Stack Tecnológico

- **Runtime:** Node.js v24+
- **Framework:** Express.js v5 (Beta/LTS compatible)
- **ORM:** Prisma v7.8.0
- **Gestor de Paquetes:** pnpm
- **Base de Datos:** PostgreSQL (vía Supabase, necesario en estado "Real Mode" )
- **Despliegue:** Vercel

## Instalación y Ejecución

1. Clonar el repositorio y posicionarse en la raíz.

2. Instalar dependencias globales (desde la raíz):
   ```bash
   pnpm install:all
   ```

3. Generar el cliente de Prisma:
    ```bash
    pnpm prisma generate
    ```

4. Iniciar el servidor en modo desarrollo:
    ```bash
    pnpm dev
    ```

El servidor estará disponible en http://localhost:3001.

## Endpoints Disponibles
- GET `/api/health`: Estado de salud de la API.
- GET `/api/secciones`: Lista de secciones de aprendizaje (Economía Doméstica, Construcción, etc).
- GET `/api/secciones/:id`: Detalle de una sección específica incluyendo sus escenarios.
- GET `/api/secciones/:id/escenarios`: Lista de escenarios para una sección.
- GET `/api/secciones/:id/escenarios/:escenarioId`: Detalle de un escenario con sus ejercicios mockeados.
- POST `/api/usuarios/registro`: Registro de nuevos usuarios o sincronización de perfil.

## Transición a base de datos externa
El código cuenta con lógica "dormida" lista para activar.

Para activar la base de datos:

1. Configurar la URL de "Base de Datos" (Supabase u otra) en el archivo `.env`.
2. Ejecutar las migraciones: `pnpm prisma db push`.
3. Poblar la base de datos: `pnpm prisma db seed`.
4. Cambiar la variable `DB_MODE` a `REAL` en el archivo `.env`.

## Estructura del Proyecto

```text
proyecto-matematicas-grupo8/ (Raíz Monorepo)
├── Back-End/
│   ├── prisma/
│   │   ├── schema.prisma           # Modelos de datos (PostgreSQL)
│   │   └── seed.js                 # Script de población
│   ├── src/
│   │   ├── config/
│   │   │   └── prisma.js           # Configuración Prisma y adaptador
│   │   ├── controllers/            # Lógica de negocio (Mock/Real)
│   │   ├── routes/                 # Definición de endpoints
│   │   └── app.js                  # Punto de entrada Express
│   ├── .env                        # Variables de entorno
│   └── package.json
├── Front-End/                      # Espacio para desarrollo de interfaz
├── package.json                    # Scripts globales de pnpm
└── pnpm-workspace.yaml             # Definición de paquetes del monorepo
```

## Diagrama de Entidad-Relación (ERD)

```mermaid

erDiagram
USUARIO ||--o{ PROGRESO : registra
USUARIO ||--o{ SECCION : escala_de_dificultad
USUARIO }o--o{ INSIGNIA : gana
SECCION ||--o{ ESCENARIOS : contiene
ESCENARIOS ||--o{ INSIGNIA : valída
ESCENARIO ||--o{ PROGRESO : evaluado_en

```


## Diagrama de Clases

```mermaid

classDiagram
    class Usuario {
        +String id
        +String email
        +String nombre
        +Int puntos
        +DateTime createdAt
    }
    class Sección {
        +Int id
        +String titulo
        +String descripcion
        +Int nivel
        +String categoria
    }
    class Escenario {
        +Int id
        +String tipo
        +String pregunta
        +String respuesta
        +List opciones
        +String explicacion
    }
    class Progreso {
        +Int id
        +Boolean completada
        +Int intentosFallidos
        +Int vecesCompletada
        +DateTime updatedAt
    }
    class Insignia {
        +String id
        +String nombre
        +String descripcion
        +String tipo
    }

    Usuario "1" -- "*" Progreso : registra
    Usuario "*" -- "*" Insignia : gana
    Sección "1" -- "*" Escenario : contiene
    Escenario "1" -- "*" Progreso : evaluado_en

```

## Scripts Disponibles

- `pnpm dev`: Inicia el servidor en modo desarrollo con nodemon.
- `pnpm start`: Inicia el servidor en modo producción.
- `pnpm build`: Genera el cliente de Prisma (necesario para el despliegue).


*Propuesta desarrollada para el equipo de Back End - InnovaLab 2026*
