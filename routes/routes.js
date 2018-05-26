const path = require('path');

module.exports = function(app) {
  // renders main page
  app.get('/', function(req, res) {
    res.render('index');
  });

  // handles any parameter for /new/
  app.get('/new/:url*', function(req, res) {
    console.log(req.params);
    const urls = {
      original_url: req.params.url + req.params['0'],
      short_url: req.protocol + '://' + req.get('host') + '/'
    };
    res.json(urls);
  });
};
