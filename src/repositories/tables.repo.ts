import { prisma } from "../config/db";
import { Prisma, Table } from "@prisma/client";

export const getAll = async (): Promise<Table[]> => {
  return await prisma.table.findMany();
};

// Crear nueva mesa
export const createNewTable = async (
  data: Prisma.TableCreateInput
): Promise<Table> => {
  return await prisma.table.create({ data });
};

// Verificar si existe una mesa por ID
export const existsTable = async (id: number): Promise<boolean> => {
  const table = await prisma.table.findUnique({
    where: { id },
  });
  return Boolean(table);
};

// Actualizar mesa por ID
export const updateTableById = async (
  id: number,
  data: Prisma.TableUpdateInput
): Promise<Table> => {
  return await prisma.table.update({
    where: { id },
    data,
  });
};

// Eliminar mesa por ID
export const deleteTableById = async (
  id: number
): Promise<Table> => {
  return await prisma.table.delete({
    where: { id },
  });
};