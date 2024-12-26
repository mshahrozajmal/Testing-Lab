const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Invalid email format',
    },
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\+?[1-9]\d{1,14}$/.test(v);
      },
      message: 'Invalid phone number format',
    },
  },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
});

authorSchema.methods.canAddMoreBooks = function () {
  return this.books.length < 5;
};

module.exports = mongoose.model('Author', authorSchema);
