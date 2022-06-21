import dayJs from "dayjs";

import { DayJsDateProvider } from "../../../../shared/container/providers/dateProvider/implementations/DayJsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { RentalsRepositoryMocks } from "../../repositories/mocks/RentalsRepositoryMocks";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepositoryMocks: RentalsRepositoryMocks;
let createRentalUseCase: CreateRentalUseCase;
let dateJsDateProvider: DayJsDateProvider;

describe("CreateRentalUseCase", () => {
  const dayAdd24Hours = dayJs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryMocks = new RentalsRepositoryMocks();
    dateJsDateProvider = new DayJsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryMocks,
      dateJsDateProvider
    );
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      car_id: "1235996456",
      user_id: "987456",
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("shouldn't be able to create a new rental if there is another open to the same user", () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "123456",
        user_id: "987456",
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        car_id: "12345600",
        user_id: "987456",
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("shouldn't be able to create a new rental if there is another open to the same car", () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "123456",
        user_id: "98745600",
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        car_id: "123456",
        user_id: "98745636",
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("shouldn't be able to create a new rental with invalid return time", () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "123456",
        user_id: "98745636",
        expected_return_date: dayJs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
