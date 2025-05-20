require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth.routes");
const bookRoutes = require("./routes/book.routes");
const reviewRoutes = require("./routes/review.routes");

const app = express();
app.use(express.json());

// Routes
app.use(authRoutes);
app.use(bookRoutes);
app.use(reviewRoutes);

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
