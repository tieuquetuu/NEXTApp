/**
 *  SmsController
 *
 */

// Dependencies
var helpers = require('../../lib/helpers');
var _tokensModel = require('../models/tokens');
var CustomersController = require('../controllers/CustomersController');
var db = require('./../db');


const SMSTABLE = {
    customersList : 'customers_list',
    customers : 'customers'
};


// Sms handlers any api and functions
var sms = {
    handlers : function (data,callback) {
        var acceptableMethods = ['post','get','put','delete'];
        if(acceptableMethods.indexOf(data.method) > -1){
            _sms[data.method](data,callback);
        } else {
            callback(405);
        }
    }
};


// container
var _sms = {};


// post - sms
_sms.post = function(data, callback) {

};

// get - _sms
_sms.get = function(data, callback) {

};

// put - sms
_sms.put = function(data, callback) {

};

// delete - sms
_sms.delete = function(data, callback) {

};


// Handler API
sms.createListCustomer = function(data, callback) {
    var strNewCustomers = data.payload.newCustomers = JSON.stringify({
        customers : [
            {
                phone: '0352306562',
                name: 'Nguyễn Trung Hiếu',
                email: 'hieunguyen@gmail.com',
                service: 'Tắm trắng da'
            },
            {
                phone: '0352306563',
                name: 'Nguyễn Phước Lợi',
                email: 'loinguyen@gmail.com',
                service: 'Trị da mụn'
            },
            {
                phone: '0352306564',
                name: 'Hoàng Nghĩa',
                email: 'hoangnghia@gmail.com',
                service: 'Trị Thâm nách'
            }
        ]
    });

    if (data.method == 'post') {

        // Get token from headers
        var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
        if (token) {
            // Parser the String data to Object
            var newCustomer = helpers.parseJsonToObject(strNewCustomers);
            if (newCustomer.customers.length > 0) {
                var listCustomersObj = {
                    unique_id : helpers.createRandomString(9),
                    title : "My first List",
                    data : strNewCustomers,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                };

                // Create a new list
                let createSql = 'INSERT INTO ' + SMSTABLE.customersList + ' SET ?';
                db.query(createSql, [listCustomersObj], (err, response) => {
                    if (!err) {
                        // Container for the data callback
                        var dataCallback = {
                            success : [],
                            failed : []
                        };

                        // Foreach the list customers
                        newCustomer.customers.forEach(function (element) {
                            // Check that all required fields are filled out
                            var email = typeof(element.email) == 'string' && element.email.trim().length > 0 ? element.email.trim() : false;
                            var name = typeof(element.name) == 'string' && element.name.trim().length > 0 ? element.name.trim() : false;
                            var phone = typeof(element.phone) == "string" && 10 <= element.phone.trim().length <= 15 ? element.phone.trim() : false;
                            var service = typeof(element.service) == 'string' && element.service.trim().length > 0 ? element.service.trim() : false;
                            var customerListId =  typeof(listCustomersObj.unique_id) == 'string' && listCustomersObj.unique_id.trim().length == 9 ? listCustomersObj.unique_id.trim() : false;

                            if(name && phone){
                                // Make sure the user doesnt already exist
                                // checks customers exist
                                let checksSql = 'SELECT * FROM '+ SMSTABLE.customers +' WHERE phone = ?';
                                db.query(checksSql, phone, (err, response) => {
                                    if (err) {
                                        console.log(400, "Error : ", err);
                                    } else if (err == null && response.length == 0) {
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
                                            customersObj.customers_list_id = JSON.stringify({id : [customerListId]});
                                        }

                                        let createSql = 'INSERT INTO ' + SMSTABLE.customers + ' SET ?';
                                        db.query(createSql, [customersObj], (err, response) => {
                                            if (err == null && response) {
                                                dataCallback.success.push(element);
                                                console.log(200, response);
                                            } else {
                                                dataCallback.failed.push(element);
                                                console.log(400, "Error : " , err);
                                                return
                                            }
                                        });
                                    } else {
                                        // Customers alread exists checks the customers_list_id if exist do not thing, else we add a new id
                                        var argsId = (helpers.parseJsonToObject(response[0].customers_list_id)).id;

                                        if (!argsId.includes(customerListId)) {
                                            // Add new id
                                            argsId.push(customerListId) ;
                                            var newId = JSON.stringify({id : argsId});
                                            // Update the customer
                                            let updateCustomer = 'UPDATE '+ SMSTABLE.customers +' SET ? WHERE id = ?';
                                            db.query(updateCustomer, [{customers_list_id : newId}, response[0].id], (err, response) => {
                                                if (!err) {
                                                    console.log(200);
                                                } else {
                                                    console.log(500,{'Error' : 'Could not update the customers.'});
                                                }
                                            });
                                        } else {
                                            console.log(200, "List ID exist : ", customerListId);
                                            return
                                        }
                                    }
                                });
                            } else {
                                dataCallback.failed.push(element);
                                console.log(400, "Error :" , response);
                                return
                            }
                        });
                        console.log(dataCallback);
                        // Callback the info
                        callback(200, dataCallback);
                    } else {
                        callback(400, {"Error" : "Cannot create new list"});
                    }
                });
            } else {
                callback(400, {"Error" : "Not thing in the data"});
            }
        } else {
            callback(400,{'Error' : 'Missing required fields'});
        }
    } else {
        callback(405);
    }
};



// Export the module
module.exports = sms;