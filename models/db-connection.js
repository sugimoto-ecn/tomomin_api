'use strict';

let mysql = require('mysql');

let connection = mysql.createConnection({
    host: process.env.DB_HOSTNAME || '127.0.0.1',
    port: process.env.DB_PORT || '5306',
    database: process.env.DB_DB_NAME || 'tomomin',
    user: process.env.DB_USERNAME || 'project',
    password: process.env.DB_PASSWORD || 'Passw0rd!',
    // timezone: 'jst',
});

module.exports = connection;