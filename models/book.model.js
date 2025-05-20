const mongoose = require("mongoose");

// Book schema definition
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: String,
  description: String,
});

module.exports = mongoose.model("Book", bookSchema);
