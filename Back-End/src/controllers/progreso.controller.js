import prisma from '../config/prisma.js';

export const registrarProgreso = async (req, res) => {
    const { usuarioId, escenarioId, opcionId } = req.body;

    try {
        if (process.env.DB_MODE === 'MOCK') {
            return res.json({
                puntosGanados: 60,
                totalPuntos: 60,
                esCorrecto: true,
                feedback: "¡Excelente elección! Como dice la explicación, sumar correctamente es la base para administrar el presupuesto del hogar.",
                rachaActual: 1
            });
        }

        const opcion = await prisma.opcion.findUnique({
            where: { id: parseInt(opcionId) },
            include: { escenario: true }
        });

        if (!opcion || opcion.escenarioId !== parseInt(escenarioId)) {
            return res.status(404).json({ error: 'Opción no válida para este escenario' });
        }

        const esCorrecto = opcion.puntos > 0;

        const progreso = await prisma.progreso.create({
            data: {
                usuarioId,
                escenarioId: parseInt(escenarioId),
                puntosObtenidos: opcion.puntos,
                resuelto: esCorrecto,
                intentosFallidos: esCorrecto ? 0 : 1
            }
        });

        const usuario = await prisma.usuario.update({
            where: { id: usuarioId },
            data: {
                puntos: { increment: opcion.puntos }
            }
        });

        return res.status(201).json({
            puntosGanados: opcion.puntos,
            totalPuntos: usuario.puntos,
            esCorrecto,
            feedback: opcion.escenario.explicacion,
            progresoId: progreso.id
        });
    } catch (error) {
        return res.status(500).json({ error: 'Error al procesar el progreso del usuario' });
    }
};

export const getHistorialUsuario = async (req, res) => {
    const { uid } = req.params;

    try {
        if (process.env.DB_MODE === 'MOCK') {
            return res.json([
                { escenarioId: 1, puntosObtenidos: 10, resuelto: true, updatedAt: new Date() }
            ]);
        }

        const historial = await prisma.progreso.findMany({
            where: { usuarioId: uid },
            include: { escenario: true },
            orderBy: { updatedAt: 'desc' }
        });

        return res.json(historial);
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener el historial' });
    }
};
