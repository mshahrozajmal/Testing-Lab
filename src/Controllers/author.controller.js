const Author = require('../models/author.model');

// Add a new author
exports.addAuthor = async (req, res, next) => {
  try {
    const { name, email, phoneNumber } = req.body;

    const newAuthor = new Author({ name, email, phoneNumber });
    await newAuthor.save();

    res.status(201).json({ message: 'Author added successfully', author: newAuthor });
  } catch (err) {
    next(err);
  }
};

// Update an author
exports.updateAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phoneNumber } = req.body;

    const author = await Author.findById(id);
    if (!author) return res.status(404).json({ message: 'Author not found' });

    // Update fields
    if (name) author.name = name;
    if (email) author.email = email;
    if (phoneNumber) author.phoneNumber = phoneNumber;

    await author.save();
    res.status(200).json({ message: 'Author updated successfully', author });
  } catch (err) {
    next(err);
  }
};

// Delete an author
exports.deleteAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;

    const author = await Author.findByIdAndDelete(id);
    if (!author) return res.status(404).json({ message: 'Author not found' });

    res.status(200).json({ message: 'Author deleted successfully' });
  } catch (err) {
    next(err);
  }
};
