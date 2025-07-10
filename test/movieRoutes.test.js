// tests/movieRoutes.test.js
// -------------------------------------------------
// Integration tests for Movie Finder API.
//
// Uses the real OMDb API (network call) so the test
// suite requires a valid OMDB_API_KEY in .env or in
// the GitHub Actions secret.
//
// NOTE: We import jest globals explicitly because the
// project is ESM.
// -------------------------------------------------
import { jest } from '@jest/globals';
import request  from 'supertest';
import app      from '../server.js';

import dotenv from 'dotenv';
dotenv.config();               // loads OMDB_API_KEY

// Allow slower external requests (default is 5 s)
jest.setTimeout(10_000);

describe('Movie Finder API', () => {
  /* ---------- /api/search ---------- */
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

  /* ---------- /api/movies ---------- */
  test('GET /api/movies/:id with invalid id returns 404', async () => {
    const res = await request(app).get('/api/movies/tt0000000');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  test('GET /api/movies/:id with valid id returns object', async () => {
    // Using Batman Begins (2005) as a stable example
    const res = await request(app).get('/api/movies/tt0372784');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('Title', 'Batman Begins');
    expect(res.body).toHaveProperty('imdbID', 'tt0372784');
  });

  /* ---------- Health-check ---------- */
  test('GET / responds with running message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('msg');
  });
});
