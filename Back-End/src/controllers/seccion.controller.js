import prisma from '../config/prisma.js';

const seccionesMockData = [
    { id: 1, nombre: 'Economía Doméstica', descripcion: 'Gestión de gastos, descuentos y presupuestos familiares.', nivel: 1 },
    { id: 2, nombre: 'Taller y Construcción', descripcion: 'Cálculos de áreas, perímetros y materiales para reformas.', nivel: 2 }
];

export const getSecciones = async (req, res) => {
    try {
        if (process.env.DB_MODE === 'MOCK') {
            return res.json(seccionesMockData);
        }
        const secciones = await prisma.seccion.findMany({
            include: { escenarios: true }
        });
        return res.json(secciones);
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener las secciones' });
    }
};

export const getSeccionById = async (req, res) => {
    const { id } = req.params;
    try {
        if (process.env.DB_MODE === 'MOCK') {
            const seccion = {
                id: parseInt(id),
                nombre: 'Economía Doméstica',
                descripcion: 'Gestión de gastos, descuentos y presupuestos familiares.',
                nivel: 1,
                escenarios: [
                    { id: 1, titulo: 'La Compra Mensual', descripcion: 'Optimizando el carrito del súper con ofertas y cuotas.', categoria: 'Aritmética' }
                ]
            };
            return res.json(seccion);
        }
        const seccion = await prisma.seccion.findUnique({
            where: { id: parseInt(id) },
            include: { escenarios: true }
        });
        if (!seccion) {
            return res.status(404).json({ error: 'Sección no encontrada' });
        }
        return res.json(seccion);
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener la sección' });
    }
};
