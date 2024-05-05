const express = require("express");
const Book = require("../models/Book");
const router = express.Router();

const bookControllers = require('../controllers/bookControllers')

// get all books  

router.get('/all-books', bookControllers.getAllBooksData )

// post a book data
router.post('/upload-book', bookControllers.postBookData);

// delete a book data
router.delete('/book/:id', bookControllers.deleteBookData);

// get single book data
router.get('/books/:id', bookControllers.singleBookData);

// update single book data
router.patch('/book/:id', bookControllers.updateBookData)

module.exports= router;