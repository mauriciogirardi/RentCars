import { ICreateCategoryDTO } from "../dtos/ICreateCategoryDTO";
import { Category } from "../models/Category";

export interface ICategoriesRepository {
  findByName(name: string): Category;
  listAllCategories(): Category[];
  create({ description, name }: ICreateCategoryDTO): void;
}
