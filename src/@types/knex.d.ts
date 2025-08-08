import { Knex } from "knex";

declare module "knex" {
  interface Tables {
    users: {
      id: string,
      session_id: string,
      name: string,
      email: string,
      created_at: date
    }
    tasks: {
      id: string,
      user_id: string,
      name: string,
      description: string,
      is_complete: boolean,
      created_at: date
    }
  }
}