#!/usr/bin/env node

var amqp = require('amqplib');
var exchange_name = 'pubsub';
const CONN_URL = 'amqp://bssesmbt:7cI12dwUfUHyfXWct_EiEkcJyiORTR_G@mustang.rmq.cloudamqp.com/bssesmbt';

amqp.connect(CONN_URL).then(function(conn) {

  process.once('SIGINT', function() { conn.close(); });

  return conn.createChannel().then(function(channel) {
    var chok = channel.assertExchange(exchange_name, 'direct', {
      durable: true
    });
    
    chok.then(function() {
      for (var i = 1; i < 100000; i++) {
        sender(i);
      }

      return sender('FIN');
    });

    return chok;

    function sender(i) {
      channel.publish(exchange_name, '', new Buffer(JSON.stringify({
        message: i
      })));
    }

  });

}).then(null, console.warn);