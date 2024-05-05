const Writer = require("../models/Writer");

const getAllWritersData = async(req, res) => {
    try {
        const writers = await Writer.find({}).sort({createdAt: -1});
        res.status(200).json(writers)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// post a new writer data
const postWriterData = async(req, res) => {
    const newWriter = req.body;
    try {
        const result = await Writer.create(newWriter);
        res.status(200).json(result)
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// delete a writer data
const deleteWriterData = async(req, res) => {
    const writerId = req.params.id;
    // console.log(writerId)
    try {
        const deletedItem = await Writer.findByIdAndDelete(writerId);

        // console.log(deletedItem);

        if(!deletedItem){
            return res.status(404).json({ message:"Writer not found"})
        }
        res.status(200).json({message: "Writer deleted successfully!"})
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get single writer data
const singleWriterData = async (req, res) => {
    const writerId = req.params.id;
    try {
        const writer = await Writer.findById(writerId);
        res.status(200).json(writer)
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// update single writer data
const updateWriterData = async (req, res) => {
    const writerId = req.params.id;
    const { name, image, publishedBook, description, } = req.body;
    try {
        const updatedWriter = await Writer.findByIdAndUpdate(writerId, 
            {name, image, publishedBook, description, }, 
            {new: true, runValidator: true}
            );

        if(!updatedWriter) {
            return res.status(404).json({ message:"Writer not found"})
        }

        res.status(200).json(updatedWriter)
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = {
    getAllWritersData,
    postWriterData, 
    deleteWriterData,
    singleWriterData,
    updateWriterData
}