const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const items = require('./routes/api/items');

const app = express();

app.use(bodyParser.json());

const database = require('./config/keys').mongoURI;

mongoose
  .connect(database)
  .then(() => console.log('MongoDB Connected...'))
  .catch(error => console.log(error));

app.use('/api/items', items);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://reverie_forest:<password>@cluster0.ivpyg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });