var pagarme = require('pagarme');
var express = require('express');
var JSONFormatter = require('json-format');
var config = require(__dirname + '/../config.json');
var router = express.Router();


router.get('/', function (req, res, next) {
    // Cria uma conexão com o Pagar.me 
    pagarme.client.connect({
            api_key: config.api_key
        })
        // Usa a conexão com o Pagar.me para criar uma transação
        .then(client => client.subscriptions.all())
        // Vamos fazer o render de uma página com o JSON retornado pela API 
        .then(subscriptions => res.render('assinaturas', {subscriptions: subscriptions}))
        // Se houve algum erro, vamos enviar o resultado do erro
        .catch(error => res.render('resultado', {
            back_url: '/assinaturas/',
            json_result: JSONFormatter(error, {
                type: 'space',
                size: 2
            })
        }))
});

module.exports = router;