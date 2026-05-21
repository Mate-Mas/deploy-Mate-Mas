import { Router } from 'express';
import { getSecciones, getSeccionById } from '../controllers/seccion.controller.js';
import { getEscenariosBySeccion, getEscenarioBySeccionAndId } from '../controllers/escenario.controller.js';

const router = Router();

router.get('/', getSecciones);
router.get('/:id', getSeccionById);

router.get('/:seccionId/escenarios', getEscenariosBySeccion);
router.get('/:seccionId/escenarios/:escenarioId', getEscenarioBySeccionAndId);

export default router;
