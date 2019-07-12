'use srict'

const redis  = require('redis');
const config = require('./index');
const util   = require('util');

let client = redis.createClient(config.redis.databasePort, config.redis.databaseHost);
//client = util.promisify(client);

let getHash = (uuid)=> {
    return new Promise((resolve, reject)=> {
        client.hgetall(uuid, (err, replyobject)=> {
            if(err) {
                console.error(err);
                reject(err);
            }
            resolve(replyobject);
        });

    });    
}

let getStr = (uuid)=> {
    return new Promise((resolve, reject)=> {
        client.get(uuid, (err, replyobject)=> {
            if(err) {
                console.error(err);
                reject(err);
            }
            resolve(replyobject);
        });

    });    
}



module.exports = {
    client : client,
    getObject : getData,
    getString : getStr
}


