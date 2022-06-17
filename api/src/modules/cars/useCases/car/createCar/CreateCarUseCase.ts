import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../../shared/errors/AppError";
import { ICreateCarDTO } from "../../../dtos/ICreateCarDTO";
import { Car } from "../../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../../../repositories/ICarsRepository";

@injectable()
export class CreateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    name,
    brand,
    daily_rate,
    description,
    fine_amount,
    category_id,
    license_plate,
  }: ICreateCarDTO): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(
      license_plate
    );

    if (carAlreadyExists) {
      throw new AppError("Car already exists!");
    }

    const car = await this.carsRepository.create({
      name,
      brand,
      daily_rate,
      description,
      fine_amount,
      category_id,
      license_plate,
    });

    return car;
  }
}
