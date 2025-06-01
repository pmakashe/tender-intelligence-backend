// D:\tender_intelligence_app\backend\db\db.js

import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Create a new PostgreSQL connection pool
const pool = new pg.Pool({
  user: process.env.DB_USER,      // PostgreSQL username from .env (e.g., 'postgres')
  host: process.env.DB_HOST,      // PostgreSQL host from .env (e.g., 'localhost')
  database: process.env.DB_NAME,  // Database name from .env (e.g., 'tender_intelligence_db')
  password: process.env.DB_PASSWORD, // PostgreSQL password from .env
  port: process.env.DB_PORT,      // PostgreSQL port from .env (e.g., 5432)
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