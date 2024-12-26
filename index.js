const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const authorRoutes = require('./src/routes/author.routes');
const bookRoutes = require('./src/routes/book.routes');
const borrowerRoutes = require('./src/routes/borrower.routes');

const app = express();
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the API. Use /api for accessing the endpoints.');
});

// Routes
app.use('/api', bookRoutes);
app.use('/api', authorRoutes);
app.use('/api', borrowerRoutes);

// Global Error Handling
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

// Database Connection
mongoose
  .connect('mongodb://localhost:27017/', {})
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Database connection error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
