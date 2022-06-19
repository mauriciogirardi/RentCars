import { CarImage } from "../infra/typeorm/entities/CarImage";

export interface ICarsImageRepository {
  create(car_id: string, image_name: string): Promise<CarImage>;
  findById(id: string): Promise<CarImage>;
  delete(id: string): Promise<void>;
}
