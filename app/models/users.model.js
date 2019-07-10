'use strict';

const _         = require('lodash');
const collection = 'users';
const config    = require(__dirname + '/../../config');
const appDir    = config.appDir;
const error     = require(appDir+ '/app/utils/errors');
const utils     = require(appDir + '/app/utils/utils.service');

/*
Structure to Insert
{
    'uuid': 'asds-asdasdasd-sdasd-dasdsa',
    'fname': 'Deb',
    'lname': 'Das',
    'age': 12,
    'timestamp' : "datetime object"
}
*/



module.exports.insertOne = async (data, options)=> {

    let db = options.db;
    let logger = options.logger;
    let messageObj = {};

    if(_.isNull(data)) {
        logger.error("No Data");
        throw new Error(error.invalidData);

    }
    if(_.isNull(data.uuid)) {
        logger.error("UUID cannot be NULL");
        throw new Error(error.invalidData);
    }
    
    try {
        let result = await db.collection(collection).insertOne(data);
        logger.info(result);
        return True;

    }
    catch(err) {
        if(err) {
            logger.error(err);
            logger.error(err.stack);
            throw new Error(error.invalidNoSQL);
        }
    }
}





module.exports.getAll = async (queryOpts, options)=> {
    let db = options.db;
    let logger = options.logger;
    let result = await db.collection(collection).find(queryOpts).toArray();
    logger.info("Records fetched from Table");
    console.log(result);
    let result_list = [];
    for (let i=0; i< result.length; i++) {
        result_list.push(result[i]);
    }

    return result_list;
}