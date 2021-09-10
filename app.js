'use strict';
require('dotenv').config({ silent: true });

const express = require('express');
const generator = require('./utils/generateCode');
const postgre = require('./utils/postgreFunctions');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

    }, async (req, res) => {
        let voucherCode = generator.generatecode();
        console.log(`voucherCode: ${voucherCode}`);
        console.log(`email: ${req.body.email}`);
        let insertQuery = `INSERT INTO users VALUES ('${req.body.email}','${voucherCode}')`;
        try {
            let { rows } = await postgre.query(insertQuery);
            console.log(rows);
        }
        catch (e) {
            console.log(e);
    }
});

app.use(express.static(__dirname + "/public"));

module.exports = app;