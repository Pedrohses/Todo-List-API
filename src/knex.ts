import { Knex, knex as setupKnex } from 'knex'
import { env } from '../env'

export const config: Knex.Config = {
  client: env.DB_CLIENT,
  connection: env.NODE_ENV === 'production' ? 
  env.DB_PATH : {
    filename: env.DB_PATH
  },
  useNullAsDefault: true,
  migrations: {
    directory: './db/migrations',
    extension: 'ts'
  }
}

export const knex = setupKnex(config)