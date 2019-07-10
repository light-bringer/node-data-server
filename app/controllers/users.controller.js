'use strict';
const validator        = require('validator');
const _                = require('lodash');
const config           = require(__dirname + '/../../config');
const appDir           = config.appDir;
const { to, ReE, ReS } = require(appDir + '/app/utils/utils.service');
const userModel     = require(appDir + '/app/models/users.model');


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




module.exports.insertOne = async (req, res)=> {
    /// controller to insert one record
    const options = req.app.get('options');
    let logger = options.logger;
    logger.info("inside messages controller");
    
    let body = req.body;
    if(_.isEmpty(body)) {
        logger.error("Empty Body");
        return ReE(res, 'POST body empty' , 500);
    }
    console.log(body);

    if(_.isNull(body.phone)) {
        logger.error("Empty Phone Number");
        return ReE(res, 'Phone number empty' , 500);
    }
    
    if(!validator.isNumeric(body.phone)) {
        logger.error("Not a valid phone number");
        return ReE(res, 'Not a Phone number' , 500);
    }
    if(body.phone.length != 11) {
        logger.error("Not a valid phone number");
        return ReE(res, 'Not a Phone number' , 500);
    }
    let postObj = {
        phone : parseInt(req.body.phone),
        message : req.body.message
    }
    let time1 = Date.now();
    let result = {}
    let ress = await messageModel.insertOne( postObj, options);
    if (ress) {
        result = {
            insertID : ress.insertId,
            affectedRows: ress.affectedRows,
            status : "Inserted"
        };
    }
    let time2 = Date.now();
    let timetaken = time2 - time1;
    logger.info("Time difference : %s ms", String(timetaken)); 
    let message = {
        data : result,
        time_taken : String(timetaken) + " ms"
    };
    logger.info(JSON.stringify(message));
    return ReS(res, message, 200);

}


module.exports.getOne = async (req, res)=> {
    /// controller to insert one record
    const options = req.app.get('options');
    let logger = options.logger;
    logger.info("inside messages search controller");
    
    let mid = req.params.mid;
    
    let postObj = {
        uid_fk : null || req.body.phone,
        message : null || req.body.message,
        mid :  null || mid 

    }
    let time1 = Date.now();
    let result = {}
    let ress = await messageModel.getOne(options, postObj);
    if (ress) {
        result = {
            result : ress,
            status : "Searched"
        };
    }
    let time2 = Date.now();
    let timetaken = time2 - time1;
    logger.info("Time difference : %s ms", String(timetaken)); 
    let message = {
        data : result,
        time_taken : String(timetaken) + " ms"
    };
    logger.info(JSON.stringify(message));
    return ReS(res, message, 200);

}



module.exports.search = async (req, res)=> {
    /// controller to insert one record
    const options = req.app.get('options');
    let logger = options.logger;
    logger.info("inside messages search controller");
    
    let body = req.body;
    if(_.isEmpty(body)) {
        logger.error("Empty Body");
        return ReE(res, 'POST body empty' , 500);
    }
    console.log(body);
    
    let postObj = {
        uid_fk : null || req.body.phone,
        message : null || req.body.message,
        mid :  null || req.body.mid 

    }
    let time1 = Date.now();
    let result = {}
    let ress = await messageModel.getOne(options, postObj);
    if (ress) {
        result = {
            result : ress,
            status : "Searched"
        };
    }
    let time2 = Date.now();
    let timetaken = time2 - time1;
    logger.info("Time difference : %s ms", String(timetaken)); 
    let message = {
        data : result,
        time_taken : String(timetaken) + " ms"
    };
    logger.info(JSON.stringify(message));
    return ReS(res, message, 200);

}