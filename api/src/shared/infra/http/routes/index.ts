import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { carsRouter } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { passwordRouters } from "./password.routes";
import { rentalsRouter } from "./reantals.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRouter } from "./users.routes";

const routes = Router();

routes.use("/specifications", specificationsRoutes);
routes.use("/categories", categoriesRoutes);
routes.use("/password", passwordRouters);
routes.use("/rentals", rentalsRouter);
routes.use("/users", usersRouter);
routes.use("/cars", carsRouter);
routes.use(authenticateRoutes);

export { routes };
