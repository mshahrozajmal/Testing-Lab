// routes/borrower.routes.js
const express = require('express');
const router = express.Router();
const { borrowBook, returnBook } = require('../controllers/borrower.controller');

// Borrow a book
router.post('/borrow', borrowBook);

// Return a book
router.post('/return', returnBook);

module.exports = router;