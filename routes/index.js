var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('vai render')
  res.render('index', { title: 'Exemplos Pagar.me' });
});

module.exports = router;
