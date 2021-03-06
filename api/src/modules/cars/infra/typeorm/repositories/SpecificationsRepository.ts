import { In, Repository } from "typeorm";

import dataSource from "../../../../../shared/infra/typeorm";
import { ICreateSpecificationDTO } from "../../../dtos/ICreateSpecificationDTO";
import { ISpecificationRepository } from "../../../repositories/ISpecificationsRepository";
import { Specification } from "../entities/Specification";

export class SpecificationsRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = dataSource.getRepository(Specification);
  }

  public async create({
    description,
    name,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);

    return specification;
  }

  public async listAllSpecification(): Promise<Specification[]> {
    const specifications = await this.repository.find();
    return specifications;
  }

  public async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOneBy({ name });
    return specification;
  }

  public async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.repository.findBy({ id: In(ids) });
    return specifications;
  }
}
