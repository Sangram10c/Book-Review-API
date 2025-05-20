const Review = require("../models/review.model");
const mongoose = require("mongoose");


// addReview function handles adding a new review for a book
exports.addReview = async (req, res) => {
  try {
    const bookId = req.params.id;
    const userId = req.user.id;
    const { rating, comment } = req.body;

    if (!mongoose.Types.ObjectId.isValid(bookId))
      return res.status(400).json({ error: "Invalid book ID" });

    if (!rating || rating < 1 || rating > 5)
      return res.status(400).json({ error: "Rating must be between 1 and 5" });

    // Check if user already reviewed this book
    const existingReview = await Review.findOne({ user: userId, book: bookId });
    if (existingReview)
      return res.status(400).json({ error: "You have already reviewed this book" });

    const review = new Review({ user: userId, book: bookId, rating, comment });
    await review.save();

    res.status(201).json(review);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "You have already reviewed this book" });
    }
    res.status(500).json({ error: err.message });
  }
};

// updateReview function handles updating an existing review
exports.updateReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const userId = req.user.id;
    const { rating, comment } = req.body;

    if (!mongoose.Types.ObjectId.isValid(reviewId))
      return res.status(400).json({ error: "Invalid review ID" });

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ error: "Review not found" });
    if (review.user.toString() !== userId)
      return res.status(403).json({ error: "Not authorized to update this review" });

    if (rating !== undefined) {
      if (rating < 1 || rating > 5)
        return res.status(400).json({ error: "Rating must be between 1 and 5" });
      review.rating = rating;
    }
    if (comment !== undefined) review.comment = comment;

    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// deleteReview function handles deleting a review
exports.deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(reviewId))
      return res.status(400).json({ error: "Invalid review ID" });

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ error: "Review not found" });
    if (review.user.toString() !== userId)
      return res.status(403).json({ error: "Not authorized to delete this review" });

    await Review.findByIdAndDelete(reviewId);
    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
