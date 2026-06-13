import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CARGAR ENV ANTES QUE CUALQUIER OTRO IMPORT (Evita el hoisting de ESM)
const envPath = path.resolve(__dirname, '../.env');
const envLocalPath = path.resolve(__dirname, '../.env.local');

const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
    console.log('🚀 [NODE_ENV: production] Usando variables de entorno del panel de Vercel.');
}

dotenv.config({ path: envLocalPath, override: !isProd });
dotenv.config({ path: envPath, override: !isProd });

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

// Diagnóstico de variables críticas (sin exponer valores)
console.log('📋 [DIAGNOSTIC] Estado de variables críticas:');
console.log(`- DATABASE_URL: ${process.env.DATABASE_URL ? '✅ DETECTADA' : '❌ FALTANTE'}`);
console.log(`- SUPABASE_URL: ${process.env.SUPABASE_URL ? '✅ DETECTADA' : '❌ FALTANTE'}`);
console.log(`- SUPABASE_ANON_KEY: ${process.env.SUPABASE_ANON_KEY ? '✅ DETECTADA' : '❌ FALTANTE'}`);
console.log(`- GOOGLE_API_KEY: ${process.env.GOOGLE_API_KEY ? '✅ DETECTADA' : '❌ FALTANTE'}`);

const isGeminiMissing = !process.env.GOOGLE_API_KEY || process.env.GOOGLE_API_KEY === 'api_key';

if (isGeminiMissing) {
    console.log('\x1b[33m%s\x1b[0m', 'Atención: faltan las Keys de permiso y GeminiCli no va a dar las respuestas automatizadas, agregar una API Key GRATUITA desde tu cuenta de Google en Google Studio.');
}

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
