const Book = require("../models/Book");

const getAllBooksData = async(req, res) => {
    try {
        const books = await Book.find({}).sort({createdAt: -1});
        res.status(200).json(books)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// post a new book data
const postBookData = async(req, res) => {
    const newBook = req.body;
    try {
        const result = await Book.create(newBook);
        res.status(200).json(result)
        
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error)
    }
};

// delete a book data
const deleteBookData = async(req, res) => {
    const bookId = req.params.id;
    // console.log(bookId)
    try {
        const deletedItem = await Book.findByIdAndDelete(bookId);

        // console.log(deletedItem);

        if(!deletedItem){
            return res.status(404).json({ message:"Book not found"})
        }
        res.status(200).json({message: "Book deleted successfully!"})
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get single book data
const singleBookData = async (req, res) => {
    const bookId = req.params.id;
    try {
        const book = await Book.findById(bookId);
        res.status(200).json(book)
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// update single book data
const updateBookData = async (req, res) => {
    const bookId = req.params.id;
    const { bookTitle, author, imageUrl, category, description, price, discountedPrice, bestSeller} = req.body;
    try {
        const updatedBook = await Book.findByIdAndUpdate(bookId, 
            { bookTitle, author, imageUrl, category, description, price, discountedPrice, bestSeller}, 
            {new: true, runValidator: true}
            );

        if(!updatedBook) {
            return res.status(404).json({ message:"Book not found"})
        }

        res.status(200).json(updatedBook)
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = {
    getAllBooksData,
    postBookData, 
    deleteBookData,
    singleBookData,
    updateBookData
}