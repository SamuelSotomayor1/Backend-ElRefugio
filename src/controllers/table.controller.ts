import { NextFunction, Request, Response } from "express";
import { createTable, deleteTable, getAllTables, updateTable } from "../services/table.service";
import { sendResponse } from "../utils/utils";
import { CustomError } from "../middlewares/errorHandler";


export class TableController {
  public getTable = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tables = await getAllTables();
      sendResponse(req, res, tables, 200);
    } catch (error) {
      if (error instanceof CustomError) {
        next(new CustomError(error.message, error.statusCode, error.errors));
        return;
      }
      next(new CustomError("Internal server error", 500, [error]));
    }
  };

  public createTable = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newTable = await createTable(req.body);
      sendResponse(req, res, newTable, 201);
    } catch (error) {
      if (error instanceof CustomError) {
        next(new CustomError(error.message, error.statusCode, error.errors));
        return;
      }
      next(new CustomError("Internal server error", 500, [error]));
    }
  };

  public updateTable = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await updateTable(Number(id), req.body);
      sendResponse(req, res, result, 200);
    } catch (error) {
      if (error instanceof CustomError) {
        next(new CustomError(error.message, error.statusCode, error.errors));
        return;
      }
      next(new CustomError("Internal server error", 500, [error]));
    }
  };
  
  public deleteTable = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await deleteTable(Number(id));
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