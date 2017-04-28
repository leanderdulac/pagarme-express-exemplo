var pagarme = require('pagarme');
var express = require('express');
var JSONFormatter = require('json-format');
var config = require(__dirname + '/../config.json');
var router = express.Router();
var recipients; 

router.get('/', function (req, res, next) {
    // Cria uma conexão com o Pagar.me 
    pagarme.client.connect({
            api_key: config.api_key
        })
        // Usa a conexão com o Pagar.me para criar uma transação
        .then(client => client.transactions.all())
        // Vamos fazer o render de uma página com o JSON retornado pela API 
        .then(local_transactions => {
            transactions = local_transactions;
            return res.render('refund', {
                transactions: transactions
            })
        })
        // Se houve algum erro, vamos enviar o resultado do erro
        .catch(error => res.render('resultado', {
            back_url: '/refund/',
            json_result: JSONFormatter(error, {
                type: 'space',
                size: 2
            })
        }));
});

router.post('/', function (req, res, next) {
    var form_data = req.body;
    // Cria uma conexão com o Pagar.me 
    pagarme.client.connect({
            api_key: config.api_key
        })
        // Usa a conexão com o Pagar.me para criar uma transação
        .then(client => client.transactions.refund({
            'id': form_data.id,
            'amount': form_data.amount,
            'bank_account': {
                'bank_code': '111',
                'agencia': '1234',
                'conta': '09876',
                'conta_dv': '1',
                'document_number': '12312312312',
                'legal_name': 'joao miranda'
            }
        }))
        // Vamos fazer o render de uma página com o JSON retornado pela API 
        .then(refund => res.send(refund))
        // Se houve algum erro, vamos enviar o resultado do erro
        .catch(error => res.render('resultado', {
            back_url: '/refund/',
            json_result: JSONFormatter(error, {
                type: 'space',
                size: 2
            })
        }));
});


module.exports = router;