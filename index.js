const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
require('dotenv').config()

// middleware
app.use(cors());
app.use(express.json());

// mongodb configuration using mongoose

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.7hj0csw.mongodb.net/BookInventory?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(
    console.log("MongoDB Connected Successfully!")
  )
  .catch((error) => console.log("Error connecting to MongoDB", error));

//   jwt authentication
  app.post('/jwt', async(req, res) => {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1hr'
    })
    res.send({token});
  })


//   import routes here
const bookRoutes = require('./api/routes/bookRoutes');
const writerRoutes = require('./api/routes/writerRoutes');
const userRoutes = require('./api/routes/userRoutes')
app.use('/', bookRoutes)
app.use('/', writerRoutes);
app.use('/users', userRoutes);

app.get("/", (req, res) => {
  res.send("Hello Pranto  Server!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});