'use strict'

var redis_client;

module.exports {
    setClient : (inClient)=> {
        redis_client = inClient;
    }
}