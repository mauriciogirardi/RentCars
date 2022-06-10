import express from "express";
import swaggerUi from "swagger-ui-express";

import { createConnection } from "./database";
import { routes } from "./routes";
import swaggerFile from "./swagger.json";

createConnection()
  .then(() => {
    console.log("Initialize database!!!");
  })
  .catch((err) => {
    console.log("DATABASE", err);
  });

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(routes);

app.listen(3333, () => console.log("Server is running at port 3333"));
