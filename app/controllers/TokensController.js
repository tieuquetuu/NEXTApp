/**
 *  TokensController
 *
 */


// Dependencies
var helpers = require('../../lib/helpers');
var _model = require('../models/model');
var _tokensModel = require('../models/tokens');


// Container all the tokens
var tokens = function (data, callback) {
    var acceptableMethods = ['post','get','put','delete'];
    if(acceptableMethods.indexOf(data.method) > -1){
        handlers[data.method](data,callback);
    } else {
        callback(405);
    }
};


var handlers = {};


// Tokens - post
// Required data: username, password
// Optional data: none
handlers.post = function(data, callback) {
    var username = typeof(data.payload.username) == 'string' && data.payload.username.length > 0 ? data.payload.username.trim() : false;
    var password = typeof(data.payload.password) == "string" && data.payload.password.length >= 6 ? data.payload.password.trim() : false;

    if (username && password) {
        // Make sure the user already exist
        _model.where('users', 'username', '=', username,function (err, userData) {
            if (!err && userData) {
                // Parse data to json
                var userData = JSON.parse( JSON.stringify(userData[0]) );
                var hashedPassword = helpers.hash(password);

                if(hashedPassword == userData.hashed_password){
                    var tokenId = helpers.createRandomString(20);
                    var expires = new Date(Date.now() + 1000 * 60 * 60);
                    var tokenObject = {
                        'user_id' : userData.unique_id,
                        'token_id' : tokenId,
                        'expires' : expires
                    };

                    _tokensModel.create(tokenObject, function (err, response) {
                        if (!err && response) {
                            var tokenData = JSON.parse( JSON.stringify(response[0]) );
                            callback(200,tokenData);
                        }  else {
                            callback(500,{'Error' : 'Could not create the new token'});
                        }
                    });

                } else {
                    callback(400,{'Error' : 'Password is not true.'});
                }
            } else {
                callback(400,{'Error' : 'Could not find the specified user.'});
            }
        });

    } else {
        callback(400,{'Error' : 'Missing required fields'});
    }
};


// Tokens - get
// Required data: id
// Optional data: none
handlers.get = function(data, callback) {
    var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;

    if(id){
        // Lookup the token
        _tokensModel.findById(id,function(err,response){
            if(!err && response){
                var tokenData = JSON.parse( JSON.stringify(response[0]) );
                callback(200,tokenData);
            } else {
                callback(404);
            }
        });
    } else {
        callback(400,{'Error' : 'Missing required field, or field invalid'})
    }
};


// Tokens - put
// Required data: id, extend
// Optional data: none
handlers.put = function(data, callback) {
    var id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;
    var extend = typeof(data.payload.extend) == 'boolean' && data.payload.extend == true ? true : false;

    if (id && extend) {
        // Lookup the existing token
        _tokensModel.findById(id,function(err,response){
            if(!err && response){
                var tokenData = JSON.parse( JSON.stringify(response[0]) );

                // Set the expiration an hour from now
                tokenData.expires = new Date(Date.now() + 1000 * 60 * 60);

                _tokensModel.update(id, tokenData, function (err, response) {
                    var tokenData = JSON.parse( JSON.stringify(response[0]) );
                    callback(200,tokenData);
                });
            } else {
                callback(400,{'Error' : 'Specified tokens does not exist.'});
            }
        });
    } else {
        callback(400,{"Error": "Missing required field(s) or field(s) are invalid."});
    }
};


// Tokens - delete
// Required data: id
// Optional data: none
handlers.delete = function(data, callback) {
    // Check that phone id is valid
    var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;

    if  (id) {
        _tokensModel.findById(id, function (err, response) {
            if (!err && response) {
                // Delete the token
                _tokensModel.delete(id, function (err) {
                    if(!err){
                        callback(200);
                    } else {
                        callback(500,{'Error' : 'Could not delete the specified token'});
                    }
                });
            } else {
                callback(400,{'Error' : 'Specified tokens does not exist.'});
            }
        });
    }else {
        callback(400,{'Error' : 'Missing required field'})
    }
};



// export the module
module.exports = tokens;