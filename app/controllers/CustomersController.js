/**
 *  CustomersController
 *
 */


// Dependencies
var helpers = require('../../lib/helpers');
var _model = require('../models/model');
var _tokensModel = require('../models/tokens');
var db = require('./../db');


// Customers
var customers = function (data,callback) {
    var acceptableMethods = ['post','get','put','delete'];
    if(acceptableMethods.indexOf(data.method) > -1){
        _customers[data.method](data,callback);
    } else {
        callback(405);
    }
};

// Table name
var tableName = "customers";


// Container for all the users methods
var _customers = {};


// post - Customers
// Required headers token
// Required payload: name , phone ,
// Options data : vv..
_customers.post = function(data, callback) {

    // Check that all required fields are filled out
    var email = typeof(data.payload.email) == 'string' && data.payload.email.trim().length > 0 ? data.payload.email.trim() : false;
    var name = typeof(data.payload.name) == 'string' && data.payload.name.trim().length > 0 ? data.payload.name.trim() : false;
    var phone = typeof(data.payload.phone) == "string" && 10 <= data.payload.phone.trim().length <= 15 ? data.payload.phone.trim() : false;
    var service = typeof(data.payload.service) == 'string' && data.payload.service.trim().length > 0 ? data.payload.service.trim() : false;
    var customerListId =  typeof(data.payload.customerListId) == 'string' && data.payload.customerListId.trim().length == 9 ? data.payload.customerListId.trim() : false;

    // Get token from headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
    if (token) {
        if(name && phone){
            // Make sure the user doesnt already exist
            var customersObj = {
                unique_id: helpers.createRandomString(10),
                name: name,
                phone: phone,
                created_at : new Date().toISOString(),
                updated_at : new Date().toISOString()
            };
            if (service) {
                customersObj.service = service;
            }
            if (email) {
                customersObj.email = email;
            }
            if (customerListId) {
                customersObj.customers_list_id = customerListId;
            }

            // checks customers exist
            let checksSql = 'SELECT * FROM '+ tableName +' WHERE phone = ?';
            db.query(checksSql, customersObj.phone, (err, response) => {
                if (!err) {
                    let createSql = 'INSERT INTO ' + tableName + ' SET ?';
                    db.query(createSql, [customersObj], (err, response) => {
                        if  (!err) {
                            callback(false, response);
                        } else {
                            callback("Cannot do this query  : " , err) ;
                        }
                    });
                } else {
                    // User alread exists
                    callback(400,{'Error' : "A customers has maybe exists"});
                }
            });
        } else {
            callback(400,{'Error' : 'Missing required fields'});
        }
    } else {
        callback(400,{'Error' : 'Missing required fields'});
    }

};


// get - customers
// Required customer unique_id params : _id={unique_id}
// Required headers token
_customers.get = function(data, callback) {
    // Check that Id is valid
    var _id = typeof(data.queryStringObject._id) == 'string' && data.queryStringObject._id.trim().length == 10 ? data.queryStringObject._id.trim() : false;
    if (_id) {
        // Get token from headers
        var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
        if (token) {
            _tokensModel.findById(token, function (err, response) {
                if (!err && response.length > 0) {
                    var tokenData = JSON.parse( JSON.stringify(response[0]) );
                    _tokensModel.verifyToken(tokenData.token_id, tokenData.user_id, function (tokenIsValid) {
                        if (tokenIsValid) {
                            // Lookup the user
                            let sql = 'SELECT * FROM '+ tableName +' WHERE unique_id = ? LIMIT 1';
                            db.query(sql, _id, (err, response) => {
                                if (!err && response.length > 0) {
                                    var customerData = JSON.parse( JSON.stringify(response[0]) );
                                    callback(false, customerData);
                                } else if(err) {
                                    callback("Cannot do this query  : " , err) ;
                                } else {
                                    callback("Cannot find this user");
                                }
                            });
                        } else {
                            callback(403,{"Error" : "Token is invalid."})
                        }
                    })
                } else {
                    callback(403,{"Error" : "Token is invalid."})
                }
            });
        } else {
            callback(400,{'Error' : 'Missing required field'});
        }
    } else {
        callback(400,{'Error' : 'Missing required field'});
    }
};


