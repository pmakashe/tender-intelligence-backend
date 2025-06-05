// D:\tender_intelligence_app\backend\db\db.js

import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Create a new PostgreSQL connection pool
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  // You might also need to add SSL configuration for Render, depending on your pg version and setup:
  ssl: {
    rejectUnauthorized: false // This is often needed for Render connections if SSL is enabled
  }
});

// Event listener for successful database connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

// Event listener for database connection errors
pool.on('error', (err) => {
  console.error('Error connecting to PostgreSQL:', err.message);
  // It's good practice to exit the process if the database connection is critical
  // process.exit(1); 
});

export default pool; // Export the pool to be used throughout the application