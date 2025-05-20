const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller");
const authenticate = require("../middleware/auth.middleware");

// Public routes
router.get("/books", bookController.getBooks);
router.get("/books/search", bookController.searchBooks);
router.get("/books/:id", bookController.getBookDetails);

// Protected route - requires authentication
router.post("/books", authenticate, bookController.addBook);

module.exports = router;
