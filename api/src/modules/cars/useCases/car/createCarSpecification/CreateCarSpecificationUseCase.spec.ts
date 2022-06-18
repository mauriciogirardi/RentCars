import { AppError } from "../../../../../shared/errors/AppError";
import { CarRepositoryMocks } from "../../../repositories/mocks/CarRepositoryMocks";
import { SpecificationsRepositoryMocks } from "../../../repositories/mocks/SpecificationsRepositoryMocks";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let carsRepositoryMocks: CarRepositoryMocks;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let specificationsRepositoryMocks: SpecificationsRepositoryMocks;

describe("CreateCarSpecificationUseCase", () => {
  beforeEach(() => {
    carsRepositoryMocks = new CarRepositoryMocks();
    specificationsRepositoryMocks = new SpecificationsRepositoryMocks();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryMocks,
      specificationsRepositoryMocks
    );
  });

  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryMocks.create({
      brand: "Brand",
      name: "Name car",
      daily_rate: 100,
      license_plate: "ABC-4569",
      description: "Description car",
      fine_amount: 60,
      category_id: "category",
    });

    const specification01 = await specificationsRepositoryMocks.create({
      name: "test 01",
      description: "description 01",
    });

    const specification02 = await specificationsRepositoryMocks.create({
      name: "test 02",
      description: "description 02",
    });

    const specifications_id = [specification01.id, specification02.id];

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(2);
  });

  it("shouldn't be able to add a new specification to a now-existent car", () => {
    const car_id = "123";
    const specifications_id = ["321"];

    expect(async () => {
      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
