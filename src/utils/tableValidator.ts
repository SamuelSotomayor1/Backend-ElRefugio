import { z } from "zod";

// Schema para crear una nueva mesa
export const TableSchema = z.object({
  number: z.number()
    .int("Número de mesa debe ser un número entero")
    .min(1, "Número de mesa debe ser mayor o igual a 1"),

  capacity: z.number()
    .int("Capacidad debe ser un número entero")
    .min(1, "Capacidad debe ser mayor o igual a 1"),
});

// Schema para actualizar una mesa
export const UpdateTableSchema = z.object({
  number: z.number().int().min(1, "Número de mesa debe ser mayor o igual a 1").optional(),
  capacity: z.number().int().min(1, "Capacidad debe ser mayor o igual a 1").optional(),
})
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Debes proporcionar al menos un campo para actualizar",
  });

// Schema para validar params de rutas (ej: /tables/:id)
export const TableIdParamSchema = z.object({
  id: z.number()
    .int("El id debe ser un número entero")
    .min(1, "El id debe ser mayor o igual a 1"),
});