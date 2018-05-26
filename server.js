const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;

// Sets up Express to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

routes(app);

// starts the server
app.listen(PORT, function() {
  console.log('App listening on PORT: ' + PORT);
});
