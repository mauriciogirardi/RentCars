import { Router } from "express";

import { SendForgotPasswordMailController } from "../../../../modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";

const passwordRouter = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();

passwordRouter.post("/forgot", sendForgotPasswordMailController.handle);

export { passwordRouter };
