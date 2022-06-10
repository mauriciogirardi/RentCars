import "reflect-metadata";
import { DataSource } from "typeorm";

// docker-compose exec app node --require ts-node/register ./node_modules/typeorm/cli.js migration:run -d src/database
// yarn typeorm migration:create src/database/migrations/CreateCategories

const dataSource = new DataSource({
  type: "postgres",
  port: 5432,
  username: "docker",
  password: "1234",
  database: "database_rentx",
  entities: [],
  migrations: ["src/database/migrations/*.ts"],
  subscribers: [],
  logging: false,
  synchronize: false,
});

export function createConnection(host = "database"): Promise<DataSource> {
  return dataSource.setOptions({ host }).initialize();
}

export default dataSource;
