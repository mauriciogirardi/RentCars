import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { driver_license, email, name, password } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({
      password,
      name,
      email,
      driver_license,
    });

    return response.status(201).send();
  }
}
