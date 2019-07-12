'use strict'

const isThere = require('is-there')
    , currentEnv = process.env.NODE_ENV || 'development'
    , envFilePath = __dirname + "/env/" + currentEnv + ".js";

let environmentOptions, projectName;

if(!isThere(envFilePath))
  console.log("Environment File is Missing");
else
  environmentOptions = require(envFilePath);


projectName = environmentOptions.projectName || "node-data-server";

module.exports = {
  port: environmentOptions.server.port,
  serverHost: environmentOptions.server.host + ':' +environmentOptions.server.port,
  mongodb : {
    databaseUrl: environmentOptions.database.mongodb.path + environmentOptions.database.mongodb.name,
    databaseHost: environmentOptions.database.mongodb.host,
    databasePort: environmentOptions.database.mongodb.port,
    databaseName: environmentOptions.database.mongodb.name,
    databaseUser: environmentOptions.database.mongodb.user,
    databasePwd: environmentOptions.database.mongodb.password
  },
  mysql : {
    databaseUrl: environmentOptions.database.mysql.path + environmentOptions.database.mysql.name,
    databaseHost: environmentOptions.database.mysql.host,
    databasePort: environmentOptions.database.mysql.port,
    databaseName: environmentOptions.database.mysql.name,
    databaseUser: environmentOptions.database.mysql.user,
    databasePwd: environmentOptions.database.mysql.password

  },
  redis : {
    databaseUrl: environmentOptions.database.redis.path + environmentOptions.database.redis.name,
    databaseHost: environmentOptions.database.mysql.host,
    databasePort: environmentOptions.database.redis.port,
    databaseName: environmentOptions.database.redis.name,
    databaseUser: environmentOptions.database.redis.user,
    databasePwd: environmentOptions.database.redis.password

  },
  mq : {},
  appDir: require('app-root-path')
};