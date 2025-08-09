import { execSync } from "child_process"
import { app } from "../src/app"
import request from 'supertest'

describe('Users routes', () => {
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

  it('should create an user', async () => {
    const response = await request(app.server)
      .post('/users')
      .send({
        "name": "John Doe",
        "email": "johndoe@email.com"
      })
      .expect(201)

      const cookies = response.get('Set-Cookie')

      expect(cookies).toEqual(
        expect.arrayContaining([expect.stringContaining('session_id')]),
      )
  })

  it('should list an user', async () => {
    const createResponse = await request(app.server)
      .post('/users')
      .send({
        "name": "John Doe",
        "email": "johndoe@email.com"
      })
      .expect(201)

    const cookies = createResponse.get('Set-Cookie')

    await request(app.server)
      .get('/users')
      .set('Cookie', cookies!)
      .expect(200)
  })
})