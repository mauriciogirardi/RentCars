import { ISpecificationRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

export class CreateSpecificationUseCase {
  constructor(private specificationsRepository: ISpecificationRepository) {}

  public execute({ description, name }: IRequest): void {
    const specificationAlreadyExists =
      this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error("Specification with name already exists!!");
    }

    this.specificationsRepository.create({ description, name });
  }
}
