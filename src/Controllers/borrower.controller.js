const Borrower = require('../models/borrower.model');
const Book = require('../models/book.model');

// Borrow a book
exports.borrowBook = async (req, res, next) => {
  try {
    const { borrowerId, bookId } = req.body;

    // Fetch borrower and book
    const borrower = await Borrower.findById(borrowerId).populate('borrowedBooks');
    const book = await Book.findById(bookId);

    if (!borrower) return res.status(404).json({ message: 'Borrower not found' });
    if (!book) return res.status(404).json({ message: 'Book not found' });

    // Check membership and borrowing limits
    if (!borrower.membershipActive) {
      return res.status(400).json({ message: 'Membership is not active' });
    }
    if (borrower.borrowedBooks.length >= (borrower.membershipType === 'Premium' ? 10 : 5)) {
      return res.status(400).json({ message: 'Borrowing limit exceeded for membership type' });
    }

    // Check book availability
    if (book.availableCopies <= 0) {
      return res.status(400).json({ message: 'No available copies of the book' });
    }

    // Perform borrowing operation
    book.availableCopies -= 1;
    book.borrowingFrequency = (book.borrowingFrequency || 0) + 1;
    borrower.borrowedBooks.push(book._id);

    await book.save();
    await borrower.save();

    res.status(200).json({ message: 'Book borrowed successfully', borrower, book });
  } catch (err) {
    next(err);
  }
};

// Return a book
exports.returnBook = async (req, res, next) => {
  try {
    const { borrowerId, bookId } = req.body;

    // Fetch borrower and book
    const borrower = await Borrower.findById(borrowerId);
    const book = await Book.findById(bookId);

    if (!borrower) return res.status(404).json({ message: 'Borrower not found' });
    if (!book) return res.status(404).json({ message: 'Book not found' });

    // Check if the borrower has the book
    if (!borrower.borrowedBooks.includes(book._id)) {
      return res.status(400).json({ message: 'Borrower has not borrowed this book' });
    }

    // Perform return operation
    book.availableCopies += 1;
    borrower.borrowedBooks = borrower.borrowedBooks.filter(
      (borrowedBookId) => borrowedBookId.toString() !== bookId
    );

    await book.save();
    await borrower.save();

    res.status(200).json({ message: 'Book returned successfully', borrower, book });
  } catch (err) {
    next(err);
  }
};