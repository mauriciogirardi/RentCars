import { ICreateSpecificationDTO } from "../../dtos/ICreateSpecificationDTO";
import { Specification } from "../../models/Specification";
import { ISpecificationRepository } from "../ISpecificationsRepository";

export class SpecificationsRepository implements ISpecificationRepository {
  private specifications: Specification[];
  private static INSTANCE: SpecificationsRepository;

  private constructor() {
    this.specifications = [];
  }

  public static getInstance(): SpecificationsRepository {
    if (!SpecificationsRepository.INSTANCE) {
      SpecificationsRepository.INSTANCE = new SpecificationsRepository();
    }

    return SpecificationsRepository.INSTANCE;
  }

  public create({ description, name }: ICreateSpecificationDTO): void {
    const specification: Specification = new Specification();
    Object.assign(specification, {
      name,
      description,
      create_at: new Date(),
    });

    this.specifications.push(specification);
  }

  public listAllSpecification(): Specification[] {
    return this.specifications;
  }

  public findByName(name: string): Specification {
    return this.specifications.find(
      (specification) => specification.name === name
    );
  }
}
