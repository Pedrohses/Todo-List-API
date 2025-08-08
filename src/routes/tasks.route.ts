import { FastifyInstance } from "fastify";
import { knex } from "../knex";
import { isLogged } from "../middlewares/is-logged";
import z from "zod";
import { randomUUID } from "crypto";
import { isYourTask } from "../middlewares/is-your-task";

export const tasks = (app: FastifyInstance) => {

  app.post(
    '/',
    { preHandler: isLogged },
    async (request, reply) => {
      const taskSchema = z.object({
        name: z.string(),
        description: z.string(),
        is_complete: z.boolean()
      })

      const { name, description, is_complete } = taskSchema.parse(request.body)
      const { session_id } = request.cookies

      const { id } = await knex('users')
      .select('id')
      .where('session_id', session_id)
      .first()

      await knex('tasks').insert({
        id: randomUUID(),
        user_id: id,
        name: name,
        description: description,
        is_complete: is_complete,
        created_at: new Date()
      })

      return reply.status(201).send('Task created with success')
  })

  app.get(
    '/',
    { preHandler: [isLogged] },
    async ( request, reply ) => {
    const { session_id } = request.cookies

    const { id } = await knex('users')
      .select('id')
      .where('session_id', session_id)
      .first()

    const tasks = await knex('tasks').select('*').where('user_id', id)

    return reply.status(200).send(tasks)
  })

  app.put(
    '/:id',
    { preHandler: [ isLogged, isYourTask ]},
    async ( request, reply ) => {
      const taskSchema = z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        is_complete: z.boolean().optional()
      })
      const { name, description, is_complete } = taskSchema.parse(request.body)
      const { id } = request.params as { id: string }

      await knex('tasks').update({
        name: name,
        description: description,
        is_complete: is_complete
      }).where('id', id)

      return reply.status(204).send()
    }
  )

  app.delete(
    '/:id',
    { preHandler: [isLogged, isYourTask] },
    async ( request, reply ) => {
    const { id } = request.params as { id: string }

    await knex('tasks').delete().where('id', id)

    return reply.status(204).send()
  })
}