import { Knex } from "knex";

declare module "knex" {
  interface Tables {
    users: {
      id: string,
      sessionId: string,
      name: string,
      email: string,
      createdAt: date
    }
    tasks: {
      id: string,
      userId: string,
      name: string,
      description: string,
      isComplete: boolean,
      createdAt: date
    }
  }
}