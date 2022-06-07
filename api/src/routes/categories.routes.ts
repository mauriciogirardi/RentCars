import { Router } from "express";

import { CategoriesRepository } from "../repositories/CategoriesRepository";
import { CreateCategoryService } from "../services/CreateCategoryService";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  const createCategoryService = new CreateCategoryService(categoriesRepository);
  createCategoryService.execute({ name, description });

  response.status(201).send();
});

categoriesRoutes.get("/", (_, response) => {
  const categories = categoriesRepository.listAllCategories();

  return response.status(200).json(categories);
});

export { categoriesRoutes };
