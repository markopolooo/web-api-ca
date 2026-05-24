import express from 'express';
import Favourite from './favouriteModel';
import asyncHandler from 'express-async-handler';

const router = express.Router();

// Get user's favourites
router.get('/:userId', asyncHandler(async (req, res) => {
    const favourites = await Favourite.find({ userId: req.params.userId });
    res.status(200).json(favourites);
}));

// Add a favourite
router.post('/', asyncHandler(async (req, res) => {
    const { movieId, userId } = req.body;
    const existing = await Favourite.findOne({ movieId, userId });
    if (existing) {
        return res.status(200).json(existing);
    }
    const favourite = await Favourite.create({ movieId, userId });
    res.status(201).json(favourite);
}));

// Remove a favourite
router.delete('/:userId/:movieId', asyncHandler(async (req, res) => {
    await Favourite.deleteOne({ 
        userId: req.params.userId, 
        movieId: req.params.movieId 
    });
    res.status(204).json();
}));

export default router;