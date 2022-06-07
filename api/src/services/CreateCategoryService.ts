import { Category } from "../models/Category";
import { CategoriesRepository } from "../repositories/CategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

export class CreateCategoryService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  public execute({ description, name }: IRequest): Category {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error("Category already exists!!");
    }

    const category = this.categoriesRepository.create({ name, description });

    return category;
  }
}
