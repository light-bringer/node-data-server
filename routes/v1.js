'use strict';


const express              = require('express');
const config               = require( '../config');
const appDir               = config.appDir;
const router               = express.Router();
const HelloWorldController = require(appDir + '/app/controllers/helloworld');
const userC= require(appDir + '/app/controllers/users.controller');


// GET : HomePage
router.get('/',  HelloWorldController.helloworld);

// Messages CRUD
router.get('/users/', userC.getAll);
module.exports = router;