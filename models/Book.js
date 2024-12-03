const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: {
    type: String, required: true,
    validate: {
      validator: function (value) {
        return value.length >= 3;
      },
      message: 'Name should be at least 3 characters long'
    }
  },
  review: {
    type: String, required: true,
    validate: {
      validator: function (value) {
        return value.length >= 10;
      },
      message: 'Review should be at least 10 characters long'
    }
  },
  createdAt: { type: Date, default: Date.now }
});

const bookSchema = new mongoose.Schema({
  title: {
    type: String, required: true,
    validate: {
      validator: function (value) {
        return value.length >= 2;
      },
      message: 'Title should be at least 2 characters long'
    }
  },
  author: {
    type: String, required: true,
    validate: {
      validator: function (value) {
        return value.length >= 3;
      },
      message: 'Author name should be at least 3 characters long'
    }
  },
  genre: { type: String },
  publishedYear: { type: Number },
  isAvailable: { type: Boolean, default: true },
  reviews: { type: [reviewSchema], default: [] }
});

const Book = mongoose.model('Book', bookSchema)
module.exports = mongoose.model('Book', bookSchema);
module.exports = Book;
