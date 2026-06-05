import 'dotenv/config';
import express from 'express';
import apiRoutes from './routes/api.routes.js';
import prisma from './config/prisma.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Configuración de CORS para permitir solicitudes desde el frontend
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

const isGeminiMissing = !process.env.GOOGLE_API_KEY || process.env.GOOGLE_API_KEY === 'api_key';

if (isGeminiMissing) {
    console.log('\x1b[33m%s\x1b[0m', 'Atención: están faltando las Keys de permiso y GeminiCli no va a dar las respuestas automatizadas, solo hay que agregar la API Key GRATUITA que encontrás en tu cuenta de Google en Google Studio.');
}

app.use(express.json());

app.use('/api', apiRoutes);

app.get('/', (req, res) => res.send('InnovaLab API Core'));

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

process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
});
