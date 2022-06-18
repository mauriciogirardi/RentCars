import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Category } from "./Category";
import { Specification } from "./Specification";

@Entity("cars")
export class Car {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 20 })
  brand: string;

  @Column()
  category_id: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @Column("numeric")
  daily_rate: number;

  @Column("boolean", { default: true })
  available = true;

  @Column("varchar", { length: 100 })
  description: string;

  @Column("numeric")
  fine_amount: number;

  @Column("varchar", { length: 20 })
  license_plate: string;

  @Column("varchar", { length: 50 })
  name: string;

  @ManyToMany(() => Specification)
  @JoinTable({
    name: "specifications_cars",
    joinColumns: [{ name: "car_id" }],
    inverseJoinColumns: [{ name: "specification_id" }],
  })
  specifications: Specification[];

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
