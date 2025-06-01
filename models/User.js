// D:\tender_intelligence_app\backend\models\User.js

import pool from '../db/db.js'; // Import the PostgreSQL connection pool
import bcrypt from 'bcryptjs'; // For password hashing

// Function to create the 'users' table if it doesn't exist
// This will be called when the server starts
export const createUsersTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- PostgreSQL generates a UUID for ID
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Users table checked/created successfully.');
  } catch (error) {
    console.error('Error creating users table:', error.message);
    // It's good practice to exit if table creation fails as it's critical
    // process.exit(1);
  }
};

// User Model functions to interact with the 'users' table
const User = {
  // Find a user by their email address
  findByEmail: async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0]; // Return the first row found (should be unique)
  },
  // Find a user by their ID
  findById: async (id) => {
    // Exclude the password field from the returned data
    const result = await pool.query('SELECT id, email, created_at FROM users WHERE id = $1', [id]);
    return result.rows[0];
  },
  // Create a new user
  create: async (email, password) => {
    const salt = await bcrypt.genSalt(10); // Generate salt for hashing
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password
    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, created_at',
      [email, hashedPassword] // Return created user data
    );
    return result.rows[0];
  },
  // Compare a candidate password with the stored hashed password
  comparePassword: async (candidatePassword, hashedPassword) => {
    return bcrypt.compare(candidatePassword, hashedPassword);
  }
};

export default User; // Export the User model functions