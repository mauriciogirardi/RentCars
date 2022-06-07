import { ICreateSpecificationDTO } from "../dtos/ICreateSpecificationDTO";
import { Specification } from "../models/Specification";

export interface ISpecificationRepository {
  findByName(name: string): Specification;
  listAllSpecification(): Specification[];
  create({ description, name }: ICreateSpecificationDTO): void;
}
