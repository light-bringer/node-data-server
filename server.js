'use strict'

const cluster      = require('cluster');
const { cpus }     = require('os');
const express      = require('express');
const bodyParser   = require('body-parser');
const _            = require('lodash');
const responseTime = require('response-time');
const compression  = require('compression');

const config       = require(__dirname + '/config');
const appDir       = config.appDir;
const logger       = require(appDir + '/config' + '/loggerconfig');
const db           = require(appDir + '/config/mongodb.js');
const v1           = require(appDir + '/routes/v1');
const isMaster     = cluster.isMaster;
// const numWorkers   = cpus().length;
const numWorkers   = 1;

// init() logger
let loggerObj;
logger.init();
loggerObj = logger.loggerObj;

if (isMaster) {
  loggerObj.info(`Forking ${numWorkers} workers....`);
  const workers = [...Array(numWorkers)].map(_=> cluster.fork());

  cluster.on('online', (worker)=> {
    loggerObj.info(`Worker ${worker.process.pid} is online and ready to work!`);
  });
  cluster.on('exit', (worker, exitCode, strace)=> {
    loggerObj.error(`Worker ${worker.process.pid} is dead with exitcode ${exitCode}`);
    loggerObj.error(`The worker has spewed up this venomous error :\n  ${strace}`);
    loggerObj.info('Starting a new worker!');
    // cluster.fork();
    process.exit(-11);
  });

}
else {

  const app = express();
  
  app.use(compression());
  app.use(responseTime());
  app.use(express.static(__dirname + '/public'));
  app.use(bodyParser.json({limit: '50mb'}));
  
  app.use(bodyParser.urlencoded({ 
    extended: true
  }));

  app.set('port', process.env.PORT || config.port);

  app.use((req, res, next)=> {
    // allow CORS
    res.header('Access-Control-Allow-Origin', '*');
    res.header( "Access-Control-Allow-Methods" , "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", '*');
    res.header("Access-Control-Expose-Headers", "*");
    if (req.method === 'OPTIONS') {
      return res.send(200);
    }
    next();
  });


  // MongoDB server connection init()
  db.init(function(err) {
    let server =  app.listen(app.get('port'), ()=> {
      console.log('Express server listening on port : ' + server.address().port);
    
      var options = {
        db: db.client,
        logger : loggerObj
      };
      app.use('/v1', v1);
      app.set('options', options);
      app.use(express.static(__dirname + '/public'));

    });
  })

/*
  // MYSQL Server
  let options =  {
    db : db,
    logger : loggerObj
  };

  app.set('options', options);
  app.use('/v1', v1);
  app.use(express.static(__dirname + '/public'));



  let server = app.listen(app.get('port'), ()=> {
    loggerObj.info('Express server listening on port ' + server.address().port);
  });

*/

}
