// D:\tender_intelligence_app\backend\routes\auth.js

import express from 'express';
// Import the controller functions for authentication
import { registerUser, loginUser } from '../controllers/authController.js'; // Ensure .js extension
// Import the authentication middleware if you want to protect routes
// import protect from '../middleware/authMiddleware.js'; // Uncomment this line when you want to protect routes

const router = express.Router(); // Create an Express router instance

// Define the authentication routes
// POST request to /api/auth/signup will call registerUser function
router.post('/signup', registerUser);

// POST request to /api/auth/login will call loginUser function
router.post('/login', loginUser);

// Example of a protected route (uncomment 'protect' import above and this route to use)
// router.get('/profile', protect, (req, res) => {
//   res.status(200).json({ message: `Welcome ${req.user.email}, you have access to protected data!` });
// });

export default router; // Export the router to be used in index.js