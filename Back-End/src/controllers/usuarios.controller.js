import prisma from '../config/prisma.js';

export const registrarUsuario = async (req, res) => {
    const { uid, email, nombre } = req.body;
    try {
        if (process.env.DB_MODE === 'MOCK') {
            const mockUsuario = {
                id: uid || 'mock-id-123',
                email: email || 'usuario@mock.com',
                nombre: nombre || 'Usuario Mock',
                puntos: 0,
                rol: 'usuario',
                createdAt: new Date().toISOString()
            };
            return res.status(201).json(mockUsuario);
        }
        const usuario = await prisma.usuario.upsert({
            where: { id: uid },
            update: { nombre },
            create: {
                id: uid,
                email,
                nombre,
                rol: 'usuario'
            }
        });
        res.status(201).json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
};

export const actualizarPerfil = async (req, res) => {
    const { uid, nombre } = req.body;

    try {
        if (process.env.DB_MODE === 'MOCK') {
            return res.status(200).json({
                id: uid,
                email: 'mock@user.com',
                nombre,
                puntos: 100,
                rol: 'usuario'
            });
        }
        const usuario = await prisma.usuario.update({
            where: {
                id: uid
            },
            data: {
                nombre
            }
        });
        return res.status(200).json(usuario);
    } catch (error) {
        return res.status(500).json({ error: 'Error al actualizar el perfil' });
    }
};
