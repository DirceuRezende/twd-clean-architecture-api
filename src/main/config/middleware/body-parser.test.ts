import request from 'supertest'
import app from '@/main/config/app'

describe('Body parser middleware', () => {
  it('should parse body as json', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })

    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Dirceu' })
      .expect({ name: 'Dirceu' })
  })
})
