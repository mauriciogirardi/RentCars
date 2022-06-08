import { Specification } from "../../models/Specification";
import { ISpecificationRepository } from "../../repositories/ISpecificationsRepository";

export class ListSpecificationsUseCase {
  constructor(private specificationsRepository: ISpecificationRepository) {}

  public execute(): Specification[] {
    return this.specificationsRepository.listAllSpecification();
  }
}
