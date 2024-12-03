const express = require('express');
const router = express.Router();
const Summary = require('../models/Summary');

// POST to add a new summary

router
    .post('/', async (req, res) => {
        try {
            const { title, author, summary, } = req.body;

            if (!title || !summary) {
                return res.status(400).json({ message: 'Title and Summary required' });
            }

            const newSummary = new Summary({
                id: Summary.length + 1,
                title,
                author,
                summary,
            });

            await newSummary.save();

            res.status(201).json(newSummary);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    });

// GET a specific summary

router
    .get('/summary/:id', async (req, res) => {
        const { id } = req.params;

        try {
            const summary = await Summary.findById(id);
            if (!summary) {
                return res.status(404).json({ message: 'No summary found' });
            }
            res.status(200).json(summary);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    });

// PUT to update a summary

router
    .put('/summary/:id', async (req, res) => {
        const { id } = req.params;
        const { title, author, summary } = req.body;

        try {
            const updatedSummary = await Summary.findOneAndUpdate({ _id: id },

                { title, author, summary },
                { new: true }
            );

            if (!updatedSummary) {
                return res.status(404).json({ message: 'No summary found' });
            }

            res.status(200).json(updatedSummary);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    });

module.exports = router;