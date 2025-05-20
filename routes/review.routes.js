const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review.controller");
const authenticate = require("../middleware/auth.middleware");

// Protected routes for reviews (require authentication)
router.post("/books/:id/reviews", authenticate, reviewController.addReview);
router.put("/reviews/:id", authenticate, reviewController.updateReview);
router.delete("/reviews/:id", authenticate, reviewController.deleteReview);

module.exports = router;
