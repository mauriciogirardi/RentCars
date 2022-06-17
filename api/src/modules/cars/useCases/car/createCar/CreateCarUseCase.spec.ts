import { AppError } from "../../../../../shared/errors/AppError";
import { CarRepositoryMocks } from "../../../repositories/mocks/CarRepositoryMocks";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carRepositoryMocks: CarRepositoryMocks;

describe("CreateCarUseCase", () => {
  beforeEach(() => {
    carRepositoryMocks = new CarRepositoryMocks();
    createCarUseCase = new CreateCarUseCase(carRepositoryMocks);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      brand: "Brand",
      name: "Name car",
      daily_rate: 100,
      license_plate: "ABC-4569",
      description: "Description car",
      fine_amount: 60,
      category_id: "category",
    });

    expect(car).toHaveProperty("id");
  });

  it("shouldn't be able to create a car with exists license plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car 1",
        brand: "Brand",
        daily_rate: 100,
        license_plate: "ABC-4569",
        description: "Description car",
        fine_amount: 60,
        category_id: "category",
      });

      await createCarUseCase.execute({
        name: "Car 2",
        brand: "Brand",
        daily_rate: 100,
        license_plate: "ABC-4569",
        description: "Description car",
        fine_amount: 60,
        category_id: "category",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a new car with available as true", async () => {
    const car = await createCarUseCase.execute({
      brand: "Brand",
      name: "Name car",
      daily_rate: 100,
      license_plate: "AHH-4569",
      description: "Description car",
      fine_amount: 60,
      category_id: "category",
    });

    expect(car.available).toBe(true);
  });
});
