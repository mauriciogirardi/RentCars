import { ICreateCategoryDTO } from "../dtos/ICreateCategoryDTO";
import { Category } from "../infra/typeorm/entities/Category";

export interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;
  listAllCategories(): Promise<Category[]>;
  create({ description, name }: ICreateCategoryDTO): Promise<void>;
}
