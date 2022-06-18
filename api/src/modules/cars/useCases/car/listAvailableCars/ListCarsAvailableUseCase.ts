import { inject, injectable } from "tsyringe";

import { IListAllCarsDTO } from "../../../dtos/IListAllCarsDTO";
import { Car } from "../../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../../../repositories/ICarsRepository";

@injectable()
export class ListAvailableCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  public async execute({
    brand,
    category_id,
    name,
  }: IListAllCarsDTO): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable({
      brand,
      category_id,
      name,
    });
    return cars;
  }
}
