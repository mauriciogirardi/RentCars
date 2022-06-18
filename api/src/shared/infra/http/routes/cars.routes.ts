import { Router } from "express";

import { CreateCarController } from "../../../../modules/cars/useCases/car/createCar/CreateCarController";
import { ListAvailableCarsController } from "../../../../modules/cars/useCases/car/listAvailableCars/ListAvailableCarsController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRouter = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();

carsRouter.get("/available", listAvailableCarsController.handle);

carsRouter.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

export { carsRouter };
