import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryMock } from "../../repositories/mocks/UsersRepositoryMock";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepositoryMock: UsersRepositoryMock;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("AuthenticateUserUserCase", () => {
  beforeEach(() => {
    usersRepositoryMock = new UsersRepositoryMock();
    createUserUseCase = new CreateUserUseCase(usersRepositoryMock);
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryMock);
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "64651212",
      name: "John Doe",
      email: "john@exemplo.com",
      password: "123456",
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("shouldn't be able to authenticate an nonexistent user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "false@exemplo.com",
        password: "123456",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect!"));
  });

  it("shouldn't be able to authenticate with incorrect password", async () => {
    const user: ICreateUserDTO = {
      driver_license: "64651212",
      name: "John Doe",
      email: "john@exemplo.com",
      password: "123456",
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: "john@exemplo.com",
        password: "123456987",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect!"));
  });
});
