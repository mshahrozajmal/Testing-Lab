const Book = require('../models/book.model');
const Author = require('../models/author.model');

// Add a new book
exports.addBook = async (req, res, next) => {
  try {
    const { title, author, isbn, availableCopies } = req.body;

    // Check if the author exists
    const authorExists = await Author.findById(author);
    if (!authorExists) return res.status(400).json({ message: 'Author not found' });

    // Check author's book limit
    if (!authorExists.canAddMoreBooks()) {
      return res.status(400).json({ message: 'Author cannot be linked to more than 5 books' });
    }

    // Create the book
    const newBook = new Book({ title, author, isbn, availableCopies });
    await newBook.save();

    // Add the book to the author's books array
    authorExists.books.push(newBook._id);
    await authorExists.save();

    res.status(201).json({ message: 'Book added successfully', book: newBook });
  } catch (err) {
    next(err);
  }
};

// Update a book
exports.updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, availableCopies } = req.body;

    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    // Update fields
    if (title) book.title = title;
    if (availableCopies) book.availableCopies = availableCopies;

    await book.save();
    res.status(200).json({ message: 'Book updated successfully', book });
  } catch (err) {
    next(err);
  }
};

// Delete a book
exports.deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    const book = await Book.findByIdAndDelete(id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    // Remove the book from the author's list
    const author = await Author.findById(book.author);
    if (author) {
      author.books = author.books.filter((bookId) => bookId.toString() !== id);
      await author.save();
    }

    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    next(err);
  }
};
