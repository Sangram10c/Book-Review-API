const Book = require("../models/book.model");
const Review = require("../models/review.model");
const mongoose = require("mongoose");

// This controller handles book-related functionalities, including adding a new book
exports.addBook = async (req, res) => {
  try {
    const { title, author, genre, description } = req.body;
    if (!title || !author)
      return res.status(400).json({ error: "Title and author are required" });

    const book = new Book({ title, author, genre, description });
    await book.save();

    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// This controller handles fetching books, including filtering and pagination
exports.getBooks = async (req, res) => {
  try {
    let { page = 1, limit = 10, author, genre } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const filter = {};
    if (author) filter.author = new RegExp(author, "i");
    if (genre) filter.genre = new RegExp(genre, "i");

    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Book.countDocuments(filter);

    res.json({
      books,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// This controller handles fetching book details, including reviews and average rating
exports.getBookDetails = async (req, res) => {
  try {
    const bookId = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    if (!mongoose.Types.ObjectId.isValid(bookId))
      return res.status(400).json({ error: "Invalid book ID" });

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ error: "Book not found" });

    const reviews = await Review.find({ book: bookId })
      .populate("user", "username")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalReviews = await Review.countDocuments({ book: bookId });

    const agg = await Review.aggregate([
      { $match: { book: book._id } },
      { $group: { _id: null, avgRating: { $avg: "$rating" } } },
    ]);
    const avgRating = agg.length ? agg[0].avgRating.toFixed(2) : null;

    res.json({
      book,
      averageRating: avgRating,
      reviews,
      totalReviews,
      page,
      totalPages: Math.ceil(totalReviews / limit),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.searchBooks = async (req, res) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;

    if (!q) return res.status(400).json({ error: "Search query (q) is required" });

    const regex = new RegExp(q, "i");

    const query = {
      $or: [{ title: regex }, { author: regex }],
    };

    const books = await Book.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Book.countDocuments(query);

    res.json({
      books,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
