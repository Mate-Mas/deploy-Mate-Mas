import prisma from '../config/prisma.js';
import ApiError from '../exceptions/api.error.js';
import { registroSchema, perfilSchema, loginSchema } from '../validators/usuarios.validator.js';

export const registrarUsuario = async (req, res, next) => {
    try {
        const validacion = registroSchema.safeParse(req.body);

        if (!validacion.success) {
            throw validacion.error;
        }

        const { email, nombre, password, edad, genero, lugar, desafio, sentimiento } = validacion.data;
        const uid = req.body.uid;

        if (!uid) {
            return res.status(400).json({ error: "Falta UID de autenticación" });
        }

        const cleanEnv = (val) => (val || "").replace(/[\[\]]/g, "").split(",").map(e => e.trim().toLowerCase()).filter(Boolean);
        const ADMIN_EMAILS = cleanEnv(process.env.ADMIN_EMAILS);
        const SUPERADMIN_EMAILS = cleanEnv(process.env.SUPERADMIN_EMAILS);

        let rolAsignado = 'usuario';
        if (SUPERADMIN_EMAILS.includes(email.toLowerCase())) {
            rolAsignado = 'superadmin';
        } else if (ADMIN_EMAILS.includes(email.toLowerCase())) {
            rolAsignado = 'admin';
        }

        const usuario = await prisma.usuario.upsert({
            where: { id: uid },
            update: { nombre, rol: rolAsignado, password, edad, genero, lugar, desafio, sentimiento },
            create: { id: uid, email, nombre, rol: rolAsignado, password, edad, genero, lugar, desafio, sentimiento }
        });
        console.log(`✅ Usuario sincronizado: ${usuario.email} [${usuario.rol}]`);
        res.status(201).json(usuario);
    } catch (error) {
        next(error);
    }
};

export const loginUsuario = async (req, res, next) => {
    try {
        const validacion = loginSchema.safeParse(req.body);
        if (!validacion.success) {
            throw validacion.error;
        }

        const { email, password } = validacion.data;

        const usuario = await prisma.usuario.findUnique({
            where: { email: email.toLowerCase() } // Convertimos a minúsculas para la búsqueda
        });

        if (!usuario || usuario.password !== password) {
            throw ApiError.unauthorized("Credenciales inválidas (email o contraseña incorrectos)");
        }

        res.status(200).json({
            message: "Login exitoso",
            user: {
                id: usuario.id,
                email: usuario.email,
                nombre: usuario.nombre,
                rol: usuario.rol,
                token: "real-supabase-token-expected" // Este token debería venir de Supabase en el Front-End
            }
        });
    } catch (error) {
        next(error);
    }
};

export const eliminarUsuario = async (req, res, next) => {
    try {
        const uid = req.user.id;
        const { password } = req.body;

        if (!password) {
            throw ApiError.badRequest("Ingresar contraseña para borrar la cuenta");
        }

        const usuario = await prisma.usuario.findUnique({
            where: { id: uid }
        });

        if (!usuario || usuario.password !== password) {
            throw ApiError.unauthorized("Contraseña incorrecta. No se puede borrar la cuenta");
        }

        await prisma.usuario.delete({
            where: { id: uid }
        });

        res.status(200).json({ message: "Cuenta borrada correctamente" });
    } catch (error) {
        next(error);
    }
};

export const getUsuarios = async (req, res, next) => {
    try {
        const usuarios = await prisma.usuario.findMany();
        res.status(200).json(usuarios);
    } catch (error) {
        next(error);
    }
};

export const actualizarPerfil = async (req, res, next) => {
    try {
        const uid = req.user.id;
        const validacion = perfilSchema.safeParse(req.body);

        if (!validacion.success) {
            throw validacion.error;
        }

        const { nombre } = validacion.data;

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
        next(error);
    }
};
