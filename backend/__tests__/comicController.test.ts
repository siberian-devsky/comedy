import request from 'supertest'
import app from '../src/app'

import { describe, expect } from '@jest/globals'
// import { FindComicByName } from '../src/controllers/comicController'

// test getting a single person
describe('GET /api/v1/getcomic/:name', () => {
  it('should return data in the shape of PersonDetail', async () => {
    const res = await request(app).get('/api/v1/getcomic/Dave%20Chappelle')
    expect(res.status).toBe(200)

    const data = res.body.data
    expect(typeof data.name).toBe('string')
    expect(typeof data.id).toBe('number')
  })
})

// test 404
describe('GET /api/v1/getcomic/:name', () => {
  it('should return 404', async () => {
    const res = await request(app).get('/api/v1/getcomic/shnonk%20mcderby')
    expect(res.status).toBe(404)
  })
})

//test fallback (Your Host!....Dave Chappelllllle!!!!)
describe('GET /api/v1/getcomic/:name', () => {
  it('should return 400 when name is missing', async () => {
    const res = await request(app).get('/api/v1/getcomic')
    expect(res.status).toBe(400)
    expect(res.body.error).toMatch(/missing/i)
  })
})
