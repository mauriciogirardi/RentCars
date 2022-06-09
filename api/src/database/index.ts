import "reflect-metadata";
import { DataSource } from "typeorm";

import { Category } from "../modules/cars/models/Category";
import { Specification } from "../modules/cars/models/Specification";

const dataSource = new DataSource({
  type: "postgres",
  host: "database",
  port: 5432,
  username: "docker",
  password: "1234",
  database: "rentx",
  entities: [Category, Specification],
  migrations: ["src/database/migrations/*.ts"],
});

dataSource
  .initialize()
  .then(async () => {
    console.log("Initializing the database...");
  })
  .catch((err) => console.log("Error database ", err));