// put - customers
// Required customer unique_id params : _id={unique_id}
// Required headers token
_customers.put = function(data, callback) {
    // Check that Id is valid
    var _id = typeof(data.payload._id) == 'string' && data.payload._id.trim().length == 10 ? data.payload._id.trim() : false;

    // Check for optional fields
    var email = typeof(data.payload.email) == 'string' && data.payload.email.trim().length > 0 ? data.payload.email.trim() : false;
    var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length > 0 ? data.payload.phone.trim() : false;
    var name = typeof(data.payload.name) == 'string' && data.payload.name.trim().length > 0 ? data.payload.name.trim() : false;
    var service = typeof(data.payload.service) == 'string' && data.payload.service.trim().length > 0 ? data.payload.service.trim() : false;
    var customerListId =typeof(data.payload.customerListId) == 'string' && data.payload.customerListId.trim().length > 0 ? data.payload.customerListId.trim() : false;

    if (_id) {
        // Get token from headers
        var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
        if (token) {
            _tokensModel.findById(token, function (err, response) {
                if (!err && response.length > 0) {
                    var tokenData = JSON.parse( JSON.stringify(response[0]) );
                    _tokensModel.verifyToken(tokenData.token_id, tokenData.user_id, function (tokenIsValid) {
                        if (tokenIsValid) {
                            // Error if nothing is sent to update
                            if(email || phone || name || service || customerListId) {
                                // Lookup the customers
                                let findCustomer = 'SELECT * FROM '+ tableName +' WHERE unique_id = ? LIMIT 1';
                                db.query(findCustomer, _id, (err, response) => {
                                    if (!err && response.length > 0) {
                                        var customerData = JSON.parse( JSON.stringify(response[0]) );
                                        // Update the fields if necessary
                                        if(email){
                                            customerData.email = email;
                                        }
                                        if(phone){
                                            customerData.phone = phone;
                                        }
                                        if(name){
                                            customerData.name = name;
                                        }
                                        if (service) {
                                            customerData.service = service;
                                        }
                                        if (customerListId) {
                                            customerData.customerListId = customerListId;
                                        }
                                        customerData.updated_at = new Date(Date.now());

                                        // Update the customer
                                        let updateCustomer = "UPDATE "+ tableName +" SET ? WHERE unique_id = ?";
                                        db.query(updateCustomer, [customerData, _id], (err, response) => {
                                            if (!err) {
                                                callback(200);
                                            } else {
                                                callback(500,{'Error' : 'Could not update the customers.'});
                                            }
                                        })
                                    } else {
                                        callback(400,{'Error' : 'Something wrong.'});
                                    }
                                });
                            } else {
                                callback(400,{'Error' : 'Missing fields to update.'})
                            }
                        } else {
                            callback(403,{"Error" : "Missing required token in header, or token is invalid."})
                        }
                    })
                } else {
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


// delete - customers
// Required customer unique_id params : _id={unique_id}
// Required headers token
_customers.delete = function(data, callback) {
    // Check that user id is valid
    var _id = typeof(data.queryStringObject._id) == 'string' && data.queryStringObject._id.trim().length == 10 ? data.queryStringObject._id.trim() : false;

    if (_id) {
        var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

        if (token) {
            _tokensModel.findById(token, function (err, response) {
                if (!err && response.length > 0) {
                    var tokenData = JSON.parse( JSON.stringify(response[0]) );
                    _tokensModel.verifyToken(tokenData.token_id, tokenData.user_id, function (tokenIsValid) {
                         if (tokenIsValid) {
                             // Find customer by unique_id
                             let sql = 'SELECT * FROM '+ tableName +' WHERE unique_id = ? LIMIT 1';
                             db.query(sql, _id, (err, response) => {
                                 if (!err && response.length > 0) {
                                     let sql = "DELETE FROM "+tableName+" WHERE unique_id = ?";
                                     db.query(sql, [_id], function (err, response) {
                                         if  (!err) {
                                             callback(false, response);
                                         } else {
                                             callback("Cannot do this query  : " , sql) ;
                                         }
                                     });
                                 } else {
                                     callback(400,{'Error' : 'Specified customer does not exist.'});
                                 }
                             });
                         }else {
                             callback(403,{"Error" : "Missing required token in header, or token is invalid."})
                         }
                    });
                } else {
                    callback(403,{"Error" : "Missing required token in header, or token is invalid."})
                }
            });
        } else {
            callback(400,{'Error' : 'Missing required field'});
        }
    } else {
        callback(400,{'Error' : 'Missing required field'})
    }
};


// Export the module
module.exports = customers;