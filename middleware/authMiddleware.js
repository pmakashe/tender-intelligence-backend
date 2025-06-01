// D:\tender_intelligence_app\backend\middleware\authMiddleware.js

import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Import our new PostgreSQL User model

// Middleware function to protect routes (ensure user is authenticated)
const protect = async (req, res, next) => {
  let token;

  // Check if the Authorization header exists and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header (e.g., 'Bearer TOKEN_STRING')
      token = req.headers.authorization.split(' ')[1];

      // Verify token using the JWT_SECRET from .env
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token's payload (the 'id' we stored during token generation)
      // We fetch the user from the database to ensure they still exist and are valid
      req.user = await User.findById(decoded.id); // Our PostgreSQL User model now returns a user object without the password field implicitly

      // If a user is found, proceed to the next middleware/route handler
      next();
    } catch (error) {
      console.error('Token verification error:', error);
      // If token verification fails, send 401 Unauthorized response
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // If no token was found in the header, send 401 Unauthorized response
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export default protect; // Export the middleware function