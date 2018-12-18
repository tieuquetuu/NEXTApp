/**
 *  users
 *
 */

// Dependencies
var userModel = require('./../models/users');
var tokensModel = require('./../models/tokens');
var helpers = require('./../../lib/helpers');

// Users
var users = function (data,callback) {
    var acceptableMethods = ['post','get','put','delete'];
    if(acceptableMethods.indexOf(data.method) > -1){
        _users[data.method](data,callback);
    } else {
        callback(405);
    }
};


// Container for all the users methods
var _users = {};


// Users - post
// Required data: email, username, phone, password
// Optional data: none
_users.post = function(data,callback) {
    // Check that all required fields are filled out
    var email = typeof(data.payload.email) == 'string' && data.payload.email.trim().length > 0 ? data.payload.email.trim() : false;
    var username = typeof(data.payload.username) == 'string' && data.payload.username.length > 0 ? data.payload.username.trim() : false;
    var phone = typeof(data.payload.phone) == "string" && 10 <= data.payload.phone.length <= 15 ? data.payload.phone.trim() : false;
    var password = typeof(data.payload.password) == "string" && data.payload.password.length >= 6 ? data.payload.password.trim() : false;

    if(email && username && phone && password){
        // Make sure the user doesnt already exist
        userModel.where('username', '=', username, function (err, data) {
            if (err) {
                // Hash the password
                var hashedPassword = helpers.hash(password);
                var uniqueId = helpers.createRandomString(10);

                // Create the user object
                if(hashedPassword){
                    var userObject = {
                        'unique_id': uniqueId,
                        'email' : email,
                        'username' : username,
                        'phone' : phone,
                        'password' : password,
                        'hashed_password' : hashedPassword,
                        'created_at' : new Date().toISOString()
                    };

                    // Store the user
                    userModel.create(userObject,function(err, response){
                        if(!err){
                            // Response to unique_id
                            var uniqueId = response[0].unique_id;

                            callback(200, {_id : uniqueId});
                        } else {
                            callback(500,{'Error' : 'Could not create the new user'});
                        }
                    });
                } else {
                    callback(500,{'Error' : 'Could not hash the user\'s password.'});
                }

            } else {
                // User alread exists
                callback(400,{'Error' : 'A user with that username already exists'});
            }
        });
    } else {
        callback(400,{'Error' : 'Missing required fields'});
    }
};

// user - get
// Required data: _id
// Optional data: none
_users.get = function(data,callback) {
    // Check that Id is valid
    var _id = typeof(data.queryStringObject._id) == 'string' && data.queryStringObject._id.trim().length == 10 ? data.queryStringObject._id.trim() : false;
    if (_id) {
        // Get token from headers
        var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
        if (token) {
            // Verify that the given token is valid for the phone number
            tokensModel.verifyToken(token,_id,function(tokenIsValid){
                if (tokenIsValid) {
                    // Lookup the user
                    userModel.findById(_id,function(err,response){
                        if(!err && response){
                            // Remove the hashed password from the user user object before returning it to the requester
                            delete response.hashed_password;
                            delete response.password;
                            callback(200,response);
                        } else {
                            callback(404);
                        }
                    });
                }  else {
                    callback(403,{"Error" : "Missing required token in header, or token is invalid."})
                }
            });
        } else {
            callback(400,{'Error' : 'Missing required field'});
        }
    } else {
        callback(400,{'Error' : 'Missing required field'});
    }
};

// Required data: _id
// Optional data: email, password (at least one must be specified)
_users.put = function(data,callback) {
    // Check that required Id is valid
    var _id = typeof(data.payload._id) == 'string' && data.payload._id.trim().length == 10 ? data.payload._id.trim() : false;

    // Check for optional fields
    var email = typeof(data.payload.email) == 'string' && data.payload.email.trim().length > 0 ? data.payload.email.trim() : false;
    var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length > 0 ? data.payload.phone.trim() : false;
    var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;

    if (_id) {
        // Get token from headers
        var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
        if (token) {
            // Verify that the given token is valid for the phone number
            tokensModel.verifyToken(token,_id,function(tokenIsValid){
                if (tokenIsValid) {
                    // Error if nothing is sent to update
                    if(email || phone || password){
                        // Lookup the user
                        userModel.findById(_id, function (err, userData) {
                            if(!err && userData){
                                // Update the fields if necessary
                                if(email){
                                    userData.email = email;
                                }
                                if(phone){
                                    userData.phone = phone;
                                }
                                if(password){
                                    userData.password = password;
                                    userData.hashed_password = helpers.hash(password);
                                }
                                userData.updated_at = new Date(Date.now());

                                // Store the new updates
                                userModel.update(_id,userData,function(err){
                                    if(!err){
                                        callback(200);
                                    } else {
                                        callback(500,{'Error' : 'Could not update the user.'});
                                    }
                                });
                            } else {
                                callback(400,{'Error' : 'Specified user does not exist.'});
                            }
                        });
                    } else {
                        callback(400,{'Error' : 'Missing fields to update.'});
                    }
                }  else {
                    callback(403,{"Error" : "Missing required token in header, or token is invalid."})
                }
            });
        } else {
            callback(400,{'Error' : 'Missing required field'});
        }
    } else {
        callback(400,{'Error' : 'Missing required field.'});
    }
};

// Require data: _id
// Cleanup the user
_users.delete = function(data,callback) {
    // Check that user id is valid
    var _id = typeof(data.queryStringObject._id) == 'string' && data.queryStringObject._id.trim().length == 10 ? data.queryStringObject._id.trim() : false;

    if  (_id) {

        var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
        if (token) {
            // Verify that the given token is valid for the phone number
            tokensModel.verifyToken(token,_id,function(tokenIsValid){
                if (tokenIsValid) {
                    userModel.findById(_id, function (err, response) {
                        if (!err && response) {
                            // Delete the token
                            userModel.delete(_id, function (err) {
                                if(!err){
                                    callback(200);
                                } else {
                                    callback(500,{'Error' : 'Could not delete the specified user'});
                                }
                            });
                        } else {
                            callback(400,{'Error' : 'Specified user does not exist.'});
                        }
                    });
                }  else {
                    callback(403,{"Error" : "Missing required token in header, or token is invalid."})
                }
            });
        } else {
            callback(400,{'Error' : 'Missing required field'});
        }

    }else {
        callback(400,{'Error' : 'Missing required field'})
    }
};



// Export the module
module.exports = users;