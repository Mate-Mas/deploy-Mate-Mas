import { Router } from 'express';
import seccionRoutes from './seccion.routes.js';
import usuariosRoutes from './usuarios.routes.js';
import progresoRoutes from './progreso.routes.js';

const router = Router();

router.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString()
    });
});

router.use('/secciones', seccionRoutes);
router.use('/usuarios', usuariosRoutes);
router.use('/progreso', progresoRoutes);

export default router;
