import { CustomError } from "../middlewares/errorHandler";
import { createNewTable, deleteTableById, existsTable, getAll, updateTableById } from "../repositories/tables.repo";
import { TableSchema, UpdateTableSchema } from "../utils/tableValidator";


// Mostrar todas las mesas
export const getAllTables = async () => {
  const data = await getAll();

  if (data.length === 0) {
    throw new CustomError("No se han encontrado mesas", 404, ["No se han encontrado mesas"]);
  }

  return data;
};

// Crear nueva mesa
export const createTable = async (body: any) => {
  const parsedData = TableSchema.safeParse(body);

  if (!parsedData.success) {
    const message = parsedData.error.issues.map((issue) => issue.message);
    throw new CustomError("Error de validación", 400, message);
  }

  const newTable = await createNewTable(parsedData.data);
  return newTable;
};

// Actualizar mesa por ID    
export const updateTable = async (id: number, body: any) => {
  const exists = await existsTable(id);

  if (!exists) {
    throw new CustomError("Mesa no encontrada", 404, ["Mesa no encontrada"]);
  }

  const parsedData = UpdateTableSchema.safeParse(body);

  if (!parsedData.success) {
    const message = parsedData.error.issues.map((issue) => issue.message);
    throw new CustomError("Error de validación", 400, message);
  }

  const updatedTable = await updateTableById(id, parsedData.data);
  return updatedTable;
};

// Eliminar mesa por ID
export const deleteTable = async (id: number) => {
  const exists = await existsTable(id);

  if (!exists) {
    throw new CustomError("Mesa no encontrada", 404, ["Mesa no encontrada"]);
  }

  const deleted = await deleteTableById(id);
  return deleted;
};