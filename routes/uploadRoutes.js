// routes/uploadRoutes.js
const express = require('express');
const router = express.Router();
const { upload } = require('../utils/cloudinary');

// Route: POST /api/upload
router.post('/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    res.status(200).json({
      message: 'Image uploaded successfully!',
      imageUrl: req.file.path, // Cloudinary public URL
    });
  } catch (err) {
    res.status(500).json({ message: 'Image upload failed', error: err.message });
  }
});

module.exports = router;
