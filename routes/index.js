var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index', { title: 'RWTH Kalender Abo' });
});

module.exports = router;
