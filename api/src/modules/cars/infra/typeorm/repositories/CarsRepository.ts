import { Repository } from "typeorm";

import dataSource from "../../../../../shared/infra/typeorm";
import { ICreateCarDTO } from "../../../dtos/ICreateCarDTO";
import { IListAllCarsDTO } from "../../../dtos/IListAllCarsDTO";
import { ICarsRepository } from "../../../repositories/ICarsRepository";
import { Car } from "../entities/Car";

export class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = dataSource.getRepository(Car);
  }

  public async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      specifications,
      id,
    });

    await this.repository.save(car);

    return car;
  }

  public async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOneBy({ license_plate });
    return car;
  }

  public async findById(id: string): Promise<Car> {
    const car = await this.repository.findOneBy({ id });
    return car;
  }

  public async findAvailable({
    brand,
    category_id,
    name,
  }: IListAllCarsDTO): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder("c")
      .where("available = :available", { available: true });

    if (brand) carsQuery.andWhere("c.brand = :brand", { brand });
    if (name) carsQuery.andWhere("c.name = :name", { name });
    if (category_id)
      carsQuery.andWhere("c.category_id = :category_id", { category_id });

    const cars = await carsQuery.getMany();

    return cars;
  }

  public async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where("id = :id")
      .setParameters({ id })
      .execute();
  }
}
