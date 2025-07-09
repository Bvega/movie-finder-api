// tests/movieRoutes.test.js
import request from 'supertest';
import app from '../server.js';
import dotenv from 'dotenv';
dotenv.config();               // ensures OMDB_API_KEY is loaded

describe('Movie Finder API', () => {
  jest.setTimeout(10000);      // network calls can be slow

  test('GET /api/search with valid title returns array', async () => {
    const res = await request(app).get('/api/search').query({ title: 'batman' });

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('GET /api/search without title returns 400', async () => {
    const res = await request(app).get('/api/search');
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  test('GET /api/movies/:id with invalid id returns 404', async () => {
    const res = await request(app).get('/api/movies/tt0000000');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });
});
