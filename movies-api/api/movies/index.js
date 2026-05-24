// Movies router - handles TMDB API movie data endpoints
import express from 'express';
import asyncHandler from 'express-async-handler';
import { getMovies } from '../tmdb-api';

const router = express.Router();

// Test route to verify router is working
router.get('/test', (req, res) => {
    console.log('test route hit');
    res.json({ msg: 'movies router working' });
});

// GET discover movies - fetches popular movies from TMDB
router.get('/discover', asyncHandler(async (req, res) => {
    const discoverMovies = await getMovies();
    res.status(200).json(discoverMovies);
}));

export default router;
