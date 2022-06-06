import { Router } from "express";

import { CategoriesRepository } from "../repositories/CategoriesRepository";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (req, res) => {
  const { name, description } = req.body;
  const categoryAlreadyExists = categoriesRepository.findByName(name);

  if (categoryAlreadyExists) {
    return res.status(400).json({ message: "Category name already exists!!" });
  }

  const category = categoriesRepository.create({ name, description });

  return res.status(201).send(category);
});

categoriesRoutes.get("/", (_, res) => {
  const categories = categoriesRepository.listAllCategories();

  return res.status(200).json(categories);
});

export { categoriesRoutes };
