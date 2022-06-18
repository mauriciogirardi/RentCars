import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { IListAllCarsDTO } from "../dtos/IListAllCarsDTO";
import { Car } from "../infra/typeorm/entities/Car";

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findAvailable(data: IListAllCarsDTO): Promise<Car[]>;
  findById(id: string): Promise<Car>;
}
