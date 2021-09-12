const { Pool } = require('pg');

const conexion = {
    user: process.env.PSQL_USERNAME,
    host: process.env.PSQL_HOSTNAME,
    database: process.env.PSQL_DB,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
};

const pool  = new Pool(conexion);


/**
 * Function that returns the result for an input query
 * @param {String} text The input query
 * @return {Array} Rows with the result of that query
 */
module.exports = {
    query: (text) => pool.query(text)
}
