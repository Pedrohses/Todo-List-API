import { FastifyReply, FastifyRequest } from "fastify"
import { knex } from "../knex"

export const isYourTask = async (request: FastifyRequest, reply: FastifyReply) => {

  const { session_id } = request.cookies
  const { id } = request.params as { id: string }
  
  const userId = await knex('users')
    .select('id')
    .where('session_id', session_id)
    .first()
  
  const task = await knex('tasks')
    .select('*')
    .where('id', id)
    .first()

  if(task.user_id !== userId.id) {
    return reply.status(401).send({ message: 'The task is not your' })
  }
    
  return
}