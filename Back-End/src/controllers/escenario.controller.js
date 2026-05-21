import prisma from '../config/prisma.js';

const escenariosMockData = [
    {
        id: 1,
        titulo: 'La Compra Mensual',
        descripcion: 'Optimizando el carrito del súper con ofertas y cuotas.',
        categoria: 'Aritmética',
        seccionId: 1,
        ejercicios: [
            {
                id: 1,
                tipo: 'multiple-choice',
                pregunta: 'Un producto cuesta $1200, pero tiene un 15% de descuento por pago efectivo. ¿Cuánto pagás?',
                opciones: ['$1000', '$1020', '$1080', '$1100'],
                respuesta: '$1020',
                explicacion: 'El 15% de 1200 es 180. Entonces, 1200 - 180 = 1020.'
            }
        ]
    },
    {
        id: 2,
        titulo: 'Remodelando la Cocina',
        descripcion: 'Cálculo de cerámicas y pintura para renovar el ambiente.',
        categoria: 'Finanzas',
        seccionId: 1,
        ejercicios: []
    }
];

export const getEscenariosBySeccion = async (req, res) => {
    const { seccionId } = req.params;
    try {
        if (process.env.DB_MODE === 'MOCK') {
            const filtrados = escenariosMockData.filter(e => e.seccionId === parseInt(seccionId));
            return res.json(filtrados);
        }
        const escenarios = await prisma.escenario.findMany({
            where: { seccionId: parseInt(seccionId) }
        });
        return res.json(escenarios);
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener escenarios de la sección' });
    }
};

export const getEscenarioBySeccionAndId = async (req, res) => {
    const { seccionId, escenarioId } = req.params;
    try {
        if (process.env.DB_MODE === 'MOCK') {
            const escenario = escenariosMockData.find(
                e => e.id === parseInt(escenarioId) && e.seccionId === parseInt(seccionId)
            );
            if (!escenario) return res.status(404).json({ error: 'No existe el escenario en esta sección' });
            return res.json(escenario);
        }
        const escenario = await prisma.escenario.findFirst({
            where: {
                id: parseInt(escenarioId),
                seccionId: parseInt(seccionId)
            },
            include: { ejercicios: true }
        });
        if (!escenario) return res.status(404).json({ error: 'No existe el escenario en esta sección' });
        return res.json(escenario);
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener el escenario' });
    }
};
