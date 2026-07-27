import prisma from '../config/prisma.js';
import { generarFeedbackPedagogico } from '../services/gemini.service.js';

export const registrarProgreso = async (req, res, next) => {
    const usuarioId = req.user.id;
    const { escenarioId, opcionId, respuestaUsuario } = req.body;

    try {
        let escenario;
        let esCorrecto;
        let puntosPosibles;
        let textoRespuestaUsuario;

        if (opcionId) {
            // Ejercicios tipo opcion_multiple: la respuesta correcta vive en Opcion.esCorrecta
            const opcion = await prisma.opcion.findUnique({
                where: { id: parseInt(opcionId) },
                include: { escenario: { include: { seccion: true } } }
            });

            if (!opcion || opcion.escenarioId !== parseInt(escenarioId)) {
                return res.status(404).json({ error: 'Opción no válida' });
            }

            escenario = opcion.escenario;
            esCorrecto = opcion.puntos > 0;
            puntosPosibles = opcion.puntos;
            textoRespuestaUsuario = opcion.texto;
        } else {
            // Ejercicios tipo numerico: se compara contra Escenario.respuestaCorrecta
            escenario = await prisma.escenario.findUnique({
                where: { id: parseInt(escenarioId) },
                include: { seccion: true }
            });

            if (!escenario || escenario.tipo !== 'numerico') {
                return res.status(400).json({ error: 'Se requiere opcionId, o un escenario de tipo numerico junto con respuestaUsuario' });
            }

            esCorrecto = Number(respuestaUsuario) === Number(escenario.respuestaCorrecta);
            puntosPosibles = 10;
            textoRespuestaUsuario = String(respuestaUsuario);
        }

        const usuario = await prisma.usuario.findUnique({
            where: { id: usuarioId }
        });

        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

        const ultimaConexionBase = usuario.ultimaConexion ? new Date(usuario.ultimaConexion) : new Date();
        const ahora = new Date();
        const diferenciaDias = Math.floor((ahora - ultimaConexionBase) / (1000 * 60 * 60 * 24));

        const progresoExistente = await prisma.progreso.findFirst({
            where: { usuarioId, escenarioId: parseInt(escenarioId) }
        });

        const yaEstabaResuelto = progresoExistente?.resuelto || false;
        const puntosEscenario = (!yaEstabaResuelto && esCorrecto) ? puntosPosibles : 0;

        let feedbackFinal = escenario.explicacion;
        if (!esCorrecto) {
            feedbackFinal = await generarFeedbackPedagogico(
                escenario.pregunta,
                escenario.explicacion,
                textoRespuestaUsuario
            );
        }

        let nuevaRacha = usuario.racha;
        if (diferenciaDias === 1) nuevaRacha += 1;
        else if (diferenciaDias > 1) nuevaRacha = 1;

        if (progresoExistente) {
            await prisma.progreso.update({
                where: { id: progresoExistente.id },
                data: {
                    resuelto: yaEstabaResuelto || esCorrecto,
                    intentosFallidos: esCorrecto ? progresoExistente.intentosFallidos : { increment: 1 },
                    puntosObtenidos: yaEstabaResuelto ? progresoExistente.puntosObtenidos : puntosEscenario
                }
            });
        } else {
            await prisma.progreso.create({
                data: {
                    usuarioId,
                    escenarioId: parseInt(escenarioId),
                    puntosObtenidos: puntosEscenario,
                    resuelto: esCorrecto,
                    intentosFallidos: esCorrecto ? 0 : 1
                }
            });
        }

        await prisma.usuario.update({
            where: { id: usuarioId },
            data: {
                puntos: { increment: puntosEscenario },
                racha: nuevaRacha,
                ultimaConexion: ahora
            }
        });

        const progresosSeccion = await prisma.progreso.findMany({
            where: {
                usuarioId,
                escenario: { seccionId: escenario.seccionId }
            }
        });

        const puntosActualesSeccion = progresosSeccion.reduce((acc, curr) => acc + curr.puntosObtenidos, 0);
        const escenariosSeccion = await prisma.escenario.findMany({
            where: { seccionId: escenario.seccionId },
            include: { opciones: true }
        });

        const puntosMaximosSeccion = escenariosSeccion.reduce((acc, esc) => {
            const maxPuntosOpciones = esc.opciones.length ? Math.max(...esc.opciones.map(o => o.puntos)) : 0;
            const maxPuntosEscenario = esc.tipo === 'numerico' ? Math.max(maxPuntosOpciones, 10) : maxPuntosOpciones;
            return acc + maxPuntosEscenario;
        }, 0);

        const umbral = escenario.seccion?.umbralAprobacion || 0.66;
        const seccionAprobada = puntosActualesSeccion >= (puntosMaximosSeccion * umbral);
        let ganoTokens = 0;
        let nombreSeccionNuevaAprobada = null;

        if (seccionAprobada) {
            const yaAprobada = await prisma.seccionAprobada.findUnique({
                where: { usuarioId_seccionId: { usuarioId, seccionId: escenario.seccionId } }
            });

            if (!yaAprobada) {
                await prisma.seccionAprobada.create({
                    data: { usuarioId, seccionId: escenario.seccionId }
                });
                const seccion = await prisma.seccion.findUnique({ where: { id: escenario.seccionId } });
                ganoTokens = seccion.puntosRecompensa;
                nombreSeccionNuevaAprobada = seccion.nombre;

                await prisma.usuario.update({
                    where: { id: usuarioId },
                    data: { tokens: { increment: ganoTokens } }
                });
            }
        }

        const usuarioFinal = await prisma.usuario.findUnique({ where: { id: usuarioId } });
        const todasDesbloqueadas = await prisma.seccion.findMany({
            where: { puntosRequeridos: { lte: usuarioFinal.puntos } }
        });

        const nuevosDesbloqueos = todasDesbloqueadas.filter(
            s => s.puntosRequeridos > (usuario.puntos || 0) && s.puntosRequeridos <= usuarioFinal.puntos
        );

        return res.status(201).json({
            esCorrecto,
            feedback: feedbackFinal,
            puntosGanados: puntosEscenario,
            puntosTotalesAcademicos: usuarioFinal.puntos,
            tokensActuales: usuarioFinal.tokens,
            tokensGanados: ganoTokens,
            racha: usuarioFinal.racha,
            seccionAprobada: nombreSeccionNuevaAprobada,
            nuevosDesbloqueos: nuevosDesbloqueos.map(s => s.nombre)
        });
    } catch (error) {
        next(error);
    }
};

export const getHistorialUsuario = async (req, res, next) => {
    const { uid } = req.params;
    try {
        const historial = await prisma.progreso.findMany({
            where: { usuarioId: uid },
            include: { escenario: true },
            orderBy: { updatedAt: 'desc' }
        });
        return res.json(historial);
    } catch (error) {
        next(error);
    }
};
