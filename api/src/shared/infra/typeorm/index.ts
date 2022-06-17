import "reflect-metadata";
import { DataSource } from "typeorm";

import { User } from "../../../modules/accounts/infra/typeorm/entities/User";
import { Car } from "../../../modules/cars/infra/typeorm/entities/Car";
import { Category } from "../../../modules/cars/infra/typeorm/entities/Category";
import { Specification } from "../../../modules/cars/infra/typeorm/entities/Specification";

// docker-compose exec app node --require ts-node/register ./node_modules/typeorm/cli.js migration:run -d src/database

// CREATE => yarn typeorm migration:create  src/shared/infra/typeorm/migrations/<Name-migration>
// RUN    => yarn typeorm -d src/shared/infra/typeorm/index.ts  migration:run
// REVERT => yarn typeorm migration:revert

const dataSource = new DataSource({
  type: "postgres",
  port: 5432,
  username: "docker",
  password: "1234",
  database: "database_rentx",
  entities: [Category, Specification, User, Car],
  migrations: ["src/shared/infra/typeorm/migrations/*.ts"],
  subscribers: [],
  logging: false,
  synchronize: false,
});

export function createConnection(host = "database"): Promise<DataSource> {
  return dataSource.setOptions({ host }).initialize();
}

export default dataSource;
