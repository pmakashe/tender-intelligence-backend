// D:\tender_intelligence_app\backend\index.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import tenderRoutes from './routes/tenders.js';
import scrapeTenders from './utils/scraper.js';
import pool from './db/db.js'; // Import the PostgreSQL connection pool
import { createUsersTable } from './models/User.js'; // Import function to create users table
import { createTendersTable } from './models/Tender.js'; // Import function to create tenders table

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // Use port from .env or default to 5000

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Enable parsing of JSON request bodies

// Function to start the server and connect to PostgreSQL
const startServer = async () => {
  try {
    // Attempt to connect to the PostgreSQL database using the pool
    await pool.connect();
    console.log('PostgreSQL database connection successful!');

    // Create database tables if they don't already exist
    // These functions are imported from the respective model files
    await createUsersTable();
    await createTendersTable();

    // Register API routes
    // Requests to /api/auth will be handled by authRoutes
    app.use('/api/auth', authRoutes);
    // Requests to /api/tenders will be handled by tenderRoutes
    app.use('/api/tenders', tenderRoutes);

    // Run the initial data scraping/dummy data addition
    // This will populate the 'tenders' table in PostgreSQL
    scrapeTenders();

    // Start the Express server and listen on the specified port
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      // Log out expected API endpoints for easy reference
      console.log('\nAuth endpoints:');
      console.log(`POST http://localhost:${PORT}/api/auth/signup`);
      console.log(`POST http://localhost:${PORT}/api/auth/login`);
      console.log('\nTender search endpoint:');
      console.log(`GET http://localhost:${PORT}/api/tenders/search?q=your_query`);
    });

  } catch (err) {
    // If there's any error during database connection or server startup, log it and exit
    console.error('Failed to start server:', err.message);
    process.exit(1); // Exit the Node.js process with an error code
  }
};

// Call the function to start the server
startServer();