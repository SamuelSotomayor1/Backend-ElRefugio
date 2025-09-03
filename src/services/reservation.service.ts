import { CustomError } from "../middlewares/errorHandler";
import { createNewReservation, deleteReservationById, existsReservation, existsReservationAtDateTime, getAll, getAvailableTables, updateReservationById } from "../repositories/reservation.repo";
import { ReservationSchema, UpdateReservationSchema } from "../utils/reservationValidator";

export const getAllReservations = async () => {
  const data = await getAll();

  if (data.length === 0) {
    throw new CustomError("No se han encontrado reservas", 404, ["No se han encontrado reservas"]);
  }

  return data;
};

// Crear nueva reserva
export const createReservation = async (body: any) => {
  const parsedData = ReservationSchema.safeParse(body);

  if (!parsedData.success) {
    const message = parsedData.error.issues.map((issue) => issue.message);
    throw new CustomError("Error de validación", 400, message);
  }

  // Validación: no puede haber reserva en la misma fecha y hora
  const exists = await existsReservationAtDateTime(parsedData.data.date, parsedData.data.time);
  if (exists) {
    throw new CustomError("Reserva duplicada", 400, ["Ya existe una reserva en esa fecha y hora"]);
  }

  const availableTables = await getAvailableTables(parsedData.data.date, parsedData.data.time);
  if (availableTables.length === 0) {
    throw new CustomError("No hay mesas disponibles", 400, ["No hay mesas disponibles para esa fecha y hora"]);
  }

  // Asignar mesa automáticamente
  parsedData.data.tableId = availableTables[0].id;

  const newReservation = await createNewReservation(parsedData.data);
  return newReservation;
};

// Actualizar reserva por ID
export const updateReservation = async (id: number, body: any) => {
  const exists = await existsReservation(id);

  if (!exists) {
    throw new CustomError("Reserva no encontrada", 404, ["Reserva no encontrada"]);
  }

  const parsedData = UpdateReservationSchema.safeParse(body);

  if (!parsedData.success) {
    const message = parsedData.error.issues.map((issue) => issue.message);
    throw new CustomError("Error de validación", 400, message);
  }

  const updatedReservation = await updateReservationById(id, parsedData.data);
  return updatedReservation;
};

// Eliminar reserva por ID
export const deleteReservation = async (id: number) => {
  const exists = await existsReservation(id);

  if (!exists) {
    throw new CustomError("Reserva no encontrada", 404, ["Reserva no encontrada"]);
  }

  const deleted = await deleteReservationById(id);
  return deleted;
};
