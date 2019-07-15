'use strict'

const _      = require('lodash');
const config = require(__dirname + '/../../config');
const appDir = config.appDir;
const error  = require(appDir+ '/app/utils/errors');
const utils  = require(appDir + '/app/utils/utils.service');

let getData_redis = async (uuid_key, options)=> {
    
    if(_.isNull(options.redis)) {
        throw new Error(error.invalidRedis);
    }

    if(_.isNull(uuid_key)) {
        throw new Error(error.invalidData);
    }

    let redisconn = options.redis;
    let data = await redisconn.getObject(uuid_key);
    if (data) {
        return data;
    }
    else {
        throw new Error(error.invalidData);
    }
}

module.exports = {
    get : getData_redis
}