import { Router } from "express";

import { SendForgotPasswordMailController } from "../../../../modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";

const passwordRouters = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();

passwordRouters.post("/forgot", sendForgotPasswordMailController.handle);

export { passwordRouters };
