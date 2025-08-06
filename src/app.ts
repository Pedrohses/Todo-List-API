import fastify from "fastify";
import { users } from "./routes/users.route";
import cookie from '@fastify/cookie'
import { tasks } from "./routes/tasks.route";

export const app = fastify()

app.register(cookie)

app.register(users, { prefix: '/users' })
app.register(tasks, { prefix: '/tasks' })