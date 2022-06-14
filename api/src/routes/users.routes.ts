import { Router } from "express";

import { CreateUserController } from "../modules/accounts/useCases/user/CreateUserController";

const usersRouter = Router();

const createUserController = new CreateUserController();

usersRouter.post("/", createUserController.handle);

export { usersRouter };
