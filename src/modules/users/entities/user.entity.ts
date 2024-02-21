import { Exclude } from 'class-transformer';
import { randomUUID } from 'node:crypto';

export class User {
  readonly id: string;
  name: string;

  email: string;

  @Exclude()
  password: string;

  telephone: string;

  registerDate: Date;

  constructor() {
    this.id = randomUUID();
    this.registerDate = new Date()
  }
}
