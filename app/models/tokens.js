/**
 *  Model for Tokens
 *
 */


// Dependencies\
var db = require('./../db');


// Container for module (to be exported)
var tokens = {};


// Table name
const tableName = "tokens";

tokens.findById = function(tokenId, callback) {
    let sql = 'SELECT * FROM '+ tableName +' WHERE token_id = ? LIMIT 1';
    db.query(sql, tokenId, (err, response) => {
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
tokens.create = function(data, callback) {
    let sql = 'INSERT INTO '+tableName+' SET ?'
    db.query(sql, [data], (err, response) => {
        if (!err) {
            // Find this new tokens
            let findThisTokenSql = "SELECT * FROM "+tableName+" WHERE token_id = ?";
            db.query(findThisTokenSql, [data.token_id], (err, response) => {
                if (!err && response.length > 0) {
                    callback(false, response);
                } else if(err) {
                    callback("Cannot do this query  : " , err) ;
                } else {
                    callback("Cannot find this tokens");
                }
            });

        } else {
            callback("Cannot do this query  : " , err) ;
        }
    });
};


// Update a token
tokens.update = function(tokenId, data, callback) {
    let sql = "UPDATE "+ tableName +" SET ? WHERE token_id = ?";
    db.query(sql, [data, tokenId], (err, response) => {
        if (!err) {
            tokens.findById(tokenId,function (err, response) {
                if (!err && response.length > 0) {
                    callback(false, response);
                } else if(err) {
                    callback("Cannot do this query  : " , err) ;
                } else {
                    callback("Cannot find this tokens");
                }
            });
        } else {
            callback("Cannot do this query  : " , err);
        }
    })
};


// Delete a tokens
tokens.delete = function(tokenId, callback) {
    let sql = "DELETE FROM "+tableName+" WHERE token_id = ?";

    db.query(sql, [tokenId], function (err, response) {
        if (!err) {
            callback(false, response);
        } else {
            callback("Cannot do this query  : " , err);
        }
    });
};


// Verify if a given token id is currently valid for a given user
tokens.verifyToken = function(id,userId,callback){
    // Lookup the token
    tokens.findById(id, function (err, response) {
        if (!err && response) {
            var tokenData = JSON.parse( JSON.stringify(response[0]) );
            var expires = (new Date(tokenData.expires)).getTime();
            var now = (new Date(Date.now())).getTime();

            // Check that the token is for the given user and has not expired
            if(tokenData.user_id == userId && expires > now){
                callback(true);
            } else {
                callback(false);
            }
        }  else {
            callback(false);
        }
    });
};

module.exports = tokens;