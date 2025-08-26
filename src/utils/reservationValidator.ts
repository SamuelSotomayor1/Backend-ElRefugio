import { z } from "zod";

// Schema para crear una nueva reserva
export const ReservationSchema = z.object({
  rut: z.string().min(1, "RUT es obligatorio"),
  firstName: z.string().min(1, "Nombre es obligatorio"),
  lastName: z.string().min(1, "Apellido es obligatorio"),
  phone: z.string().min(1, "Teléfono es obligatorio"),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Formato de fecha inválido"
  }),
  time: z.string().min(1, "Hora es obligatoria"),
});

// Schema para actualizar una reserva
export const UpdateReservationSchema = z.object({
  rut: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  date: z.string().optional().refine((val) => !val || !isNaN(Date.parse(val)), {
    message: "Formato de fecha inválido"
  }),
  time: z.string().optional(),
})
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Debes proporcionar al menos un campo para actualizar",
  });