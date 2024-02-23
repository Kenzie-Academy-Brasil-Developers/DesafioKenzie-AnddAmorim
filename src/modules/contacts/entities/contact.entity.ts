import { randomUUID } from "crypto";

export class Contact {
  readonly id: string;
  name: string;
  email: string;
  telephone: string;
  registerDate: Date;
  userId?: string;

  constructor(){
    this.id = randomUUID()
    this.registerDate = new Date()
  };
}
