import { Router } from "express";

import { SpecificationsRepository } from "../modules/cars/repositories/implementations/SpecificationsRepository";
import { CreateSpecificationService } from "../modules/cars/services/CreateSpecificationService";

const specificationsRoutes = Router();
const specificationsRepository = new SpecificationsRepository();

specificationsRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  const createSpecificationService = new CreateSpecificationService(
    specificationsRepository
  );
  createSpecificationService.execute({ description, name });

  response.status(201).send();
});

specificationsRoutes.get("/", (request, response) => {
  const specifications = specificationsRepository.listAllSpecification();
  return response.status(200).json(specifications);
});

export { specificationsRoutes };
