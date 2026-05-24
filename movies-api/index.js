// Main Express server setup for the movies API
import dotenv from 'dotenv';
import moviesRouter from './api/movies';
import express from 'express';
import './db'; // Initialize MongoDB connection
import cors from 'cors';
import usersRouter from './api/users';
import authenticate from './authenticate'; // JWT authentication middleware
import favouritesRouter from './api/favourites/index.js';

dotenv.config();

// Error handler middleware - returns generic error in production, detailed in development
const errHandler = (err, req, res, next) => {
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).json({ error: 'Something went wrong!' });
  }
  res.status(500).json({ error: err.message });
};

const app = express();
const port = process.env.PORT;

// Enable CORS for cross-origin requests
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Route for public movies API endpoints
app.use('/api/movies', moviesRouter);

// Route for user favourites (protected with JWT authentication)
app.use('/api/favourites', authenticate, favouritesRouter);

// Route for user registration and login
app.use('/api/users', usersRouter);

// Serve static files from public directory
app.use(express.static('public'));

// Apply error handler to all requests
app.use(errHandler);

// Start server
app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
