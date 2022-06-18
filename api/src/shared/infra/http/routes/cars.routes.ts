import { Router } from "express";

import { CreateCarController } from "../../../../modules/cars/useCases/car/createCar/CreateCarController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRouter = Router();

const createCarController = new CreateCarController();

carsRouter.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

export { carsRouter };
