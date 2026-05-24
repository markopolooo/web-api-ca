// User authentication router - handles registration, login, and user retrieval
import express from 'express';
import asyncHandler from 'express-async-handler';
import User from './userModel';
import jwt from 'jsonwebtoken';

const router = express.Router();

// GET all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

// POST register new user or authenticate existing user (login)
router.post('/', asyncHandler(async (req, res) => {
    try {
        // Validate that username and password are provided
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ success: false, msg: 'Username and password are required.' });
        }
        // Route to register or authenticate based on query parameter
        if (req.query.action === 'register') {
            await registerUser(req, res);
        } else {
            await authenticateUser(req, res);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
}));

// Register new user with password validation
async function registerUser(req, res) {
    // Password must be 8+ chars with uppercase, lowercase, number, and special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(req.body.password)) {
        return res.status(400).json({
            success: false,
            msg: 'Password must be at least 8 characters and include one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&).'
        });
    }

    await User.create(req.body);
    res.status(201).json({ success: true, msg: 'User successfully created.' });
}

// Authenticate user and return JWT token
async function authenticateUser(req, res) {
    const user = await User.findByUserName(req.body.username);
    if (!user) {
        return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
    }

    // Verify password matches
    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
        // Generate JWT token with username
        const token = jwt.sign({ username: user.username }, process.env.SECRET);
        res.status(200).json({ success: true, token: 'BEARER ' + token, userId: user._id });
    } else {
        res.status(401).json({ success: false, msg: 'Wrong password.' });
    }
}

export default router;