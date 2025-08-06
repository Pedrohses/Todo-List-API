import { FastifyInstance } from "fastify";

export const tasks = (app: FastifyInstance) => {
 app.get('/', async (request, reply) => {
  return reply.status(200).send('Hello world!');
 }) 
}