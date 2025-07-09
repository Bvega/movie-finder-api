// src/config/index.js
// ────────────────────
// Centralised environment-variable access.
// Import this anywhere you need OMDB_API_KEY or PORT.

import dotenv from 'dotenv';
dotenv.config();

export const OMDB_API_KEY = process.env.OMDB_API_KEY;
export const PORT         = process.env.PORT || 3001;
