module.exports = {
    server:{
      port: 8002,
      host: '127.0.0.1'
    },
    database: {
      mongodb : {
        name : "rest",
        host : "docker-server.cloudapp.net",
        port : 27017,
        user : "root",
        password : "admin",
        path : "mongodb://docker-server.cloudapp.net:27017/"
      },
      mysql : {
        name : "rest",
        host : "docker-server.cloudapp.net",
        port : "3306",
        user : "root",
        password : "admin", 
        path : "mysql://docker-server.cloudapp.net:3306/"
      },
      redis : {
        name : "rest",
        host : "docker-server.cloudapp.net",
        port : 6379,
        user : "root",
        password : "admin", 
        path : "redis://docker-server.cloudapp.net:6379"
      },
      rabbitmq : {
        name : "rest",
        host : "docker-server.cloudapp.net",
        port : 5672,
        user : "root",
        password : "admin", 
        channel : "wabbit",
        path: "amqp://docker-server.cloudapp.net:5672"
      }

    },
    projectName : 'node-data-server'
  };