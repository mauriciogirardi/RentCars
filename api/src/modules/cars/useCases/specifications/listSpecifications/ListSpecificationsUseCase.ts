import { inject, injectable } from "tsyringe";

import { Specification } from "../../../entities/Specification";
import { ISpecificationRepository } from "../../../repositories/ISpecificationsRepository";

@injectable()
export class ListSpecificationsUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationRepository
  ) {}

  public async execute(): Promise<Specification[]> {
    const specifications =
      await this.specificationsRepository.listAllSpecification();
    return specifications;
  }
}
