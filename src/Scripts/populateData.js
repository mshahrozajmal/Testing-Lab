const mongoose = require('mongoose');
const Author = require('../models/author.model');
const Book = require('../models/book.model');
const Borrower = require('../models/borrower.model');

const populateData = async () => {
  await mongoose.connect('mongodb://localhost:27017/library');

  // Add authors
  const authors = await Author.insertMany([
    { name: 'Author One', email: 'author1@example.com', phoneNumber: '+1234567890' },
    { name: 'Author Two', email: 'author2@example.com', phoneNumber: '+1987654321' },
    { name: 'Author Three', email: 'author3@example.com', phoneNumber: '+1122334455' },
  ]);

  // Add books
  const books = await Book.insertMany([
    { title: 'Book One', author: authors[0]._id, isbn: '1234567890', availableCopies: 10 },
    { title: 'Book Two', author: authors[1]._id, isbn: '0987654321', availableCopies: 5 },
    { title: 'Book Three', author: authors[2]._id, isbn: '1122334455', availableCopies: 0 },
  ]);

  // Add borrowers
  const borrowers = await Borrower.insertMany([
    { name: 'Borrower One', membershipActive: true, membershipType: 'Standard' },
    { name: 'Borrower Two', membershipActive: true, membershipType: 'Premium' },
    { name: 'Borrower Three', membershipActive: false, membershipType: 'Standard' },
  ]);

  console.log('Test data populated');
  mongoose.connection.close();
};

populateData();
