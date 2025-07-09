// src/controllers/movieController.js
// ────────────────────────────────
// All business logic for the Movie Finder API.

import axios from 'axios';
import { OMDB_API_KEY } from '../config/index.js';

const OMDB_BASE_URL = 'http://www.omdbapi.com/';

/**
 * GET /api/search?title=<title>
 * Returns an array of movies matching the search term.
 */
export const searchMovies = async (req, res) => {
  const { title } = req.query;

  // 1) Guard-clause validation
  if (!title?.trim()) {
    return res
      .status(400)
      .json({ error: 'Title query parameter is required' });
  }

  try {
    // 2) Proxy call to OMDb
    const { data } = await axios.get(OMDB_BASE_URL, {
      params: { s: title.trim(), apikey: OMDB_API_KEY }
    });

    // 3) OMDb returns { Response: "False", Error: "Movie not found!" }
    if (data.Response === 'False') {
      return res.status(404).json({ error: data.Error });
    }

    // 4) Happy path
    return res.json(data.Search); // send the array only
  } catch (err) {
    console.error('OMDb search error:', err.message);
    return res
      .status(502)
      .json({ error: 'Upstream OMDb service unreachable' });
  }
};

/**
 * GET /api/movies/:id
 * Returns full details for a specific IMDb ID.
 */
export const getMovieDetails = async (req, res) => {
  const { id } = req.params;

  if (!id?.trim()) {
    return res.status(400).json({ error: 'ID path parameter is required' });
  }

  try {
    const { data } = await axios.get(OMDB_BASE_URL, {
      params: { i: id.trim(), plot: 'full', apikey: OMDB_API_KEY }
    });

    if (data.Response === 'False') {
      return res.status(404).json({ error: data.Error });
    }

    return res.json(data);
  } catch (err) {
    console.error('OMDb details error:', err.message);
    return res
      .status(502)
      .json({ error: 'Upstream OMDb service unreachable' });
  }
};
