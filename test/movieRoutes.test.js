// tests/movieRoutes.test.js
import { jest } from '@jest/globals';   // 👈 NEW: brings in the jest helpers
import request from 'supertest';
import app from '../server.js';
import dotenv from 'dotenv';
dotenv.config();                        // loads OMDB_API_KEY

// Allow slower network responses (10 s instead of Jest’s default 5 s)
jest.setTimeout(10_000);

describe('Movie Finder API', () => {
  test('GET /api/search with valid title returns array', async () => {
    const res = await request(app)
      .get('/api/search')
      .query({ title: 'batman' });

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
