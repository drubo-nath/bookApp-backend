const mongoose = require('mongoose');
const {Schema} = mongoose;

// create schema object for Writer
const writerSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 5
    },
    image: {
        type: String,
        required: false
    }, 
    publishedBooks: Number,
    description: String,
    createdAt: {
        type: Date,
        default: Date.now
    }

})

// create model
const Writer = mongoose.model("Writer", writerSchema);
module.exports = Writer;