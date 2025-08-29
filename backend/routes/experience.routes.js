const express = require('express');
const router = express.Router();
const { createExperience, getAllExperiences, updateExperience, deleteExperience } = require('../controllers/experience.controller');
const { protect } = require('../middleware/auth.middleware');

router.route('/').get(getAllExperiences);
router.route('/').post(protect, createExperience);
router.route('/:id').put(protect, updateExperience).delete(protect, deleteExperience);

module.exports = router;