'use strict';
require('dotenv').config({ silent: true }); //Loads env variables from .env file

const express = require('express'); // Web App Framework
const axios   = require('axios');   // For external API requests
const generator = require('./utils/generateCode'); // Code Generation related functions
const postgre   = require('./utils/postgreFunctions'); // Postgresql related functions
const marketing = require('./utils/marketingCloud'); // SFMC related functions
const app       = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * Endpoint that validates the email and triggers the Email Journey
 * @request Content-Type application/json  body example {
                                                Quality: { affordable: 1, comfortable: 2, 'easy to use': 3 },
                                                satisfaction: 4,
                                                'recommend friends': 4,
                                                'price to competitors': 'Priced about the same',
                                                email: 'ikersa92@gmail.com'
                                            }
 * @response Content-Type application/json status and response
 */
app.post('/validate', async (req, res, next) => {
    // 1. Check if the email already exists 
    let selectEmailExists = `SELECT EXISTS(SELECT 1 FROM users WHERE email = '${req.body.email}')`;

    try {
        let { rows } = await postgre.query(selectEmailExists);
        if (rows[0].exists) res.status(400).send({ response: 'Bad Request: The User has already a vouchers code' });
        else next();
    }
    catch (e) {
        console.log(e);
        res.status(500).send({response: `Server Error: ${e}`});
    }

    }, async (req, res, next) => {
        // 2. Generate the voucher code
        let voucherCode = generator.generatecode();
        req.voucherCode = voucherCode[0];

        //3. Insert the email and the code into the database
        let insertQuery = `INSERT INTO users VALUES ('${req.body.email}','${voucherCode}')`;
        try {
            let rows = await postgre.query(insertQuery);
            if(rows.rowCount != 1) res.status(400).send({ response: 'Bad Request' });
            else next();
        }
        catch (e) {
            console.log(e);
            res.status(500).send({response: `Server Error: ${e}`});
        }
    }, async (req, res, next) => {
        //4. Request the token (TODO - Some function in order to retrieve the current Token if it exists in the database)
        // - 4.1 Prepare the auth config to be sent
        let configAuth = marketing.config;
        configAuth.url = `${process.env.URL_AUTH+process.env.TOKEN_AUTH}`;
        configAuth.data = marketing.dataAuth;

        // - 4.2 Axios call to request the token
        axios(configAuth)
        .then(function (response) {
            req.token = response.data.access_token;
            next();
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).send({response: `Server Error: ${error}`});
        });
    }, async (req, res) => {
        //5. Trigger the Journey
        // - 5.1 Prepare the data to be sent to the Journey
        let dataJourney2send = marketing.dataJourney;
        dataJourney2send.ContactKey = 'test123'; //(TODO - Some function in order to generate the ContactKey)
        dataJourney2send.Data = {
            email: req.body.email,
            voucher_code: req.voucherCode
        }
        
        // - 5.2 Prepare the config to be sent to the Journey
        let configJourney = marketing.config;
        configJourney.url = `${process.env.URL_APIS+process.env.JOURNEY_EVENT}`;
        configJourney.data = dataJourney2send;
        configJourney.headers = {
            Authorization: `Bearer ${req.token}`,
            'Content-Type': 'application/json'
        }
        
        // - 5.3 Axios call to trigger the journey
        axios(configJourney)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            res.status(200).send({response: `Request Accepted: Check your email in order to get the 10% Voucher Code!`});
        })
        .catch(function (error) {
            res.status(500).send({response: `Server Error: ${error}`});
        });
    }
);

/**
 * Liveness Endpoint 
 */
app.get('/monitor/liveness', (req, res) => {
    console.log(" ## Nike Shoes Case is up an running! ##")
    res.json({ status: "## START -- Nike Shoes Case is up an running! ##" });
});

app.use(express.static(__dirname + "/public"));

module.exports = app;