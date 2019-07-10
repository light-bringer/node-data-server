'use strict';

const _         = require('lodash');
const tablename = 'messages';
const config    = require(__dirname + '/../../config');
const appDir    = config.appDir;
const error     = require(appDir + '/app/utils/errors');
const utils     = require(appDir + '/app/utils/utils.service');
const tableKeys = ['mid', 'message', 'uid_fk'];


/*
TABLE STRUCTURE

mysql> desc messages;
+---------+---------+------+-----+---------+----------------+
| Field   | Type    | Null | Key | Default | Extra          |
+---------+---------+------+-----+---------+----------------+
| mid     | int(11) | NO   | PRI | NULL    | auto_increment |
| message | text    | YES  | MUL | NULL    |                |
| uid_fk  | int(11) | YES  |     | NULL    |                |
+---------+---------+------+-----+---------+----------------+
3 rows in set (0.00 sec)
*/

/*
**** BOOT STRAPPING THE TABLE STRUCTURE *****

mysql> use rest;
Database changed
mysql> CREATE TABLE `messages` (
    -> `mid` int(11) AUTO_INCREMENT,
    -> `message` text,
    -> `uid_fk` int(11),
    -> PRIMARY KEY (`mid`)
    -> );
Query OK, 0 rows affected (0.60 sec)

mysql> show tables;
+----------------+
| Tables_in_rest |
+----------------+
| messages       |
+----------------+
1 row in set (0.01 sec)

mysql> desc messages;
+---------+---------+------+-----+---------+----------------+
| Field   | Type    | Null | Key | Default | Extra          |
+---------+---------+------+-----+---------+----------------+
| mid     | int(11) | NO   | PRI | NULL    | auto_increment |
| message | text    | YES  |     | NULL    |                |
| uid_fk  | int(11) | YES  |     | NULL    |                |
+---------+---------+------+-----+---------+----------------+
3 rows in set (0.03 sec)

mysql> CREATE INDEX message_index ON messages(message, uid_fk);
ERROR 2006 (HY000): MySQL server has gone away
No connection. Trying to reconnect...
Connection id:    15
Current database: rest

ERROR 1170 (42000): BLOB/TEXT column 'message' used in key specification without a key length
mysql> mysql> CREATE INDEX message_index ON messages(message(200), uid_fk);
Query OK, 0 rows affected (0.36 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> desc messages;
+---------+---------+------+-----+---------+----------------+
| Field   | Type    | Null | Key | Default | Extra          |
+---------+---------+------+-----+---------+----------------+
| mid     | int(11) | NO   | PRI | NULL    | auto_increment |
| message | text    | YES  | MUL | NULL    |                |
| uid_fk  | int(11) | YES  |     | NULL    |                |
+---------+---------+------+-----+---------+----------------+
3 rows in set (0.00 sec)

*/


module.exports.insertOne = async (data, options)=> {

    let db = options.db;
    let logger = options.logger;
    let messageObj = {};

    if(_.isNull(data)) {
        logger.error("No Data");
        throw new Error(error.invalidData);

    }
    if(_.isNull(data.phone)) {
        logger.error("phone number cannot be NULL");
        throw new Error(invalidData);
    }
    messageObj['uid_fk'] = data.phone;

    if(_.isNull(data.message)) {
        messageObj['message'] = "";
    }
    else {
        messageObj['message'] = data.message;
    }
    let SQLQuery = 'INSERT INTO messages SET ?';
    console.log(SQLQuery)
    console.log(data)
    console.log(messageObj)

    try {
        let result = await db.query(SQLQuery, messageObj);
        logger.info("DB Queries inserted");
        logger.info(result);
        return result;

    }
    catch(err) {
        if(err) {
            logger.error(err);
            throw new Error(error.invalidSQL);
        }
    }
}





module.exports.getAll = async (options)=> {
    let db = options.db;
    let logger = options.logger;

    const SQLQuery = "SELECT * FROM " + tablename;
    let result = await db.query(SQLQuery);
    logger.info("Records fetched from Table");
    console.log(result);
    let result_list = [];
    for (let i=0; i< result.length; i++) {
        result_list.push(result[i]);
    }

    return result_list;
}


module.exports.getOne = async (options, searchOptions)=> {
    let db = options.db;
    let logger = options.logger;
    let searchClauseArray = [];
    let queryParams = [];

    let keys = Object.keys(searchOptions);

    // Query Building

    console.log(searchOptions);

    if(utils.arrayContainsArray(tableKeys, keys)) {
        if(!_.isUndefined(searchOptions.mid)) {
            searchClauseArray.push( 'mid = ?');
            queryParams.push(searchOptions.mid);
        }

        if(!_.isUndefined(searchOptions.uid_fk)) {
            searchClauseArray.push( 'uid_fk = ?');
            queryParams.push(searchOptions.uid_fk);
        }

        if(!_.isUndefined(searchOptions.message)) {
            searchClauseArray.push('message = ?');
            queryParams.push(searchOptions.message);
        }

    }
    else {
        return Promise(reject(Error("Incorrect Keys")));
    
    }

    let searchClause = searchClauseArray.join(' AND ');

    console.log("SQL Query built : " + searchClause);

    const SQLQuery = "SELECT * FROM " + tablename + ' WHERE ' + searchClause;
    
    console.log("fINAL Query built : " + SQLQuery);
    
    let result = await db.query(SQLQuery, queryParams);
    logger.info("Records fetched from Table");
    console.log(result);
    let result_list = [];
    for (let i=0; i< result.length; i++) {
        result_list.push(result[i]);
    }

    return result_list;
}





module.exports.update = async (options, searchOptions, updateOptions)=> {
    let db = options.db;
    let logger = options.logger;
    let searchClauseArray = [];
    let queryParams = [];

    let keys = Object.keys(searchOptions);

    // Query Building

    console.log(searchOptions);

    if(utils.arrayContainsArray(tableKeys, keys)) {
        if(!_.isUndefined(searchOptions.mid)) {
            searchClauseArray.push( 'mid = ?');
            queryParams.push(searchOptions.mid);
        }

        if(!_.isUndefined(searchOptions.uid_fk)) {
            searchClauseArray.push( 'uid_fk = ?');
            queryParams.push(searchOptions.uid_fk);
        }

        if(!_.isUndefined(searchOptions.message)) {
            searchClauseArray.push('message = ?');
            queryParams.push(searchOptions.message);
        }

    }
    else {
        return Promise(reject(Error("Incorrect Keys")));
    
    }

    let searchClause = searchClauseArray.join(' AND ');

    console.log("SQL Query built : " + searchClause);

    const SQLQuery = "SELECT * FROM " + tablename + ' WHERE ' + searchClause;
    
    console.log("fINAL Query built : " + SQLQuery);
    
    let result = await db.query(SQLQuery, queryParams);
    logger.info("Records fetched from Table");
    console.log(result);
    let result_list = [];
    for (let i=0; i< result.length; i++) {
        result_list.push(result[i]);
    }

    return result_list;
}