var pagarme = require('pagarme');
var express = require('express');
var JSONFormatter = require('json-format');
var config = require(__dirname + '/../config.json');
var router = express.Router();


router.get('/', function (req, res, next) {
    res.render('postback', {
        title: 'Transações - POSTback'
    });
});

// Os POSTs nessa URL vão criar uma transação no ambiente de testes
router.post('/', function (req, res, next) {
    var form_data = req.body;
    /*console.log(form_data)*/

    // Cria uma conexão com o Pagar.me 
    pagarme.client.connect({
            api_key: config.api_key
        })
        // Usa a conexão com o Pagar.me para criar uma transação
        .then(client => client.transactions.create({
            "api_key": config.api_key,
            "card_id": form_data.card_id,
            "card_cvv": form_data.card_cvv,
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
            "capture": true,
            // Vamos executar a chamada assíncrona
            "async": true,
            "installments": form_data.installments,
            "payment_method": "credit_card",
            "amount": form_data.amount * 1,
            // Passando a URL que vai receber o resultado
            "postback_url": form_data.postback_url
        }))
        // Vamos fazer o render de uma página com o JSON retornado pela API 
        .then(transactions => res.send(transactions))
        // Se houve algum erro, vamos enviar o resultado do erro
        .catch(error => res.render('resultado', {
            back_url: '/transacoes/postback',
            json_result: JSONFormatter(error, {
                type: 'space',
                size: 2
            })
        }))
});

module.exports = router;