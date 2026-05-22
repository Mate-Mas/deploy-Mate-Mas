import 'dotenv/config';
import pkg from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const { PrismaClient } = pkg

const connectionString = process.env.DATABASE_URL

if (!connectionString && process.env.DB_MODE !== 'MOCK') {
    throw new Error('DATABASE_URL no está definida en las variables de entorno')
}

let prisma;

if (process.env.DB_MODE === 'MOCK') {
    prisma = {
        $disconnect: async () => { },
        seccion: {
            findMany: async () => ([]),
            findUnique: async () => ({})
        },
        escenario: {
            findMany: async () => ([]),
            findFirst: async () => ({})
        },
            opcion: {
                findMany: async () => ([]),
                findUnique: async () => ({})
            },
        usuario: {
            upsert: async () => ({}),
            update: async () => ({})
            },
            progreso: {
                create: async () => ({}),
                findMany: async () => ([]),
                findUnique: async () => ({})
            },
            insignia: {
                findMany: async () => ([]),
                findUnique: async () => ({})
            },
            recurso: {
                findMany: async () => ([]),
                findUnique: async () => ({})
        }
    };
} else {
    const pool = new pg.Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    prisma = new PrismaClient({ adapter });
}

export default prisma
