const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const items = require('./routes/api/items');

const app = express();

app.use(bodyParser.json());

const database = require('./config/keys').mongoURI;

mongoose
  .connect(database)
  .then(() => console.log('MongoDB Connected...'))
  .catch(error => console.log(error));

app.use('/api/items', items);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));