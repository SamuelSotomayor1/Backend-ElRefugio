import { prisma } from "../config/db";
import { Reservation, Prisma } from "@prisma/client";

// Obtener todas las reservas
export const getAll = async (): Promise<Reservation[]> => {
  return await prisma.reservation.findMany();
};

// Crear nueva reserva
export const createNewReservation = async (
  data: Prisma.ReservationUncheckedCreateInput
): Promise<Reservation> => {
  return await prisma.reservation.create({ data });
};

// Verificar si existe una reserva por ID
export const existsReservation = async (id: number): Promise<boolean> => {
  const reservation = await prisma.reservation.findUnique({
    where: { id },
  });
  return Boolean(reservation);
};

// Verificar si existe una reserva en la misma fecha y hora
export const existsReservationAtDateTime = async (
  date: string | Date,
  time: string,
  tableId?: number
): Promise<boolean> => {
  const reservation = await prisma.reservation.findFirst({
    where: {
      date: new Date(date),
      time,
      ...(tableId ? { tableId } : {}),
    },
  });

  return Boolean(reservation);
};

// Actualizar reserva por ID
export const updateReservationById = async (
  id: number,
  data: Prisma.ReservationUncheckedUpdateInput
): Promise<Reservation> => {
  return await prisma.reservation.update({
    where: { id },
    data,
  });
};

// Eliminar reserva por ID
export const deleteReservationById = async (
  id: number
): Promise<Reservation> => {
  return await prisma.reservation.delete({
    where: { id },
  });
};