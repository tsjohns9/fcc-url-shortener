const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const path = require('path');
const db = require('mongodb');

const app = express();
const PORT = process.env.PORT || 8000;

// Sets up Express to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// connect to the db
db.MongoClient.connect('mongodb://localhost/urlshortener', (err, db) => {
  // checks for errors
  if (err) throw err;
  else {
    console.log('Connected to mongodb');
  }

  // creates collection to store passed in urls
  db.createCollection('urls');

  // passes express and mongo to the routes
  routes(app, db);

  // starts the server
  app.listen(PORT, function() {
    console.log('App listening on PORT: ' + PORT);
  });
});
