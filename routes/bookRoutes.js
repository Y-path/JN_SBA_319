// import express from "express";
// import db from "../db/conn.mjs";
// import { ObjectId } from "mongodb";

// const router = express.Router();

// // Create a user
// router.post("/", async (req, res) => {
//     let collection = await db.collection("users");
//     let newDocument = req.body;
//     let result = await collection.insertOne(newDocument);
//     res.send(result).status(204);
//   });

//   // Get a user
// router.get("/users/:id", async (req, res) => {
//     let collection = await db.collection("users");
//     let query = { _id: ObjectId(req.params.id) };
//     let result = await collection.findOne(query);
//     if (!result) res.send("Not found").status(404);
//     else res.send(result).status(200);
//   });

//   // Delete a user
// router.delete("/:id", async (req, res) => {
//     let collection = await db.collection("users");
//     let query = { _id: ObjectId(req.params.id) };
//     let result = await collection.deleteOne(query);
//     if (!result) res.send("Not found").status(404);
//     else res.send(result).status(200);
//   });


const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Define routes here

// POST

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
        
        await newBook.save();

        res.status(201).json(newBook); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET

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

// DELETE BOOK

router

.delete('/book/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBook = await Book.deleteOne(id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'No book found' });
        }
    res.status(200).json({ message: 'Book deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT

router

.put('/book/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, genre, publishedYear, isAvailable, reviews } = req.body;

    try {
        const updatedBook = await Book.updateOne(
            id,
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






// router.post('/api/books', async (req, res) => {
//     try {
//         const { title, author, genre, publishedYear } = req.body;

       

// // Get a single book
// router.get("/api/books/:id", async (req, res) => {
    
//     if (!result) res.send("Not found").status(404);
//     else res.send(result).status(200);
//   });


module.exports = router;
