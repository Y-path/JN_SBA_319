const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  review: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now } 
});

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String },
    publishedYear: { type: Number },
    isAvailable: { type: Boolean, default: true },
    reviews: { type: [reviewSchema], default: [] }
});
const Book = mongoose.model('Book', bookSchema)
module.exports = mongoose.model('Book', bookSchema);
module.exports = Book;
