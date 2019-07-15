'use strict';
const validator        = require('validator');
const UUID             = require('uuid');
const _                = require('lodash');
const config           = require(__dirname + '/../../config');
const appDir           = config.appDir;
const { to, ReE, ReS } = require(appDir + '/app/utils/utils.service');
const userModel        = require(appDir + '/app/models/users.nosql.model');
const redisUserModel   = require(appDir + '/app/models/users.redis.model');
   

module.exports.getAll = async (req, res)=> {
    const options = req.app.get('options');
    let logger = options.logger;
    logger.info("inside messages controller");
    let time1 = Date.now();
    let result = await userModel.getAll({}, options);
    let time2 = Date.now();
    let timetaken = time2 - time1;
    logger.info("Time difference : %s ms", String(timetaken)); 
    let message = {
        data : result,
        time_taken : String(timetaken) + " ms"
    };
    logger.info(JSON.stringify(message));
    return ReS(res, message, 200);

};




module.exports.insert = async (uuid)=> {
    const options = req.app.get('options');
    let logger = options.logger;
    let data = await redisUserModel.get(uuid);
    let newObj =  {
        'uuid': data['uuid'],
        'fname': String(data['fname']),
        'lname': String(data['lname']),
        'age': Number(data['age']),
        'timestamp' : new Date(data['timestamp'])
    };

    try {
        let result = await userModel.insertOne(newObj);
        logger.info(result);
        if (result) {
            return true;
        }
        else {
            logger.error("No record inserted!");
            return false;
        }

    }
    catch(err) {
        logger.error(err);
        return false;
    }

}
