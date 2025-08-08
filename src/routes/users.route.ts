import { FastifyInstance } from "fastify";
import { knex } from "../knex";
import z, { uuid } from "zod";
import { request } from "http";
import { randomUUID } from "crypto";
import { isLogged } from "../middlewares/is-logged";

export const users = (app: FastifyInstance) => {

  app.post('/', async (request, reply) => {
    const userSchema = z.object({
      name: z.string(),
      email: z.string(),
    })

    const { name, email } = userSchema.parse(request.body)
    const session_id = randomUUID();

    await knex('users').insert({
      id: randomUUID(),
      session_id: session_id,
      name: name,
      email: email,
      created_at: new Date()
    })

    reply
      .setCookie('session_id', session_id)
      .status(201)
      .send('User created with success!')
  })
  
  app.get(
   '/', 
   { preHandler: isLogged },
   async (request, reply) => {
   const { session_id } = request.cookies
  
   const user = await knex('users')
     .select('*')
     .where('session_id', session_id)
  
   return reply.status(200).send(user)
  })
}