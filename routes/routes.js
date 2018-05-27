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
          // when the app starts, result == null. prevents the app from crashing.
          if (result !== null) {
            res.redirect(result.original_url);
          } else {
            res.status(500).send('Something broke!');
          }
        }
      );
  });

  // regex to match valid urls
  const website = /((new)\/(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?)$/;

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
