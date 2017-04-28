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


router.post('/', function (req, res, next) {
    var form_data = req.body;

    // Cria uma conexão com o Pagar.me 
    pagarme.client.connect({
            api_key: config.api_key
        })
        // Usa a conexão com o Pagar.me para criar uma transação
        .then(client => client.transactions.capture({
            "id": form_data.token,
            "amount": form_data.amount
        }))
        // Vamos fazer o render de uma página com o JSON retornado pela API 
        .then(result => res.send(result))
        .catch(error => res.send(error));

});


module.exports = router;