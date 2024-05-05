const mongoose = require('mongoose');
const {Schema} = mongoose;

// create schema object for Book
const bookSchema = new Schema({
    bookTitle: {
        type: String,
        trim: true,
        required: true,
        minlength: 5
    },
    author: String,
    imageUrl: String, 
    category: String,
    description: String,
    language: String, 
    country: String,
    price: Number,
    discountedPrice: { type: Number, default: 0 },
    bestSeller : { type: Boolean, default: false },
    newBook : { type: Boolean, default: false },
    publishedYear: Number,
    ISBN : Number,
    edition: Number,
    inventory: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }

})

// create model
const Book = mongoose.model("Book", bookSchema);
module.exports = Book;