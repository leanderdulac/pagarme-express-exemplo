var pagarme = require('pagarme');
var express = require('express');
var JSONFormatter = require('json-format');
var config = require(__dirname + '/../config.json');
var router = express.Router();
var plan;

router.get('/', function (req, res, next) {
    // Cria uma conexão com o Pagar.me 
    pagarme.client.connect({
            api_key: config.api_key
        })
        // Usa a conexão com o Pagar.me para criar uma transação
        .then(client => {
            // Antes de criar Assinaturas a gente precisa ter um Plano
            if(!plan) {
                // Vamos criar um Plano de exemplo
                client.plans.create({
                    'name': 'Nome do Plano',
                    'days': 30,
                    'amount': 1000
                }).then(local_plan => plan = local_plan);
            }
            return client.subscriptions.all()
        })
        // Vamos fazer o render de uma página com o JSON retornado pela API 
        .then(subscriptions => res.render('assinaturas', {
            subscriptions: subscriptions
        }))
        // Se houve algum erro, vamos enviar o resultado do erro
        .catch(error => res.render('resultado', {
            back_url: '/assinaturas/',
            json_result: JSONFormatter(error, {
                type: 'space',
                size: 2
            })
        }))
});


router.post('/', function (req, res, next) {
    if(!plan) return;
    var form_data = req.body;
    // Cria uma conexão com o Pagar.me 
    pagarme.client.connect({
            api_key: config.api_key
        })
        // Usa a conexão com o Pagar.me para criar uma transação
        .then(client => client.subscriptions.create({
            "plan_id": plan.id,
            "card_number": form_data.card_number,
            "card_cvv": form_data.card_cvv,
            "card_holder_name": form_data.card_holder_name,
            "card_expiration_date": form_data.card_expiration_date,
            "card_holder_name": form_data.card_holder_name,
            "customer": {
                "email": "aardvark.silva@gmail.com",
                "name": form_data.card_holder_name,
                "document_number": "18152564000105"
            }
        }))
        // Vamos fazer o render de uma página com o JSON retornado pela API 
        .then(subscriptions => res.render('resultado', {
            back_url: '/assinaturas/',
            json_result: JSONFormatter(subscriptions, {
                type: 'space',
                size: 2
            })
        }))
        // Se houve algum erro, vamos enviar o resultado do erro
        .catch(error => res.render('resultado', {
            back_url: '/assinaturas/',
            json_result: JSONFormatter(error, {
                type: 'space',
                size: 2
            })
        }));
});


module.exports = router;