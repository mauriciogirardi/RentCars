import { Router } from "express";

import { CreateSpecificationController } from "../../../../modules/cars/useCases/specifications/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "../../../../modules/cars/useCases/specifications/listSpecifications/ListSpecificationsController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const specificationsRoutes = Router();

const listSpecificationsController = new ListSpecificationsController();
const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle
);
specificationsRoutes.get(
  "/",
  ensureAuthenticated,
  listSpecificationsController.handle
);

export { specificationsRoutes };
