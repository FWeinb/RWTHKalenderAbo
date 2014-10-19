var express = require('express');

var crypto = require('../lib/crypto');

var router = express.Router();


var getCalendar = require('../lib/getCalendar');
var addDescription = require('../lib/addDescription');


router.get('/get', function(req, res, next) {
  if (!!req.query.login) {

    var user = crypto.decrypt(req.query.login);

    if (user !== null) {
      getCalendar(user, function(err, responseCalendar){
        if (err){
          return next(err);
        }
        res.header('Content-Type', 'text/calendar; charset=UTF-8'); // Set correct Content-Type
        res.header('X-PUBLISHED-TTL', 'PT1H'); // Set update interval to 1h (Exchange MS)
        res.header('REFRESH-INTERVAL', 'PT1H'); // Offical Spec
        res.header('Content-Disposition', responseCalendar.headers['content-disposition']);
        var ics = addDescription(responseCalendar.body);
        res.write(ics);
        res.end();
      });
    } else {
      next(new Error('Fehler beim Entschlüsseln.'));
    }
  }
});

router.get('/create', function(req, res){
  res.render('create');
});

router.post('/generate', function(req, res){
  var user = { username : req.body.username, password : req.body.password };
  // Test passwort
  getCalendar(user, function(error, response){
    if (error) {
      res.json({
        valid : false
      });
    } else {
      res.json({
        valid : true,
        encrypted : crypto.encrypt(user)
      });
    }
  });
});


module.exports = router;
