import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../../shared/errors/AppError";
import { ICarsImageRepository } from "../../../repositories/ICarsImageRepository";

@injectable()
export class DeleteUploadCarImageUseCase {
  constructor(
    @inject("CarsImageRepository")
    private carsImageRepository: ICarsImageRepository
  ) {}

  public async execute(id: string): Promise<void> {
    const carImageExists = await this.carsImageRepository.findById(id);

    if (!carImageExists) throw new AppError("Car image not exists!");

    await this.carsImageRepository.delete(carImageExists.id);
  }
}
