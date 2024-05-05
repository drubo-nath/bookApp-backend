const express = require('express')
const app = express()
const port = process.env.port || 5000
const cors = require('cors')

//middleware
app.use(cors())
app.use(express.json())

//[]
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//mongdb configuration

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.7hj0csw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //books collection
    const bookCollection = client.db("BookInventory").collection('books')
    //collection of writers
    const writerCollection = client.db("BookInventory").collection('writers')


    // inset a book to db : post method
    app.post("/upload-book", async(req, res) => {
        const data = req.body
        const result = await bookCollection.insertOne(data);
        res.send(result);
    })

    // get all books from the database
    app.get("/all-books", async(req, res) => {
        const books =  bookCollection.find();
        const result = await books.toArray();
        res.send(result);
    })

    // update a book data : patch or update method
    app.patch("/book/:id", async(req, res) => {
        const id = req.params.id;
        // console.log(id);
        const updateBookData = req.body;
        const filter = {_id: new ObjectId(id)}
        const options = { upsert : true }

        const updateDoc = {
            $set: {
                ...updateBookData
            }
        }

        //update
        const result = await bookCollection.updateOne(filter,
            updateDoc, options );
            res.send(result);
    })

    //delete a book data
    app.delete("/book/:id", async(req, res) => {
        const id = req.params.id;
        // console.log(id);
        const updateBookData = req.body;
        const filter = {_id: new ObjectId(id)}
        const result = await bookCollection.deleteOne(filter);
        res.send(result);
    })

    //find by catergory
    app.get("/all-books", async(req, res) => {
        let query = {};
        if(req.query?.category){
            query = {category: req.query.catergory}
        }
        const result = await bookCollection.find(query).toArray();
        res.send(result);
    })

    //to get single book data
    app.get("/books/:id", async(req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id)};
      const result = await bookCollection.findOne(filter);
      res.send(result);

    } )


    // inset a writer to db : post method
    app.post("/upload-writer", async(req, res) => {
      const data = req.body
      const result = await writerCollection.insertOne(data);
      res.send(result);
  })

  // get all writers from the database
  app.get("/all-writers", async(req, res) => {
      const writers =  writerCollection.find();
      const result = await writers.toArray();
      res.send(result);
  })

  // update a writer data : patch or update method
  app.patch("/writers/:id", async(req, res) => {
      const id = req.params.id;
      // console.log(id);
      const updateWriterData = req.body;
      const filter = {_id: new ObjectId(id)}
      const options = { upsert : true }

      const updateDoc = {
          $set: {
              ...updateWriterData
          }
      }

      //update
      const result = await writerCollection.updateOne(filter,
          updateDoc, options );
          res.send(result);
  })

  //delete a writer data
  app.delete("/writers/:id", async(req, res) => {
      const id = req.params.id;
      // console.log(id);
      const updateWriterData = req.body;
      const filter = {_id: new ObjectId(id)}
      const result = await writerCollection.deleteOne(filter);
      res.send(result);
  })

  //find by catergory
  app.get("/all-writers", async(req, res) => {
      let query = {};
      if(req.query?.category){
          query = {category: req.query.catergory}
      }
      const result = await writerCollection.find(query).toArray();
      res.send(result);
  })

  //to get single writer data
  app.get("/writers/:id", async(req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id)};
    const result = await writerCollection.findOne(filter);
    res.send(result);

  } )

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})