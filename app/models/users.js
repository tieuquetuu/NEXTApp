/**
 *  Model for Users
 *
 */


// Dependencies\
var db = require('./../db');


// Container for module (to be exported)
var users = {};


// Table name
const tableName = "users";


users.where = function(columns, condition, data, callback) {
    columns = typeof(columns) == "string" && columns.trim().length > 0 ? columns.trim() : false;
    condition = typeof(condition) == "string" && ['=','>','<','<>','>=','<=','BETWEEN','LIKE','IN'].indexOf(condition.toUpperCase()) > -1 ? condition.toUpperCase() : false;
    data = typeof(data) == "string" && data.trim().length > 0 ? data.trim() : false ;

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

users.findById = function(unique_id, callback) {
    let sql = 'SELECT * FROM '+ tableName +' WHERE unique_id = ? LIMIT 1';
    db.query(sql, unique_id, (err, response) => {
        if (!err && response.length > 0) {
            var jsonData = JSON.parse( JSON.stringify(response[0]) );
            callback(false, jsonData);
        } else if(err) {
            callback("Cannot do this query  : " , err) ;
        } else {
            callback("Cannot find this user");
        }
    });
};


// Read the user by condition
users.read = function(conditionStr = null, _id, callback) {

    let sql = 'SELECT * FROM '+ tableName +' WHERE '+condition[conditionStr]+' = ?';

    db.query(sql, condition[conditionStr], (err, response) => {
        if (!err && response.length > 0) {
            callback(false, response);
        } else if(err) {
            callback("Cannot do this query  : " , err) ;
        } else {
            callback("Cannot find this user");
        }
    });
};


// Create a user
users.create = function(data, callback) {
    let sql = 'INSERT INTO '+tableName+' SET ?'
    db.query(sql, [data], (err, response) => {
        if  (!err) {

            // Find this new user
            let findThisUserSql = "SELECT * FROM "+tableName+" WHERE unique_id = ?";
            db.query(findThisUserSql, [data.unique_id], (err, response) => {
                if (!err && response.length > 0) {
                    callback(false, response);
                } else if(err) {
                    callback("Cannot do this query  : " , err) ;
                } else {
                    callback("Cannot find this user");
                }
            });

        } else {
            callback("Cannot do this query  : " , err) ;
        }
    });
};


// Update a user
users.update = function(_id, data, callback) {
    let sql = "UPDATE "+ tableName +" SET ? WHERE unique_id = ?";
    db.query(sql, [data, _id], (err, response) => {
        if (!err) {
            callback(false,response);
        } else {
            callback("User Model \"update\" Error : ", err);
        }
    })
};


// Delete a user
users.delete = function(_id, callback) {
    let sql = "DELETE FROM "+tableName+" WHERE unique_id = ?";

    db.query(sql, [_id], function (err, response) {
        if  (!err) {
            callback(false, response);
        } else {
            callback("Cannot do this query  : " , sql) ;
        }
    });
}

module.exports = users;