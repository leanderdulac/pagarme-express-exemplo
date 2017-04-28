# Pagar.me Express Exemplo

Esse projeto é um guia do fluxo de uso da API do Pagar.me 

## 01. Armazenar Cartão de Crédito
Aprenda a forma correta de Armazenar o Cartão de Crédito de forma segura.

## 02. Transações com Cartão de Crédito
Cria uma transação com Cartão de Crédito, com uma ou mais parcelas.

## 03. Transações com POSTback
Chamada assíncrona onde o resultado da chamada é retornado através de um POST em uma URL do cliente.

## 04. Transações com One Click Buy
Usar um cartão salvo para efetuar uma compra com um clique.

## 05. Transações com Checkout
Usando o Checkout do Pagar.me para criar uma transação.

## 06. Transações com Boleto
Cria uma transação apenas autorizando Boleto e simula o pagamento.

## 07. Criando com Planos e Assinaturas
Lista todas as Assinaturas, Cria um Plano (apenas no código) e permite criar novas Assinaturas associadas ao plano gerado.

## 08. Lidando com Recebíveis
Lista todos os Recebíveis e permite antecipar esses Recebíveis.

## 09. Lidando com Recebedores
Lista todos os Recebedores e permite fazer transações com split (divididas entre os Recebedores).

## 10. Efetuando Estornos
Lista todas as transações e permite estorná-las total ou parcialmente.

# Instalação

Clone o repositório:

```
$ git clone git@github.com:pagarme/pagarme-express-exemplo.git
```

Instale as dependências: 

```
$ npm install
```

Inicie o projeto: 

```
$ DEBUG=pagarme-express-exemplo:* npm start
```

E o site será servido em http://localhost:3000/
 