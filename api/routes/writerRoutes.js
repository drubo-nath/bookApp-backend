const express = require("express");
const Writer = require("../models/Writer");
const router = express.Router();

const writerControllers = require('../controllers/writerControllers')

// get all writers  

router.get('/all-writers', writerControllers.getAllWritersData )

// post a book data
router.post('/upload-writer', writerControllers.postWriterData);

// delete a writer data
router.delete('/writers/:id', writerControllers.deleteWriterData);

// get single writer data
router.get('/writers/:id', writerControllers.singleWriterData);

// update single writer data
router.patch('/writers/:id', writerControllers.updateWriterData)

module.exports= router;