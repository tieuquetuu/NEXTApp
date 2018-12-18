/**
 *  Models
 *
 */

// Dependencies
var db = require('./../db');


// Container for all the Models methods
var model = {};


// Model where
model.where = function(tableName ,columns, condition, data, callback) {
    var columns = typeof(columns) == "string" && columns.trim().length > 0 ? columns.trim() : false;
    var condition = typeof(condition) == "string" && ['=','>','<','<>','>=','<=','BETWEEN','LIKE','IN'].indexOf(condition.toUpperCase()) > -1 ? condition.toUpperCase() : false;
    var data = typeof(data) == "string" && data.trim().length > 0 ? data.trim() : false ;

    let sql = 'SELECT * FROM '+ tableName +' WHERE ' + columns + condition + '?';
    db.query(sql, data, (err, response) => {
        if (!err && response.length > 0) {
            callback(false, response);
        } else if(err) {
            callback("Cannot do this query  : " , sql) ;
        } else {
            callback("Nothing to find!");
        }
    });
};


module.exports = model;