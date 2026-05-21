import 'dotenv/config';
import express from 'express';
import apiRoutes from './routes/api.routes.js';
import prisma from './config/prisma.js';

const app = express();
const PORT = process.env.PORT || 3001;

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
