'use strict';

let mysql = require('mysql');

let connection = mysql.createConnection({
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    database: process.env.DB_DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    // timezone: 'jst',
});

module.exports = connection;