// JWT authentication middleware - validates Bearer tokens on protected routes
import jwt from 'jsonwebtoken';
import User from '../api/users/userModel';

const authenticate = async (request, response, next) => {
    try {
        // Extract authorization header
        const authHeader = request.headers.authorization;
        if (!authHeader) throw new Error('No authorization header');

        // Extract Bearer token from "Bearer <token>" format
        const token = authHeader.split(" ")[1];
        if (!token) throw new Error('Bearer token not found');

        // Verify JWT token and extract username
        const decoded = await jwt.verify(token, process.env.SECRET);
        console.log(decoded);

        // Fetch user from database
        const user = await User.findByUserName(decoded.username);
        if (!user) {
            throw new Error('User not found');
        }

        // Attach user to request object for use in route handlers
        request.user = user;
        next();
    } catch(err) {
        next(new Error(`Verification Failed: ${err.message}`));
    }
};

export default authenticate;