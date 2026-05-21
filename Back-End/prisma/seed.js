import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.leccion.create({
        data: {
            titulo: 'Introducción a la Aritmética',
            descripcion: 'Repaso de sumas y restas básicas.',
            nivel: 1,
            categoria: 'Aritmética',
            ejercicios: {
                create: [
                    {
                        tipo: 'multiple-choice',
                        pregunta: '¿Cuánto es 15 + 27?',
                        opciones: ['32', '42', '45', '52'],
                        respuesta: '42',
                        explicacion: 'Al sumar 15 y 27, 5+7 es 12 (llevo 1), y 1+2+1 es 4. Total: 42.'
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
