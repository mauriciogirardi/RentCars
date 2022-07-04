import "reflect-metadata";
import { DataSource } from "typeorm";

import { User } from "../../../modules/accounts/infra/typeorm/entities/User";
import { UserTokens } from "../../../modules/accounts/infra/typeorm/entities/UserTokens";
import { Car } from "../../../modules/cars/infra/typeorm/entities/Car";
import { CarImage } from "../../../modules/cars/infra/typeorm/entities/CarImage";
import { Category } from "../../../modules/cars/infra/typeorm/entities/Category";
import { Specification } from "../../../modules/cars/infra/typeorm/entities/Specification";
import { Rental } from "../../../modules/rentals/infra/entities/Rental";
import { CreateCategories1655153993770 } from "./migrations/1655153993770-CreateCategories";
import { CreateSpecifications1655163341049 } from "./migrations/1655163341049-CreateSpecifications";
import { CreateUsers1655240006596 } from "./migrations/1655240006596-CreateUsers";
import { AlterUserDeleteUsernama1655244981738 } from "./migrations/1655244981738-AlterUserDeleteUsernama";
import { AlterUserAddAvatar1655323163575 } from "./migrations/1655323163575-AlterUserAddAvatar";
import { CreateCars1655487303987 } from "./migrations/1655487303987-CreateCars";
import { CreateSpecificationsCars1655584223849 } from "./migrations/1655584223849-CreateSpecificationsCars";
import { CreateCarImages1655596739448 } from "./migrations/1655596739448-CreateCarImages";
import { CreateRentals1655760287415 } from "./migrations/1655760287415-CreateRentals";
import { CreateUsersToken1656973609203 } from "./migrations/1656973609203-CreateUsersToken";

// docker-compose exec app node --require ts-node/register ./node_modules/typeorm/cli.js migration:run -d src/database

// CREATE => yarn typeorm migration:create  src/shared/infra/typeorm/migrations/<Name-migration>
// RUN    => yarn migration:run
// REVERT    => yarn migration:revert

const dataSource = new DataSource({
  type: "postgres",
  port: 5432,
  username: "docker",
  password: "1234",
  database: process.env.NODE_ENV === "test" ? "rentx_test" : "database_rentx",
  entities: [Category, Specification, User, Car, CarImage, Rental, UserTokens],
  migrations: [
    CreateCategories1655153993770,
    CreateSpecifications1655163341049,
    CreateUsers1655240006596,
    AlterUserDeleteUsernama1655244981738,
    AlterUserAddAvatar1655323163575,
    CreateCars1655487303987,
    CreateSpecificationsCars1655584223849,
    CreateCarImages1655596739448,
    CreateRentals1655760287415,
    CreateUsersToken1656973609203,
  ],
  subscribers: [],
  logging: false,
  synchronize: false,
});

export function createConnection(host = "database"): Promise<DataSource> {
  return dataSource
    .setOptions({ host: process.env.NODE_ENV === "test" ? "localhost" : host })
    .initialize();
}

export default dataSource;
