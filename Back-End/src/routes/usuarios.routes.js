import { Router } from 'express';
import { actualizarPerfil, registrarUsuario } from '../controllers/usuarios.controller.js';

const router = Router();

router.post('/registro', registrarUsuario);
router.put('/perfil', actualizarPerfil);

export default router;
