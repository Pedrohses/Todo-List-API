import z from "zod";
import dotenv from "dotenv";

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.coerce.number().default(3333),
  DB_CLIENT: z.enum(['sqlite3', 'pg']),
  DB_PATH: z.string()
})

const _env = envSchema.safeParse(process.env)

if(!_env.success) {
  console.error(_env.error.format());
  throw new Error('Environment variables not found')
}

export const env = _env.data

