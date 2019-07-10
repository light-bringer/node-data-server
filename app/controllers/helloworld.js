'use strict';

const config           = require(__dirname + '/../../config');
const appDir           = config.appDir;
const { to, ReE, ReS } = require(appDir + '/app/utils/utils.service');


const helloworld = async (req, res)=> {
    const options = req.app.get('options');
    const db = options.db;
    
    let databases = [];
    let time1 = Date.now();
    let result = await db.stats();
    options.logger.info(result);
    
    let time2 = Date.now();
    let time_taken = (time2-time1);
    let message = {
        message : "Hello World!",
        process : "I am listing all databases for testing..",
        stats :result,
        statistics : {
            time_taken: String(time_taken) + " ms",
        }
    };
    return ReS(res, message, 200);
}

module.exports.helloworld = helloworld;