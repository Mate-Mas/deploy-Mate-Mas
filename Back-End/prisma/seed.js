import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.seccion.create({
        data: {
            nombre: 'Economía Doméstica',
            descripcion: 'Repaso de sumas y restas básicas.',
            nivel: 1,
            grado: 1,
            puntosRequeridos: 0,
            escenarios: {
                create: [
                    {
                        titulo: 'La Compra Mensual',
                        descripcion: 'Optimizando el presupuesto del hogar.',
                        pregunta: '¿Cuánto es 15 + 27?',
                        explicacion: 'Al sumar 15 y 27: 5+7 es 12 (me llevo 1), y 1+2+(1 que me llevaba) es 4. Resultado: 42.',
                        categoria: 'Aritmética',
                        opciones: {
                            create: [
                                { texto: '32', puntos: 0 },
                                { texto: '42', puntos: 10 },
                                { texto: '45', puntos: 0 },
                                { texto: '52', puntos: 0 }
                            ]
                        }
                    }
                ]
            }
        }
    });

    console.log('Base de datos poblada con éxito');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
