import { inject, injectable } from "tsyringe";

import { Rental } from "../../infra/entities/Rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";

@injectable()
export class ListRentalsByUserUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository
  ) {}
  public async execute(user_id: string): Promise<Rental[]> {
    const rentalsByUser = await this.rentalsRepository.findByUser(user_id);

    return rentalsByUser;
  }
}
