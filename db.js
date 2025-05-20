const mongoose = require('mongoose');
require('dotenv').config(); // Load .env variables

const uri = process.env.MONGO_URI;

mongoose.connect(uri, {
useNewUrlParser: true,
useUnifiedTopology: true,
})
.then(() => {
console.log('MongoDB connected successfully');
})
.catch(err => {
console.error('MongoDB connection error:', err);
});

module.exports = mongoose;