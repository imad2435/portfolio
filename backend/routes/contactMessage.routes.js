const express = require('express');
const router = express.Router();
const { createContactMessage, getAllContactMessages, deleteContactMessage } = require('../controllers/contactMessage.controller');

// Note: Later, we will add authentication middleware to protect the GET and DELETE routes.
router.route('/').get(getAllContactMessages).post(createContactMessage);
router.route('/:id').delete(deleteContactMessage);

module.exports = router;