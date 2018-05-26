const path = require('path');
const randomNum = require('../public/js/randomNum');

module.exports = function(app, db) {
  // renders main page
  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('/new', (req, res) => {
    res.json('Invalid URL');
  });

  // redirects short url to the original url
  app.get('/:id', (req, res) => {
    db
      .collection('urls')
      .findOne(
        { short_url: req.protocol + '://' + req.get('host') + '/' + req.params.id },
        (err, result) => {
          if (err) throw err;
          res.redirect(result.original_url);
        }
      );
  });

  // regex to match valid urls
  const website = /((new)\/(http|https)[:][\/]{2}([w]{3}[.])?\w+[.](com|net|org|))$/;

  app.get(website, function(req, res) {
    // object that gets saved to the db
    const urlsObj = {
      original_url: req.params[0].slice(4),
      short_url: req.protocol + '://' + req.get('host') + '/' + randomNum()
    };

    // creates a copy of urlsObj by reference
    // so that the object _id is not attached to it when saved to the db
    const urlsObjOrig = Object.assign({}, urlsObj);

    // checks if the url exists
    db.collection('urls').findOne({ original_url: urlsObjOrig.original_url }, (err, result) => {
      if (err) throw err;

      // saves the url if it does not exist
      if (result === null) {
        saveUrl(urlsObjOrig);
        // sends the existing short url if the original url already exists
      } else {
        res.json({
          original_url: result.original_url,
          short_url: result.short_url
        });
      }
    });

    function saveUrl(urlsObjOrig) {
      // saves the url to the db
      db.collection('urls').insert(urlsObj, (err, result) => {
        if (err) throw err;
        res.json(urlsObjOrig);
      });
    }
  });

  app.get('*', (req, res) => {
    res.json('Invalid URL Format. Ensure that you have a valid protocol and real site');
  });
};
