const express = require('express');
const router = express.Router();
const connection = require('../db');  // Your connection pool
const multer = require('multer');

// Multer config for handling multipart/form-data
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post("/tourism-places", upload.array("images"), async (req, res) => {

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded.' });
  }

  try {
    const {
      name,
      description,
      location,
      category,
      language_support,
      is_rural,
      eco_friendly,
      phone_number,
      email,
      website,
      price_per_night,
      max_guests,
      facilities,
    } = req.body;

    if (!name || !description || !location) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    const created_at = new Date();
   

    // Insert into tourism_places table
    const [placeResult] =  await connection.promise().query(
      `INSERT INTO tourism_places
      (name, description, location, category, language_support, is_rural, eco_friendly, review_count, phone_number, email, website, price_per_night, max_guests, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        description,
        location,
        category,
        language_support,
        is_rural === "true" ? 1 : 0,
        eco_friendly === "true" ? 1 : 0,
        0, // review_count default 0
        phone_number,
        email,
        website,
        price_per_night,
        max_guests,
        created_at,
      ]
    );
   

    const tourism_place_id = placeResult.insertId;

    // Parse facilities JSON
    let facilityList = [];
    try {
      facilityList = JSON.parse(facilities);
    } catch (err) {
      return res.status(400).json({ message: 'Invalid facilities format.' });
    }

    // Insert facilities
    for (const fac of facilityList) {
      await connection.promise().query(
        `INSERT INTO facilities (tourism_place_id, facility_name) VALUES (?, ?)`,
        [tourism_place_id, fac]
      );
    }

    // Insert images
    // Insert images
for (const file of req.files) {
  // Add the file handling code right here
  const fs = require('fs');
  const path = require('path');
  
  // Create the uploads directory if it doesn't exist
  const uploadDir = path.join(__dirname, '../uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  
  const filename = `${Date.now()}_${file.originalname}`;
  const filepath = path.join(uploadDir, filename);
  fs.writeFileSync(filepath, file.buffer);
  
  const imageUrl = `uploads/${filename}`;
  
  // Then continue with your database insert
  await connection.promise().query(
    `INSERT INTO place_images (tourism_place_id, image_url) VALUES (?, ?)`,
    [tourism_place_id, imageUrl]
  );
}

    res.status(200).json({ message: "Tourism place created successfully" });

  } catch (error) {
   
    res.status(500).json({ message: "Failed to create tourism place", error: error.message });
  }
});


// routes/tourism.js
router.get('/tourism-places', async (req, res) => {
  try {
    // Get all tourism places
    const [places] = await connection.promise().query(`SELECT * FROM tourism_places`);

    const placesWithDetails = await Promise.all(places.map(async (place) => {
      // Get images
      const [images] = await connection.promise().query(`SELECT image_url FROM place_images WHERE tourism_place_id = ?`, [place.id]);

      // Get facilities
      const [facilities] = await connection.promise().query(`SELECT facility_name FROM facilities WHERE tourism_place_id = ?`, [place.id]);

      return {
        ...place,
        images: images.map(img => img.image_url),
        facilities: facilities.map(fac => fac.facility_name),
      };
    }));
console.log(placesWithDetails);
    res.status(200).json(placesWithDetails);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch tourism places", error: error.message });
  }
});


module.exports = router;
