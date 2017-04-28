var pagarme = require('pagarme');
var config = require(__dirname + '/../config.json');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('armazenar-cartao', {});
})

router.post('/', function (req, res, next) {
    var card_hash = req.body.card_hash;
    pagarme.client.connect({
            api_key: config.api_key
        })
        // Usa a conexão com o Pagar.me para criar uma transação
        .then(client => client.cards.create({
            card_hash: card_hash
        }))
        .then((card) => res.send(card))
        .catch(error => res.send(error));
});

module.exports = router;