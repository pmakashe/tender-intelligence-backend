// D:\tender_intelligence_app\backend\controllers\tenderController.js

import Tender from '../models/Tender.js'; // Import our new PostgreSQL Tender model

// Controller function for searching tenders
export const searchTenders = async (req, res) => {
  const { q } = req.query; // Get the search query from the URL (e.g., /search?q=construction)

  // Basic validation: ensure a search query is provided
  if (!q) {
    return res.status(400).json({ message: 'Search query (q) is required.' });
  }

  try {
    // Use the Tender model's search function to query the database
    const tenders = await Tender.search(q);

    // Map tenders to the format expected by the frontend
    const formattedTenders = tenders.map((tender, idx) => ({
      sNo: idx + 1,
      refNo: tender.ref_no || tender.refNo,
      title: tender.title,
      closingDate: tender.closing_date || tender.closingDate,
      openingDate: tender.opening_date || tender.openingDate,
      organisation: tender.organisation
    }));

    // Send the found tenders as a JSON response in the expected format
    res.status(200).json({ tenders: formattedTenders });
  } catch (error) {
    console.error('Tender search error:', error);
    res.status(500).json({ message: 'Server error during tender search' });
  }
};