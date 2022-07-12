import { DayJsDateProvider } from "../../../../shared/container/providers/dateProvider/implementations/DayJsDateProvider";
import { MailProviderMock } from "../../../../shared/container/providers/mailProvider/mocks/MailProviderMock";
import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepositoryMock } from "../../repositories/mocks/UsersRepositoryMock";
import { UsersTokensRepositoryMock } from "../../repositories/mocks/UsersTokensRepositoryMock";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersTokensRepositoryMock: UsersTokensRepositoryMock;
let usersRepositoryMock: UsersRepositoryMock;
let mailProviderMock: MailProviderMock;
let dateProvider: DayJsDateProvider;

describe("SendForgotPasswordMailUseCase", () => {
  beforeEach(() => {
    usersTokensRepositoryMock = new UsersTokensRepositoryMock();
    usersRepositoryMock = new UsersRepositoryMock();
    mailProviderMock = new MailProviderMock();
    dateProvider = new DayJsDateProvider();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryMock,
      usersTokensRepositoryMock,
      dateProvider,
      mailProviderMock
    );
  });

  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProviderMock, "sendMail");

    await usersRepositoryMock.create({
      driver_license: "89645",
      email: "jonhdoe@test.com",
      name: "John Doe",
      password: "123456",
    });

    await sendForgotPasswordMailUseCase.execute("jonhdoe@test.com");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send an email if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("notemailexists@test.com")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

  it("should be able to create a users token", async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryMock, "create");

    await usersRepositoryMock.create({
      driver_license: "8965545",
      email: "jonhdoe2@test.com",
      name: "John Doe two",
      password: "123456",
    });

    await sendForgotPasswordMailUseCase.execute("jonhdoe2@test.com");

    expect(generateTokenMail).toBeCalled();
  });
});
