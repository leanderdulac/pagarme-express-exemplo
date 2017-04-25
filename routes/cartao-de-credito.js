var pagarme = require('pagarme');
var express = require('express');
var JSONFormatter = require('json-format');
var config = require(__dirname + '/../config.json');
var router = express.Router();


router.get('/', function (req, res, next) {
    res.render('cartao-de-credito', {
        title: 'Transações - Cartão de Crédito'
    });
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
            "card_number": form_data.card_number,
            "card_cvv": form_data.card_cvv,
            "card_holder_name": form_data.card_holder_name,
            "card_expiration_date": form_data.card_expiration_date,
            "capture": form_data.capture,
            "customer": {
                "email": "aardvark.silva@gmail.com",
                "name": form_data.card_holder_name,
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
            "amount": form_data.amount * 1
        }))
        // Vamos fazer o render de uma página com o JSON retornado pela API 
        .then(transactions => res.render('resultado', {
            back_url: '/transacoes/cartao-de-credito',
            json_result: JSONFormatter(transactions, {
                type: 'space',
                size: 2
            })
        }))
        // Se houve algum erro, vamos enviar o resultado do erro
        .catch(error => res.render('resultado', {
            back_url: '/transacoes/cartao-de-credito',
            json_result: JSONFormatter(error, {
                type: 'space',
                size: 2
            })
        }))
});

module.exports = router;