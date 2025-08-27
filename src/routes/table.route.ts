import { Router } from "express";
import { TableController } from "../controllers/table.controller";

export const tableRouter = Router();
const tableController = new TableController();

tableRouter.get("/", tableController.getTable);

tableRouter.post("/", tableController.createTable);

tableRouter.patch("/:id", tableController.updateTable);

tableRouter.delete("/:id", tableController.deleteTable);