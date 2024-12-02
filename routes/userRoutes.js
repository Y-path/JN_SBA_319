const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST to add a new user

router

.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email) {
            return res.status(400).json({ message: 'Name and Email required' });
        }

        const newUser = new User({
            id: User.length + 1,
            name,
            email,
            password,
          
        });
        
        await newUser.save();

        res.status(201).json(newUser); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET all users

router

.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET a specific user

router

.get('/user/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'No user found' });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE a user

router

.delete('/user/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findOneAndDelete({_id: id});
        if (!deletedUser) {
            return res.status(404).json({ message: 'No user found' });
        }
    res.status(200).json({ message: 'User deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;