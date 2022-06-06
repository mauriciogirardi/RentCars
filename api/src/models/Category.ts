import { v4 as uuidV4 } from "uuid";

export class Category {
  id?: string;
  name: string;
  created_at: Date;
  description: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
