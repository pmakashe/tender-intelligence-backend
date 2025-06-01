// D:\tender_intelligence_app\backend\models\Tender.js

import pool from '../db/db.js'; // Import the PostgreSQL connection pool

// Function to create the 'tenders' table if it doesn't exist
// This will be called when the server starts
export const createTendersTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tenders (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        organisation VARCHAR(255) NOT NULL,
        deadline TIMESTAMP NOT NULL,
        link VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Tenders table checked/created successfully.');
  } catch (error) {
    console.error('Error creating tenders table:', error.message);
    // It's good practice to exit if table creation fails as it's critical
    // process.exit(1);
  }
};

// Tender Model functions to interact with the 'tenders' table
const Tender = {
  // Find all tenders
  findAll: async () => {
    const result = await pool.query('SELECT * FROM tenders ORDER BY created_at DESC');
    return result.rows;
  },
  // Create a new tender entry
  create: async (tenderData) => {
    const { title, description, organisation, deadline, link } = tenderData;
    const result = await pool.query(
      'INSERT INTO tenders (title, description, organisation, deadline, link) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, description, organisation, deadline, link]
    );
    return result.rows[0]; // Return the newly created tender
  },
  // Find a tender by its unique link
  findByLink: async (link) => {
    const result = await pool.query('SELECT * FROM tenders WHERE link = $1', [link]);
    return result.rows[0];
  },
  // Search for tenders by title or description (case-insensitive)
  search: async (query) => {
    const result = await pool.query(
      `SELECT * FROM tenders WHERE title ILIKE $1 OR description ILIKE $1 ORDER BY created_at DESC`,
      [`%${query}%`] // ILIKE is PostgreSQL's case-insensitive LIKE operator
    );
    return result.rows;
  }
};

export default Tender; // Export the Tender model functions