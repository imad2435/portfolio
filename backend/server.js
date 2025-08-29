// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 5001;

// --- Middleware ---
app.use(cors());
// Allow the app to accept JSON and form data, with a higher limit for file uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connection established successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- API Routes ---
const skillRoutes = require('./routes/skill.routes');
const projectRoutes = require('./routes/project.routes');
const experienceRoutes = require('./routes/experience.routes');
const personalInfoRoutes = require('./routes/personalInfo.routes');
const contactMessageRoutes = require('./routes/contactMessage.routes');
const authRoutes = require('./routes/auth.routes');
const uploadRoutes = require('./routes/upload.routes');
app.use('/api/upload', uploadRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/personal-info', personalInfoRoutes);
app.use('/api/contact-messages', contactMessageRoutes);


// --- Basic Test Route ---
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the MERN Portfolio Backend API!' });
});

// --- Start the Server ---
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});