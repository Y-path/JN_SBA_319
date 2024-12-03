const mongoose = require('mongoose');

const summarySchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: false },
    summary: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Summary = mongoose.model('Summary', summarySchema)
module.exports = mongoose.model('Summary', summarySchema);
module.exports = Summary;