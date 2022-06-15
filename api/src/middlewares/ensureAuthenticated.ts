import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new Error("Token missing!");

  const [, token] = authHeader.split(" ");

  try {
    const { sub: userId } = verify(
      token,
      "13de1bd496d378ab00efac59f92fd7bc"
    ) as IPayload;
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(userId);
    if (!user) throw new Error("User does not exists!");

    next();
  } catch {
    throw new Error("Invalid token!");
  }
}
