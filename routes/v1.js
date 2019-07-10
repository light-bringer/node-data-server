'use strict';


const express              = require('express');
const config               = require( '../config');
const appDir               = config.appDir;
const router               = express.Router();
const HelloWorldController = require(appDir + '/app/controllers/helloworld');
const MessagesController = require(appDir + '/app/controllers/messages.controller');


// GET : HomePage
router.get('/',  HelloWorldController.helloworld);

// Messages CRUD
router.get('/messages/', MessagesController.getAll);
router.get('/messages/:mid', MessagesController.getOne);
router.post('/messages/', MessagesController.insertOne);
router.post('/messages/search', MessagesController.search)

module.exports = router;