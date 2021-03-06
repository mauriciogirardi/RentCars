import { ICreateSpecificationDTO } from "../../dtos/ICreateSpecificationDTO";
import { Specification } from "../../infra/typeorm/entities/Specification";
import { ISpecificationRepository } from "../ISpecificationsRepository";

export class SpecificationsRepositoryMocks implements ISpecificationRepository {
  private specifications: Specification[] = [];

  async findByName(name: string): Promise<Specification> {
    return this.specifications.find(
      (specification) => specification.name === name
    );
  }

  async listAllSpecification(): Promise<Specification[]> {
    return this.specifications;
  }

  async create({
    description,
    name,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
    });

    this.specifications.push(specification);

    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.specifications.filter((specification) =>
      ids.includes(specification.id)
    );
  }
}
