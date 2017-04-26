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
        .then(client => client.payables.all({
            
        }))
        // Vamos fazer o render de uma página com o JSON retornado pela API 
        .then(payables => res.render('recebiveis', {payables: payables}))
        // Se houve algum erro, vamos enviar o resultado do erro
        .catch(error => res.render('resultado', {
            back_url: '/recebiveis/',
            json_result: JSONFormatter(error, {
                type: 'space',
                size: 2
            })
        }))
});

module.exports = router;