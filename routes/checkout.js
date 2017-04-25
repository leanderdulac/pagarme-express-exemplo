/*var pagarme = require('pagarme');*/
var express = require('express');
var JSONFormatter = require('json-format');
var config = require(__dirname + '/../config.json');
var router = express.Router();


router.get('/', function (req, res, next) {
    res.render('checkout', {
        title: 'Transações - Checkout'
    });
});


module.exports = router;