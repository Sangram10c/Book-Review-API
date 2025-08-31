# 📚 Book Review API

A Node.js + Express.js + MongoDB-based RESTful API for managing book reviews, users, and search functionality with JWT-based authentication.


## 🚀 Project Setup Instructions


1. Clone the repository: Sangram10c/Book-Review-API.git
   
    cd book-review-api


3. Install dependencies:

    npm install


4. Set up environment variables:
     Create a .env file in the root directory:

     PORT=3000
     MONGODB_URI=mongodb://localhost:27017/bookreview
     JWT_SECRET=your_secret_key_here

5. Start MongoDB:
   
     Ensure MongoDB is running locally (default port 27017)

6. Run the server:

    node app.js

   Or use nodemon for development:

    npx nodemon app.js


## ▶️ How to Run Locally

  After starting the server (via npm start or node app.js), your API will be accessible at:
  http://localhost:3000


You can test routes using:

* Postman
* curl
* browser (for GET requests)




## 📬 Example API Requests

🔐 User Signup


    curl -X POST http://localhost:3000/api/auth/signup \
    -H "Content-Type: application/json" \
    -d '{"username": "john", "email": "john@example.com", "password": "123456"}'



🔐 User Login (Get JWT Token)


    curl -X POST http://localhost:3000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email": "john@example.com", "password": "123456"}'



📘 Add a Book (Requires JWT)

    curl -X POST http://localhost:3000/api/books \
    -H "Authorization: Bearer YOUR_TOKEN_HERE" \
    -H "Content-Type: application/json" \
    -d '{"title": "Clean Code", "author": "Robert C. Martin", "description": "Great book!"}'




🔍 Search Books with Pagination


    curl "http://localhost:3000/api/books/search?q=clean&page=1&limit=5"




📝 Post a Review for a Book


    curl -X POST http://localhost:3000/api/reviews \
    -H "Authorization: Bearer YOUR_TOKEN_HERE" \
    -H "Content-Type: application/json" \
    -d '{"bookId": "BOOK_ID", "rating": 5, "comment": "Must read!"}'





## 🧠 Design Decisions / Assumptions

* MongoDB is used for schema-less flexibility and JSON-like storage.
* JWT is used for stateless authentication.
* Passwords are hashed using bcrypt.
* Basic error handling and validation are implemented.
* Pagination is available in the book search endpoint.
* Reviews are linked to both the user and the book.
* Authentication is required for posting reviews or adding books.




## 🗃️ Database Schema Overview

Schemas (Mongoose Models):

🔹 User
    
    {
        username: String,
        email: String,
        password: String // hashed
    }


🔹 Book

       {
          title: String,
          author: String,
          description: String,
          createdAt: Date
        }


🔹 Review

       {
          user: ObjectId (ref: User),
          book: ObjectId (ref: Book),
          rating: Number (1 to 5),
          comment: String,
          createdAt: Date
        }


