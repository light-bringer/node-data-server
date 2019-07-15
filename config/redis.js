'use srict'

const redis  = require('redis');
const config = require('./index');
const util   = require('util');

console.log(config.redis)

let client = redis.createClient(config.redis.databasePort, config.redis.databaseHost);
//client = util.promisify(client);

let getHash = async (uuid)=> {
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

let getStr = async (uuid)=> {
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
    getObject : getHash,
    getString : getStr
}


