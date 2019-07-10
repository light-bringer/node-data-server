'use strict'

const mysql  = require('mysql');
const config = require('./index');
const util =   require('util');


let connection = mysql.createPool({
    // connectTimeout  : 60 * 60 * 1000,
    // aquireTimeout   : 60 * 60 * 1000,
    // timeout         : 60 * 60 * 1000,
    connectionLimit    : 10000,
    host               : config.mysql.databaseHost,
    port               : config.mysql.databasePort,
    user               : config.mysql.databaseUser,
    password           : config.mysql.databasePwd,
    database           : config.mysql.databaseName,
    multipleStatements : true
});

connection.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
        }
    }
    if (connection) {
        connection.release();
    }
    return;
});

// Promisify for Node.js async/await.
connection.query = util.promisify(connection.query);

module.exports = connection;