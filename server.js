// server.js
import express from 'express';
import dotenv  from 'dotenv';
import movieRoutes from './src/routes/movieRoutes.js';

dotenv.config();

const app  = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/api', movieRoutes);

// Health-check
app.get('/', (_, res) => res.json({ msg: 'Movie Finder API is running 🚀' }));

// Start server only when not under Jest
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () =>
    console.log(`🐱‍💻  Server ready → http://localhost:${PORT}`)
  );
}

// 🔑 Exported for Supertest
export default app;
