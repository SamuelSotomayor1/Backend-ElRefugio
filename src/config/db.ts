import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function ConnectDB() {
  try {
    await prisma.$connect();
    console.log("✅ Conectado a PostgreSQL con Prisma");
  } catch (error) {
    console.error("❌ Error al conectar a la DB:", error);
    process.exit(1);
  }
}