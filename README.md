# Movie Finder API

A lightweight REST gateway that proxies requests to the public OMDb service.

## Endpoints

| Method | Path                     | Description                         |
|--------|--------------------------|-------------------------------------|
| GET    | /api/search?title=batman | Search movies by title (fuzzy)      |
| GET    | /api/movies/tt0372784    | Full details for a specific IMDb ID |
## Example requests



## Quick start

```bash
git clone <repo-url> && cd movie-finder-api
cp .env.example .env   # insert your OMDB_API_KEY
npm install
npm run dev            # http://localhost:3001
