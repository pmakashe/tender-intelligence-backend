// D:\tender_intelligence_app\backend\utils\scraper.js

import Tender from '../models/Tender.js'; // Import our new PostgreSQL Tender model

// This function simulates scraping and adds dummy tender data to the database.
// In a real application, you would replace this with actual web scraping logic.
const scrapeTenders = async () => {
  console.log('Starting tender scraping (or dummy data addition)...');
  try {
    // Ensure the tenders table exists before attempting to insert data
    await Tender.createTendersTable(); // This function was exported from Tender.js

    // Check if there are any tenders already in the database
    const currentTenders = await Tender.findAll();

    // If no tenders exist, add some dummy data
    if (currentTenders.length === 0) {
      console.log('No tenders found. Adding dummy data...');
      const dummyTenders = [
        {
          title: 'Construction of New Road Segment',
          description: 'Tender for the design and construction of a 5km road segment.',
          organisation: 'City Public Works Department',
          deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
          link: 'http://example.com/tender/road_segment_1',
        },
        {
          title: 'Supply of Medical Equipment',
          description: 'Procurement of advanced medical imaging equipment for regional hospitals.',
          organisation: 'Ministry of Health',
          deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
          link: 'http://example.com/tender/medical_eq_supply',
        },
        {
          title: 'Software Development for E-governance Portal',
          description: 'Development of a new web portal for citizen services and e-governance.',
          organisation: 'National e-Governance Agency',
          deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
          link: 'http://example.com/tender/e_gov_portal',
        },
        {
          title: 'Renovation of Heritage Building',
          description: 'Tender for the restoration and renovation of a historical landmark.',
          organisation: 'Department of Culture and Heritage',
          deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), // 20 days from now
          link: 'http://example.com/tender/heritage_reno',
        },
      ];

      for (const tenderData of dummyTenders) {
        // Check if a tender with the same link already exists to avoid duplicates
        const existingTender = await Tender.findByLink(tenderData.link);
        if (!existingTender) {
          await Tender.create(tenderData); // Use the Tender model's create function
          console.log(`Added dummy tender: ${tenderData.title}`);
        }
      }
    } else {
      console.log(`Already ${currentTenders.length} tenders in DB. Skipping dummy data creation.`);
    }

    console.log('Tender scraping (or dummy data addition) completed.');
  } catch (error) {
    console.error('Error during tender scraping:', error);
  }
};

export default scrapeTenders; // Export the scraping function