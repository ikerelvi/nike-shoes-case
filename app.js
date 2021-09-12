'use strict';
require('dotenv').config({ silent: true });

const express = require('express');
const axios   = require('axios');
const generator = require('./utils/generateCode');
const postgre   = require('./utils/postgreFunctions');
const marketing = require('./utils/marketingCloud');
const { config } = require('dotenv');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


/**
 * Endpoint that returns a short version of an url
 * @request Content-Type application/json  body { "entryURL": "https://www.koahealth.com/"}
 * @response Content-Type application/json status and response
 */
app.post('/validate', async (req, res, next) => {
    console.log(req.body);
    let selectEmailExists = `SELECT EXISTS(SELECT 1 FROM users WHERE email = '${req.body.email}')`;

    try {
        let { rows } = await postgre.query(selectEmailExists);
        if (rows[0].exists) res.status(200).send({ response: 'The User has already a vouchers code' });
        else next();
    }
    catch (e) {
        console.log(e);
    }

    }, async (req, res, next) => {
        let voucherCode = generator.generatecode();
        req.voucherCode = voucherCode[0];
        console.log(`voucherCode: ${voucherCode}`);
        console.log(`email: ${req.body.email}`);
        let insertQuery = `INSERT INTO users VALUES ('${req.body.email}','${voucherCode}')`;
        try {
            let rows = await postgre.query(insertQuery);
            //console.log(`rows.rowCount: ${rows.rowCount}`);
            if(rows.rowCount != 1) res.status(200).send({ response: 'Some table error' });
            else next();
        }
        catch (e) {
            console.log(e);
        }
    }, async (req, res, next) => {
        let configAuth = marketing.config;
        // let test = `${process.env.URL_AUTH+process.env.TOKEN_AUTH}`;
        // console.log(test);
        configAuth.url = `${process.env.URL_AUTH+process.env.TOKEN_AUTH}`;
        configAuth.data = marketing.dataAuth;
        axios(configAuth)
        .then(function (response) {
            //console.log(JSON.stringify(response.data));
            //console.log(`accessToken: ${response.data.access_token}`);
            req.token = response.data.access_token;
            next();
        })
        .catch(function (error) {
            console.log(error);
        });
    }, async (req, res, next) => {
        let dataJourney2send = marketing.dataJourney;
        dataJourney2send.ContactKey = 'test123';
        dataJourney2send.Data = {
            email: req.body.email,
            voucher_code: req.voucherCode
        }

        let configJourney = marketing.config;
        configJourney.url = `${process.env.URL_APIS+process.env.JOURNEY_EVENT}`;
        configJourney.data = dataJourney2send;
        configJourney.headers = {
            Authorization: `Bearer ${req.token}`,
            'Content-Type': 'application/json'
        }
        // console.log(`accessToken: ${req.token}`);
        // console.log(dataJourney2send);
        console.log(configJourney);
        axios(configJourney)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
    }
);

app.get('/monitor/liveness', (req, res) => {
    console.log(" ## Nike Shoes Case is up an running! ##")
    res.json({ status: "## START -- Nike Shoes Case is up an running! ##" });
});

app.use(express.static(__dirname + "/public"));

module.exports = app;