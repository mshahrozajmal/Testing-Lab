const express = require('express');
const { addBook, updateBook, deleteBook } = require('../controllers/book.controller');

const router = express.Router();

router.post('/books', addBook);
router.put('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);

module.exports = router;
