import dayJs from "dayjs";

import { DayJsDateProvider } from "../../../../shared/container/providers/dateProvider/implementations/DayJsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { CarRepositoryMocks } from "../../../cars/repositories/mocks/CarRepositoryMocks";
import { RentalsRepositoryMocks } from "../../repositories/mocks/RentalsRepositoryMocks";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepositoryMocks: RentalsRepositoryMocks;
let createRentalUseCase: CreateRentalUseCase;
let carsRepositoryMocks: CarRepositoryMocks;
let dateJsDateProvider: DayJsDateProvider;

describe("CreateRentalUseCase", () => {
  const dayAdd24Hours = dayJs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryMocks = new RentalsRepositoryMocks();
    carsRepositoryMocks = new CarRepositoryMocks();
    dateJsDateProvider = new DayJsDateProvider();

    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryMocks,
      dateJsDateProvider,
      carsRepositoryMocks
    );
  });

  it(" should be able to create a new rental", async () => {
    const car = await carsRepositoryMocks.create({
      name: "Test",
      description: "Car Test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it(" should not be able to create a new rental if there is another open to the same user ", async () => {
    await rentalsRepositoryMocks.create({
      car_id: "1111",
      expected_return_date: dayAdd24Hours,
      user_id: "12345",
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: "121212",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("There's a rental in progress for user!"));
  });

  it(" should not be able to create a new rental if there is another open to the same car ", async () => {
    await rentalsRepositoryMocks.create({
      car_id: "test",
      expected_return_date: dayAdd24Hours,
      user_id: "12345",
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "321",
        car_id: "test",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("Car is unavailable!"));
  });

  it(" should not be able to create a new rental with invalid return time ", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "123",
        car_id: "test",
        expected_return_date: dayJs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid return time!"));
  });
});
