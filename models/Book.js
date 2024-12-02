// import { MongoClient } from "mongodb";
// import dotenv from "dotenv";
// dotenv.config();


// const client = new MongoClient(process.env.ATLAS_URI);

// let conn;
// try {
//   conn = await client.connect();
// } catch (e) {
//   console.error(e);
// }

// let db = conn.db("sample_mflix");

// export default db;

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
