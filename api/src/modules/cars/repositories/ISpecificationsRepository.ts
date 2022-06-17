import { ICreateSpecificationDTO } from "../dtos/ICreateSpecificationDTO";
import { Specification } from "../infra/typeorm/entities/Specification";

export interface ISpecificationRepository {
  findByName(name: string): Promise<Specification>;
  listAllSpecification(): Promise<Specification[]>;
  create({ description, name }: ICreateSpecificationDTO): Promise<void>;
}
