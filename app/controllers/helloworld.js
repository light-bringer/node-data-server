'use strict';

const config           = require(__dirname + '/../../config');
const appDir           = config.appDir;
const { to, ReE, ReS } = require(appDir + '/app/utils/utils.service');


const helloworld = async (req, res)=> {
    const options = req.app.get('options');
    const db = options.db;
    let databases = [];
    let time1 = Date.now();
    let result = await db.query('show databases;');
    console.log(result);
    for (let i=0; i< result.length; i++) {
        console.log(result[i]['Database']);
        databases.push(result[i]);

    }
    let time2 = Date.now();
    let time_taken = (time2-time1);
    let message = {
        message : "Hello World!",
        process : "I am listing all databases for testing..",
        data : databases,
        statistics : {
            time_taken: time_taken,
        }
    };
    return ReS(res, message, 200);
}

module.exports.helloworld = helloworld;