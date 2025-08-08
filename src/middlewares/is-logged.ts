import { FastifyReply, FastifyRequest } from "fastify"
import { knex } from "../knex"

export const isLogged = async (request: FastifyRequest, reply: FastifyReply) => {

  const { session_id } = request.cookies
  
  const user = await knex('users')
      .select('*')
      .where('session_id', session_id)
      .first()
  
  if(!user) {
    return reply
      .status(401)
      .send({ message: "You aren't logged" })
  }
  return
}