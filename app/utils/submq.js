var amqp = require('amqplib');
var os = require('os');
var queue_name = process.pid + '@' + os.hostname();
var exchange_name = 'rabbit-bunny';
console.log(queue_name, exchange_name)

amqp.connect().then(function(conn) {

  process.once('SIGINT', function() { conn.close(); });

  return conn.createChannel().then(function(ch) {
    var ok = ch.assertExchange(exchange_name, 'direct', {
      durable: true
    });

    ok = ok.then(function() {
      return ch.assertQueue(queue_name, {
        exclusive: true
      });
    });

    ok = ok.then(function(qok) {
      return ch.bindQueue(qok.queue, exchange_name, '').then(function() {
        return qok.queue;
      });
    });

    ok = ok.then(function(queue) {
      return ch.consume(queue, logMessage, {
        noAck: false
      });
    });

    return ok.then(function() {
      console.log('Waiting for messages delivered to queue: ' + queue_name);
    });

    function logMessage(msg) {
      console.log(msg)
      console.log(msg.content.toString());
      ch.ack(msg);
    }
  });

}).then(null, console.warn);