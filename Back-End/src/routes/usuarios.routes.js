import { Router } from 'express';
import { actualizarPerfil, registrarUsuario, eliminarUsuario, getUsuarios, loginUsuario, getPerfil} from '../controllers/usuarios.controller.js';
import { checkAuth } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', checkAuth, getUsuarios);
router.get('/perfil', checkAuth, getPerfil);
router.post('/registro', registrarUsuario);
router.post('/login', loginUsuario);
router.put('/perfil', checkAuth, actualizarPerfil);
router.delete('/eliminar', checkAuth, eliminarUsuario);

export default router;
