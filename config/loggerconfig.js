'use strict'

const logger = require('node-db-file-logger');
const config = require(__dirname);
const appDir = config.appDir;

module.exports.init = () => {
  const loggerOptions = {
    transports:{
      file:{
        filename: appDir +'/log/dev.log'
      }
    }
  }

  module.exports.loggerObj = logger.getLogger(loggerOptions)
}