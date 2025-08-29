const express = require('express');
const router = express.Router();
const { getPersonalInfo, upsertPersonalInfo } = require('../controllers/personalInfo.controller');
const { protect } = require('../middleware/auth.middleware');

router.route('/').get(getPersonalInfo);
router.route('/').post(protect, upsertPersonalInfo); // Protect the create/update route

module.exports = router;