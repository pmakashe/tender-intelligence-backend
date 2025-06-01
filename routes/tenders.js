// D:\tender_intelligence_app\backend\routes\tenders.js

import express from 'express';
// Import the controller function for tender search
import { searchTenders } from '../controllers/tenderController.js'; // Ensure .js extension
// Import the authentication middleware if you want to protect this route
// import protect from '../middleware/authMiddleware.js'; // Uncomment this line when you want to protect the route

const router = express.Router(); // Create an Express router instance

// Define the tender search route
// For now, this route is public (not protected by authentication)
// To protect it later, uncomment the 'protect' import above and change the line below to:
// router.get('/search', protect, searchTenders);
router.get('/search', searchTenders); // GET request to /api/tenders/search will call searchTenders function

export default router; // Export the router to be used in index.js