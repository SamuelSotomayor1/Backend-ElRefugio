import { Router } from "express";
import { ReservationController } from "../controllers/reservation.controller";

export const reservationRouter = Router();
const reservationController = new ReservationController();

reservationRouter.get("/", reservationController.getReservations);

reservationRouter.post("/", reservationController.createReservation);

reservationRouter.patch("/:id", reservationController.updateReservation);

reservationRouter.delete("/:id", reservationController.deleteReservation);