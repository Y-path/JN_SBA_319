const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// POST to add a book

router
    .post('/', async (req, res) => {
        try {
            const { title, author, genre, publishedYear, isAvailable, reviews } = req.body;

            if (!title || !author) {
                return res.status(400).json({ message: 'Title and Author required' });
            }

            const newBook = new Book({
                id: Book.length + 1,
                title,
                author,
                genre,
                publishedYear,
                isAvailable,
                reviews,
            });

            await newBook.save()
                .then(book => console.log('Book saved:', book))
                .catch(error => console.log('Validation Error:', error));


            res.status(201).json(newBook);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    });

// POST to add a review

router
    .post('/book/:id/reviews', async (req, res) => {
        const bookId = req.params.id;
        const { name, review, createdAt } = req.body;

        if (!name || !review) {
            return res.status(400).json({ message: 'Name and Review required' });
        }

        const newReview = {
            name,
            review,
            createdAt,
        };

        try {
            const updatedBook = await Book.findByIdAndUpdate(
                bookId,
                { $push: { reviews: newReview } },
                { new: true, useFindAndModify: false }
            );

            if (!updatedBook) {
                return res.status(404).json({ message: 'Book not found.' });
            }

            res.status(201).json(updatedBook);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    });

// GET all books

router
    .get('/', async (req, res) => {
        try {
            const books = await Book.find();
            res.status(200).json(books);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    });

// GET a specific book

router
    .get('/book/:id', async (req, res) => {
        const { id } = req.params;

        try {
            const book = await Book.findById(id);
            if (!book) {
                return res.status(404).json({ message: 'No book found' });
            }
            res.status(200).json(book);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    });

// PUT to update a book

router
    .put('/book/:id', async (req, res) => {
        const { id } = req.params;
        const { title, author, genre, publishedYear, isAvailable, reviews } = req.body;

        try {
            const updatedBook = await Book.findOneAndUpdate({ _id: id },

                { title, author, genre, publishedYear, isAvailable, reviews },
                { new: true }
            );

            if (!updatedBook) {
                return res.status(404).json({ message: 'No book found' });
            }

            res.status(200).json(updatedBook);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    });

// DELETE a book

router
    .delete('/book/:id', async (req, res) => {
        const { id } = req.params;

        try {
            const deletedBook = await Book.findOneAndDelete({ _id: id });
            if (!deletedBook) {
                return res.status(404).json({ message: 'No book found' });
            }
            res.status(200).json({ message: 'Book deleted' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    });

module.exports = router;
