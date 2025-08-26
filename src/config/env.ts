import { config } from "dotenv";
config();

const {
  DATABASE_URL,
  PORT
} = process.env;

export const envConfig = {
  port: PORT || 3000,        // por si no está definida, usamos 3000 por defecto
  databaseUrl: DATABASE_URL  // Prisma tomará esta URL
};