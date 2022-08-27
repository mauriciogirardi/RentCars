import { Router } from "express";
import multer from "multer";

import { uploadConfig } from "../../../../config";
import { CreateCarController } from "../../../../modules/cars/useCases/car/createCar/CreateCarController";
import { CreateCarSpecificationController } from "../../../../modules/cars/useCases/car/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "../../../../modules/cars/useCases/car/listAvailableCars/ListAvailableCarsController";
import { DeleteUploadCarImageController } from "../../../../modules/cars/useCases/car/uploadCarImage/DeleteUploadCarImageController";
import { UploadCarImagesController } from "../../../../modules/cars/useCases/car/uploadCarImage/UploadCarImageController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRouter = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationUseCase = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();
const deleteUploadCarImageController = new DeleteUploadCarImageController();

const upload = multer(uploadConfig.upload("./tmp/cars"));

carsRouter.get("/available", listAvailableCarsController.handle);

carsRouter.post(
  "/specification/:id",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationUseCase.handle
);

carsRouter.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRouter.post(
  "/images/:id",
  ensureAuthenticated,
  ensureAdmin,
  upload.array("images"),
  uploadCarImagesController.handle
);

carsRouter.delete(
  "/images/:id",
  ensureAuthenticated,
  ensureAdmin,
  deleteUploadCarImageController.handle
);

export { carsRouter };
