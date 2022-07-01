import { inject, injectable } from "tsyringe";

import { IDateProvider } from "../../../../shared/container/providers/dateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository";
import { Rental } from "../../infra/entities/Rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
export class DevolutionRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,

    @inject("CarsRepository")
    private carsRepository: ICarsRepository,

    @inject("DayJsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  public async execute({ id }: IRequest): Promise<Rental> {
    const MINIMUM_DAILY = 1;
    const rental = await this.rentalsRepository.findById(id);

    if (!rental) throw new AppError("Rental does not exists!");
    const car = await this.carsRepository.findById(rental.car_id);

    const dateNow = this.dateProvider.dateNow();
    let daily = this.dateProvider.compareInDays({
      startDate: rental.start_date,
      endDate: dateNow,
    });

    if (daily <= 0) daily = MINIMUM_DAILY;

    const delay = this.dateProvider.compareInDays({
      startDate: dateNow,
      endDate: rental.expected_return_date,
    });

    let total = 0;
    if (delay > 0) {
      total = daily * car.fine_amount;
    }

    total += daily * car.daily_rate;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}
