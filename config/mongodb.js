'use strict'


const mongodb = require('mongodb')
, config = require('./index');

var Server = mongodb.Server
, MongoClient = mongodb.MongoClient;

console.log(config.mongodb)

module.exports.init = function (callback) {
  let mongoClient = new MongoClient(new Server(config.mongodb.databaseHost, config.mongodb.databasePort, {w:1}));
  mongoClient.connect( (err, mongoClient)=> {
    let mongoC = mongoClient.db(config.mongodb.databaseName);
    module.exports.client = mongoC;
    callback(err);
  });
}
