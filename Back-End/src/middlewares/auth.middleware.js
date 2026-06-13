import supabase from '../config/supabase.js';
import prisma from '../config/prisma.js';

export const checkAuth = async (req, res, next) => {
    // Limpiamos posibles corchetes o espacios que alguien haya metido en el .env por error
    const cleanEnv = (val) => (val || "").replace(/[\[\]]/g, "").split(",").map(e => e.trim().toLowerCase()).filter(Boolean);
    const ADMIN_EMAILS = cleanEnv(process.env.ADMIN_EMAILS);
    const SUPERADMIN_EMAILS = cleanEnv(process.env.SUPERADMIN_EMAILS);

    const authHeader = req.headers.authorization;
    // Buscamos el token en: Header, Parámetro URL o Cookie (para el navegador)
    const cookieToken = req.headers.cookie?.match(/access_token=([^;]+)/)?.[1];
    const token = authHeader?.split(' ')[1] || req.query.token || cookieToken;

    if (!token) {
        return res.status(401).json({ error: 'No se proporcionó un token de acceso (Bearer token missing)' });
    }

    try {
        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            console.error('🔴 [AUTH ERROR] Supabase rechazó el token:', error?.message || 'Usuario no encontrado');
            return res.status(401).json({ error: 'Token inválido o expirado' });
        }

        let rolFinal = 'usuario';
        const userEmail = user.email?.toLowerCase();

        console.log(`🔐 [AUTH] Verificando rol para: ${userEmail}`);

        if (SUPERADMIN_EMAILS.includes(userEmail)) {
            rolFinal = 'superadmin';
        } else if (ADMIN_EMAILS.includes(userEmail)) {
            rolFinal = 'admin';
        } else {
            const dbUser = await prisma.usuario.findUnique({ where: { id: user.id }, select: { rol: true } });
            rolFinal = dbUser?.rol || 'usuario';
        }

        req.user = { ...user, rol: rolFinal };
        next();
    } catch (err) {
        next(err);
    }
};

export const checkRole = (rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.user || !rolesPermitidos.includes(req.user.rol)) {
            return res.status(403).json({ error: 'Acceso denegado: privilegios insuficientes' });
        }
        next();
    };
};
