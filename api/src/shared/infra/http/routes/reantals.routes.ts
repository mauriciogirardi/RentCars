import { Router } from "express";

import { CreateRentalController } from "../../../../modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "../../../../modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserUseController } from "../../../../modules/rentals/useCases/listRentalsByUser/ListRentalsByUserUseController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalsRouter = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserUseController = new ListRentalsByUserUseController();

rentalsRouter.get(
  "/user",
  ensureAuthenticated,
  listRentalsByUserUseController.handle
);
rentalsRouter.post("/", ensureAuthenticated, createRentalController.handle);
rentalsRouter.post(
  "/devolution/:id",
  ensureAuthenticated,
  devolutionRentalController.handle
);

export { rentalsRouter };
