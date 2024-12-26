const express = require('express');
const { addAuthor, updateAuthor, deleteAuthor } = require('../controllers/author.controller');

const router = express.Router();

router.post('/authors', addAuthor);
router.put('/authors/:id', updateAuthor);
router.delete('/authors/:id', deleteAuthor);

module.exports = router;
