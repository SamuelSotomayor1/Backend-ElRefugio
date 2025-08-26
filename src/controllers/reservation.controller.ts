import { NextFunction, Request, Response } from "express";
import { createReservation, deleteReservation, getAllReservations, updateReservation } from "../services/reservation.service";
import { sendResponse } from "../utils/utils";
import { CustomError } from "../middlewares/errorHandler";


export class ReservationController {
  public getReservations = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reservations = await getAllReservations();
      sendResponse(req, res, reservations, 200);
    } catch (error) {
      if (error instanceof CustomError) {
        next(new CustomError(error.message, error.statusCode, error.errors));
        return;
      }
      next(new CustomError("Internal server error", 500, [error]));
    }
  };

  public createReservation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newReservation = await createReservation(req.body);
      sendResponse(req, res, newReservation, 201);
    } catch (error) {
      if (error instanceof CustomError) {
        next(new CustomError(error.message, error.statusCode, error.errors));
        return;
      }
      next(new CustomError("Internal server error", 500, [error]));
    }
  };

  public updateReservation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await updateReservation(Number(id), req.body);
      sendResponse(req, res, result, 200);
    } catch (error) {
      if (error instanceof CustomError) {
        next(new CustomError(error.message, error.statusCode, error.errors));
        return;
      }
      next(new CustomError("Internal server error", 500, [error]));
    }
  };

  public deleteReservation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await deleteReservation(Number(id));
      sendResponse(req, res, result, 204);
    } catch (error) {
      if (error instanceof CustomError) {
        next(new CustomError(error.message, error.statusCode, error.errors));
        return;
      }
      next(new CustomError("Internal server error", 500, [error]));
    }
  };
}