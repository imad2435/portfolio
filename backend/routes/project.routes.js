const express = require('express');
const router = express.Router();

const {
  createProject,
  getAllProjects,
  getProjectById, // <-- Import the new function
  updateProject,
  deleteProject,
} = require('../controllers/project.controller');
const { protect } = require('../middleware/auth.middleware');

// Public route to get all projects
router.route('/').get(getAllProjects);

// Protected route for creating projects
router.route('/').post(protect, createProject);

// --- NEW ROUTE for a single project ---
// This is a public route so anyone can view your project details.
router.route('/:id').get(getProjectById);

// Protected routes for updating and deleting a specific project
router.route('/:id').put(protect, updateProject).delete(protect, deleteProject);

module.exports = router;