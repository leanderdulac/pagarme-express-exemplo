var pagarme = require('pagarme');
var express = require('express');
var JSONFormatter = require('json-format');
var config = require(__dirname + '/../config.json');
var router = express.Router();
var card_id;

router.get('/', function (req, res, next) {
    res.render('one-click-buy', {
        title: 'Transações - One Click Buy'
    });
});

// Os POSTs nessa URL vão criar uma transação no ambiente de testes
router.post('/', function (req, res, next) {
    var form_data = req.body;
    // Cria uma conexão com o Pagar.me 
    pagarme.client.connect({
            api_key: config.api_key
        })
        // Vamos usar o Card ID para realizar a compra com 1 clique
        .then(client => client.transactions.create({
            "card_id": localStorage.getItem('card_id'),
            "card_cvv": form_data.card_cvv,
            "installments": form_data.installments,
            "payment_method": "credit_card",
            "amount": form_data.amount,
            "customer": {
                "email": "aardvark.silva@gmail.com",
                "name": "Aardvark da Silva",
                "document_number": "18152564000105",
                "address": {
                    "zipcode": "04571020",
                    "neighborhood": "Cidade Monções",
                    "street": "R. Dr. Geraldo Campos Moreira",
                    "street_number": "240"
                },
                "phone": {
                    "number": "987654321",
                    "ddd": "11"
                }
            }
        }))
        // Vamos fazer o render de uma página com o JSON retornado pela API 
        .then(transactions => res.render('resultado', {
            back_url: '/one-click-buy',
            json_result: JSONFormatter(transactions, {
                type: 'space',
                size: 2
            })
        }))
        // Se houve algum erro, vamos enviar o resultado do erro
        .catch(error => res.render('resultado', {
            back_url: '/one-click-buy',
            json_result: JSONFormatter(error, {
                type: 'space',
                size: 2
            })
        }));
});

module.exports = router;