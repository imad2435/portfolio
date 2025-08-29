const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config(); // Make sure dotenv is configured here as well

// --- THE FIX ---
// We will configure Cloudinary directly using the separate environment variables
// This is more robust than relying on the single CLOUDINARY_URL string.
// Let's first make sure the keys exist.
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  console.error('!!! Cloudinary environment variables are missing.           !!!');
  console.error('!!! Please add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY,   !!!');
  console.error('!!! and CLOUDINARY_API_SECRET to your .env file.            !!!');
  console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  process.exit(1); // Exit the process if keys are missing
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'portfolio_uploads',
    allowed_formats: ['jpeg', 'png', 'jpg', 'pdf'], // Also allow PDF for CVs
  },
});

module.exports = {
  cloudinary,
  storage,
};