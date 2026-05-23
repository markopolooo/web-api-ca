
import express from 'express';
import asyncHandler from 'express-async-handler';
import { getMovies } from '../tmdb-api'; 


const router = express.Router();

router.get('/test', (req, res) => {
    console.log('test route hit');
    res.json({ msg: 'movies router working' });
});

router.get('/discover', asyncHandler(async (req, res) => {
    const discoverMovies = await getMovies();
    res.status(200).json(discoverMovies);
}));


export default router;
