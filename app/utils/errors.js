/*
MINIMAL ERROR THROW MODULE
*/

let errors = {
    invalidOperation : 'Invalid operation',
    unAuthorized : 'You are not authorized to use this function',
    invalidData : 'Data format invalid!',
    invalidSQL :  'some issue with the SQL?',
    invalidNoSQL :  'some issue with the NoSQL?',
    invalidRedis : "Something Wrong Redis Connwction",
    invalidAMQP : "Something wrong with AMQP connection"
}

module.exports = errors;