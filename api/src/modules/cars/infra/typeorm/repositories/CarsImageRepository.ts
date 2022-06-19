import { Repository } from "typeorm";

import dataSource from "../../../../../shared/infra/typeorm";
import { ICarsImageRepository } from "../../../repositories/ICarsImageRepository";
import { CarImage } from "../entities/CarImage";

export class CarsImageRepository implements ICarsImageRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = dataSource.getRepository(CarImage);
  }

  public async create(car_id: string, image_name: string): Promise<CarImage> {
    const carImage = this.repository.create({
      car_id,
      image_name,
    });

    await this.repository.save(carImage);

    return carImage;
  }

  public async findById(id: string): Promise<CarImage> {
    const carImage = await this.repository.findOneBy({ id });
    return carImage;
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
