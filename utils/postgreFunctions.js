const { Pool } = require('pg');

const conexion = {
    user: process.env.PSQL_USERNAME,
    host: process.env.PSQL_HOSTNAME,
    database: process.env.PSQL_DB,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
};

const pool  = new Pool(conexion);

module.exports = {
    query: (text) => pool.query(text)
}
