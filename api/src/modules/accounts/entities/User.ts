import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 30 })
  name: string;

  @Column("varchar", { length: 50, unique: true })
  email: string;

  @Column("varchar", { length: 20 })
  password: string;

  @Column("varchar", { length: 10 })
  driver_license: string;

  @Column("boolean", { default: false })
  isAdmin: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
