'use strict'

const os      = require('os');
const amqp    = require('amqplib');
const events  = require('events');
const config  = require('./index');
const amqpurl = config.rabbitmq.amqpurl;
const connect = await amqp.connect(amqpurl);
const channel = await connect.createChannel();


const consume = (isNoAck=false, durable=false, prefetch=null)=> {
    let exchange = await channel.assertExchange(config.rabbitmq.mqExchange, 'direct', {durable: true});
    let queue_name = process.pid + '@' + os.hostname();
    
    await exchange.assertQueue(queue_name, { durable: true, exclusive: true });

    const consumeEmitter = new events();
    try {
        channel.consume(queue, message => {
            if (message !== null) {
                consumeEmitter.emit('data', message.content.toString(), () => {
                    channel.ack(message);
                });
            } 
            else {
              let error = new Error('NullMessageException');
              consumeEmitter.emit('error', error);
            }
          }, {noAck: isNoAck});
        }
        catch (error) {
          consumeEmitter.emit('error', error);
      }

      return consumeEmitter;
}

module.exports = {
  consume : consume
};
