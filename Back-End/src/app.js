import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CARGAR ENV ANTES QUE CUALQUIER OTRO IMPORT (Evita el hoisting de ESM)
dotenv.config({
    path: path.resolve(__dirname, '../.env'),
    override: true
});

import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api.routes.js';
import prisma from './config/prisma.js';
import errorHandler from './middlewares/error.middleware.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Configuración de CORS para permitir solicitudes desde el frontend
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use('/api', apiRoutes);
app.use(errorHandler);

app.get('/', (req, res) => res.status(200).send('InnovaLab API Core - Back-End Online'));

if (process.env.NODE_ENV !== 'production') {
    const server = app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });

    server.on('error', (error) => {
        if (error.code === 'EADDRINUSE') {
            console.error(`El puerto ${PORT} ya está en uso. Intentá con otro o matá el proceso anterior.`);
            process.exit(1);
        } else {
            console.error('Error al iniciar el servidor:', error);
            process.exit(1);
        }
    });
}

process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
});

export default app;
