// import express from "express";


// const PORT = 5050;
// const app = express();

// import users from "./routes/users.js";
// // import comments from "./routes/comments.js";
// // import movies from "./routes/movies.js";

// app.use(express.json());

// app.get("/", (req, res) => {
//     res.send("Welcome to the API.");
//   });

// app.use("/users", users);
// // app.use("/comments", comments);
// // app.use("/movies", movies);


// // Global error handling
// app.use((err, _req, res, next) => {
//     res.status(500).send("Seems like we messed up somewhere...");
//   });
  
//   // Start the Express server
//   app.listen(PORT, () => {
//     console.log(`Server is running on port: ${PORT}`);
//   });

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const summaryRoutes = require('./routes/summaryRoutes');

const app = express();
app.use(bodyParser.json());


// Connect to MongoDB
mongoose.connect(
    process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error(err));

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/summaries', summaryRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
