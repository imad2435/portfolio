const express = require('express');
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();
const upload = multer({ storage }); // Initialize multer with our Cloudinary storage engine

// @route   POST /api/upload
// @desc    Upload a file to Cloudinary
// @access  Private
router.post('/', protect, upload.single('file'), (req, res) => {
  // 'upload.single('file')' is the middleware. It processes a single file from the 'file' field.
  // If the upload is successful, multer-storage-cloudinary adds the file info to the request object.
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }
  
  // The URL of the uploaded file is in req.file.path
  res.status(200).json({
    message: 'File uploaded successfully',
    url: req.file.path, // This is the secure URL from Cloudinary
  });
});

module.exports = router;