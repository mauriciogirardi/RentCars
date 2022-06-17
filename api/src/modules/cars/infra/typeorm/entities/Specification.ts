import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("specifications")
export class Specification {
  @PrimaryColumn("uuid")
  id?: string;

  @Column("varchar", { length: 20 })
  name: string;

  @Column("varchar", { length: 100 })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
