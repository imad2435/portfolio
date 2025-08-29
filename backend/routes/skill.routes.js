const express = require('express');
const router = express.Router();

// Import the controller functions AND the protect middleware
const {
  createSkill,
  getAllSkills,
  updateSkill,
  deleteSkill,
} = require('../controllers/skill.controller');
const { protect } = require('../middleware/auth.middleware');

// --- Define Routes ---

// GET route remains public
router.route('/').get(getAllSkills);

// POST route is now protected
router.route('/').post(protect, createSkill);

// PUT and DELETE routes are now protected
router.route('/:id')
  .put(protect, updateSkill)
  .delete(protect, deleteSkill);

module.exports = router;