import { execSync } from "child_process"
import { app } from "../src/app"
import request from 'supertest'

describe('Task routes', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  beforeEach(() => {
    execSync('npm run knex -- migrate:latest')
  })  
  
  afterEach(() => {
    execSync('npm run knex -- migrate:rollback --all')
  })

  it('should create a task', async () => {
    const user = await request(app.server)
      .post('/users')
      .send({
        "name": "John Doe",
        "email": "johndoe@email.com"
      })
      .expect(201)

    const cookies = user.get('Set-Cookie')

    await request(app.server)
      .post('/tasks')
      .set('Cookie', cookies!)
      .send({
          "name": "Lavar a casa",
          "description": "Consiste em lavar os comodos da casa",
          "is_complete": false
      })
      .expect(201)
  })

  it('should list users tasks', async () => {
    const user = await request(app.server)
      .post('/users')
      .send({
        "name": "John Doe",
        "email": "johndoe@email.com"
      })
      .expect(201)

    const cookies = user.get('Set-Cookie')

    await request(app.server)
      .post('/tasks')
      .set('Cookie', cookies!)
      .send({
          "name": "Lavar a casa",
          "description": "Consiste em lavar os comodos da casa",
          "is_complete": false
      })
      .expect(201)
  })

  it('should list delete user task', async () => {
    const user = await request(app.server)
      .post('/users')
      .send({
        "name": "John Doe",
        "email": "johndoe@email.com"
      })
      .expect(201)

    const cookies = user.get('Set-Cookie')

    await request(app.server)
      .post('/tasks')
      .set('Cookie', cookies!)
      .send({
          "name": "Lavar a casa",
          "description": "Consiste em lavar os comodos da casa",
          "is_complete": false
      })
      .expect(201)
    
    const response = await request(app.server)
      .get('/tasks')
      .set('Cookie', cookies!)

    await request(app.server)
      .delete(`/tasks/${response.body[0].id}`)
      .set('Cookie', cookies!)
      .expect(204)
  })

  it('should update user task', async () => {
    const user = await request(app.server)
      .post('/users')
      .send({
        "name": "John Doe",
        "email": "johndoe@email.com"
      })
      .expect(201)

    const cookies = user.get('Set-Cookie')

    await request(app.server)
      .post('/tasks')
      .set('Cookie', cookies!)
      .send({
          "name": "Lavar a casa",
          "description": "Consiste em lavar os comodos da casa",
          "is_complete": false
      })
      .expect(201)
    
    const response = await request(app.server)
      .get('/tasks')
      .set('Cookie', cookies!)

    await request(app.server)
      .put(`/tasks/${response.body[0].id}`)
      .set('Cookie', cookies!)
      .send({
          "name": "Fazer a comida",
          "description": "Consiste em fazer comida para a semana toda",
          "is_complete": true
      })
      .expect(204)
  })
})