import { CarRepositoryMocks } from "../../../repositories/mocks/CarRepositoryMocks";
import { ListAvailableCarsUseCase } from "./ListCarsAvailableUseCase";

let listCarsAvailableUseCase: ListAvailableCarsUseCase;
let carsRepositoryMocks: CarRepositoryMocks;

describe("ListCarsUseCase", () => {
  beforeEach(() => {
    carsRepositoryMocks = new CarRepositoryMocks();
    listCarsAvailableUseCase = new ListAvailableCarsUseCase(
      carsRepositoryMocks
    );
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryMocks.create({
      name: "Gol g1",
      brand: "Volkswagen",
      daily_rate: 150,
      description: "Car description",
      fine_amount: 60,
      category_id: "79eae89d-fc43-4315-9510-0db9f12f790b",
      license_plate: "MLF-4345",
    });

    const cars = await listCarsAvailableUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryMocks.create({
      name: "Gol g1",
      brand: "Volkswagen",
      daily_rate: 150,
      description: "Car description",
      fine_amount: 60,
      category_id: "79eae89d-fc43-4315-9510-0db9f12f790b",
      license_plate: "MLF-4345",
    });

    const cars = await listCarsAvailableUseCase.execute({
      brand: "Volkswagen",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryMocks.create({
      name: "Gol g1",
      brand: "Volkswagen",
      daily_rate: 150,
      description: "Car description",
      fine_amount: 60,
      category_id: "79eae89d-fc43-4315-9510-0db9f12f790b",
      license_plate: "MLF-4345",
    });

    const cars = await listCarsAvailableUseCase.execute({
      name: "Gol g1",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryMocks.create({
      name: "Gol g1",
      brand: "Volkswagen",
      daily_rate: 150,
      description: "Car description",
      fine_amount: 60,
      category_id: "123456",
      license_plate: "MLF-4345",
    });

    const cars = await listCarsAvailableUseCase.execute({
      category_id: "123456",
    });

    expect(cars).toEqual([car]);
  });
});
