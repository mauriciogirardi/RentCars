import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../../shared/errors/AppError";
import { Specification } from "../../../infra/typeorm/entities/Specification";
import { ISpecificationRepository } from "../../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationRepository
  ) {}

  public async execute({
    description,
    name,
  }: IRequest): Promise<Specification> {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError("Specification already exists!");
    }

    const specification = await this.specificationsRepository.create({
      description,
      name,
    });

    return specification;
  }
}
