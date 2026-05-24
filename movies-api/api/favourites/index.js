// Favourites router - handles user's favorite movies (CRUD operations)
import express from 'express';
import Favourite from './favouriteModel';
import asyncHandler from 'express-async-handler';

const router = express.Router();

// GET user's favourites by userId
router.get('/:userId', asyncHandler(async (req, res) => {
    const favourites = await Favourite.find({ userId: req.params.userId });
    res.status(200).json(favourites);
}));

// POST add a favourite movie (prevents duplicates)
router.post('/', asyncHandler(async (req, res) => {
    const { movieId, userId } = req.body;
    // Check if movie is already favorited by user
    const existing = await Favourite.findOne({ movieId, userId });
    if (existing) {
        return res.status(200).json(existing);
    }
    const favourite = await Favourite.create({ movieId, userId });
    res.status(201).json(favourite);
}));

// DELETE remove a favourite movie
router.delete('/:userId/:movieId', asyncHandler(async (req, res) => {
    await Favourite.deleteOne({
        userId: req.params.userId,
        movieId: req.params.movieId
    });
    res.status(204).json();
}));

export default router;