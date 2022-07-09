import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { IDateProvider } from "../../../../shared/container/providers/dateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

interface IRequest {
  refresh_token: string;
  password: string;
}

@injectable()
export class ResetPasswordUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,

    @inject("DayJsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  public async execute({ password, refresh_token }: IRequest) {
    const userToken = await this.usersTokensRepository.findByRefreshToken(
      refresh_token
    );

    if (!userToken) throw new AppError("Token invalid!");

    const tokenIsExpired = this.dateProvider.compareIfBefore({
      startDate: userToken.expires_date,
      endDate: this.dateProvider.dateNow(),
    });

    if (tokenIsExpired) throw new AppError("Token expired!");

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) throw new AppError("User not found!");

    user.password = await hash(password, 8);

    await this.usersRepository.create(user);

    await this.usersTokensRepository.deleteById(userToken.id);
  }
}
