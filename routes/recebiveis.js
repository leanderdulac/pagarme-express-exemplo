var pagarme = require('pagarme');
var express = require('express');
var moment = require('moment-timezone');
var JSONFormatter = require('json-format');
var config = require(__dirname + '/../config.json');
var router = express.Router();
var company; 

router.get('/', function (req, res, next) {
    // Cria uma conexão com o Pagar.me 
    pagarme.client.connect({
            api_key: config.api_key
        })
        // Usa a conexão com o Pagar.me para listar os 10 payables mais recentes
        .then(client => {
            // Vamos armazenar as informações da empresa para pegar o recebedor padrão e com isso solicitar antecipações
            client.company.current({}).then(local_company => company = local_company);
            return client.payables.all({})
        })
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

router.post('/', function (req, res, next) {
    var form_data = req.body;
    if(!company) return;
    // Cria uma conexão com o Pagar.me 
    pagarme.client.connect({
            api_key: config.api_key
        })
        // Usa a conexão com o Pagar.me para criar uma antecipação
        .then(client => client.bulkAnticipations.create({
            'timeframe': form_data.timeframe,
            'payment_date': moment(new Date()).tz('Americas/Sao_Paulo').add(1,'d').valueOf(), // D+0 até as 11AM ou D+1: nessse exemplo usamos D+1
            'requested_amount': 1 * form_data.requested_amount,
            'recipientId': company.default_recipient_id.test
        }))
        // Vamos fazer o render de uma página com o JSON retornado pela API 
        .then(result => res.render('resultado', {
            back_url: '/recebiveis/',
            json_result: JSONFormatter(result, {
                type: 'space',
                size: 2
            })
        }))
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