const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
  isbn: { type: String, unique: true, required: true },
  availableCopies: {
    type: Number,
    required: true,
    min: [0, 'Available copies cannot be negative'],
    validate: {
      validator: function (value) {
        return !(this.borrowingFrequency > 10 && value > 100);
      },
      message: 'Available copies cannot exceed 100 if borrowing frequency is more than 10',
    },
  },
  borrowingFrequency: { type: Number, default: 0 }, // Tracks how often the book is borrowed
});

module.exports = mongoose.model('Book', bookSchema);
