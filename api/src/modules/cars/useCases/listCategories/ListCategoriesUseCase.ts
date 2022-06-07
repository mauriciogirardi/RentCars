import { Category } from "../../models/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

export class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  public execute(): Category[] {
    return this.categoriesRepository.listAllCategories();
  }
}
