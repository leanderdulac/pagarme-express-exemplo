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
        .then(client => client.transactions.all({
            status: 'authorized'
        }))
        .then(transactions => res.render('cartao-de-credito', {
            title: 'Transações - Cartão de Crédito',
            transactions: transactions
        }))
    
});

// Os POSTs nessa URL vão criar uma transação no ambiente de testes
router.post('/', function (req, res, next) {
    var form_data = req.body;

    // Cria uma conexão com o Pagar.me 
    pagarme.client.connect({
            api_key: config.api_key
        })
        // Usa a conexão com o Pagar.me para criar uma transação
        .then(client => client.transactions.create({
            "card_id": form_data.card_id,
            "card_cvv": form_data.card_cvv,
            "capture": form_data.capture,
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
            },
            "async": false,
            "installments": form_data.installments,
            "payment_method": "credit_card",
            "amount": form_data.amount 
        }))
        // Vamos fazer o render de uma página com o JSON retornado pela API 
        .then(transactions => res.send(transactions))
        .catch(error => res.send(error));
});

// Os POSTs nessa URL vão criar uma transação no ambiente de testes
router.post('/captura', function (req, res, next) {
    var form_data = req.body;

    // Cria uma conexão com o Pagar.me 
    pagarme.client.connect({
            api_key: config.api_key
        })
        // Usa a conexão com o Pagar.me para criar uma transação
        .then(client => client.transactions.capture({
            "id": form_data.id,
            "amount": form_data.amount
        }))
        // Vamos fazer o render de uma página com o JSON retornado pela API 
        .then(result => res.send(result))
        .catch(error => res.send(error));
});

module.exports = router;