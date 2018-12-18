/*
 * Request Handlers
 *
 */

// Dependencies
var _data = require('./data');
var helpers = require('./helpers');
var config = require('./config');
var dns = require('dns');
var _url = require('url');
var _performance = require('perf_hooks').performance;
var util = require('util');
var debug = util.debuglog('performance');

// Define all the handlers
var handlers = {};

/*
 * HTML Handlers
 *
 */

// Index
handlers.index = function(data,callback){
    // Reject any request that isn't a GET
    if(data.method == 'get'){
        // Prepare data for interpolation
        var templateData = {
            'head.title' : 'Uptime Monitoring - Made Simple',
            'head.description' : 'We offer free, simple uptime monitoring for HTTP/HTTPS sites all kinds. When your site goes down, we\'ll send you a text to let you know',
            'body.class' : 'index'
        };

        // Read in a template as a string
        helpers.getTemplate('index',templateData,function(err,str){
            if(!err && str){
                // Add the universal header and footer
                helpers.addUniversalTemplates(str,templateData,function(err,str){
                    if(!err && str){
                        // Return that page as HTML
                        callback(200,str,'html');
                    } else {
                        callback(500,undefined,'html');
                    }
                });
            } else {
                callback(500,undefined,'html');
            }
        });
    } else {
        callback(405,undefined,'html');
    }
};

// Create Account
handlers.accountCreate = function(data,callback){
    // Reject any request that isn't a GET
    if(data.method == 'get'){
        // Prepare data for interpolation
        var templateData = {
            'head.title' : 'Create an Account',
            'head.description' : 'Signup is easy and only takes a few seconds.',
            'body.class' : 'accountCreate'
        };
        // Read in a template as a string
        helpers.getTemplate('accountCreate',templateData,function(err,str){
            if(!err && str){
                // Add the universal header and footer
                helpers.addUniversalTemplates(str,templateData,function(err,str){
                    if(!err && str){
                        // Return that page as HTML
                        callback(200,str,'html');
                    } else {
                        callback(500,undefined,'html');
                    }
                });
            } else {
                callback(500,undefined,'html');
            }
        });
    } else {
        callback(405,undefined,'html');
    }
};

// Create New Session
handlers.sessionCreate = function(data,callback){
    // Reject any request that isn't a GET
    if(data.method == 'get'){
        // Prepare data for interpolation
        var templateData = {
            'head.title' : 'Login to your account.',
            'head.description' : 'Please enter your phone number and password to access your account.',
            'body.class' : 'sessionCreate'
        };
        // Read in a template as a string
        helpers.getTemplate('sessionCreate',templateData,function(err,str){
            if(!err && str){
                // Add the universal header and footer
                helpers.addUniversalTemplates(str,templateData,function(err,str){
                    if(!err && str){
                        // Return that page as HTML
                        callback(200,str,'html');
                    } else {
                        callback(500,undefined,'html');
                    }
                });
            } else {
                callback(500,undefined,'html');
            }
        });
    } else {
        callback(405,undefined,'html');
    }
};

// Edit Your Account
handlers.accountEdit = function(data,callback){
    // Reject any request that isn't a GET
    if(data.method == 'get'){
        // Prepare data for interpolation
        var templateData = {
            'head.title' : 'Account Settings',
            'body.class' : 'accountEdit'
        };
        // Read in a template as a string
        helpers.getTemplate('accountEdit',templateData,function(err,str){
            if(!err && str){
                // Add the universal header and footer
                helpers.addUniversalTemplates(str,templateData,function(err,str){
                    if(!err && str){
                        // Return that page as HTML
                        callback(200,str,'html');
                    } else {
                        callback(500,undefined,'html');
                    }
                });
            } else {
                callback(500,undefined,'html');
            }
        });
    } else {
        callback(405,undefined,'html');
    }
};

// Session has been deleted
handlers.sessionDeleted = function(data,callback){
    // Reject any request that isn't a GET
    if(data.method == 'get'){
        // Prepare data for interpolation
        var templateData = {
            'head.title' : 'Logged Out',
            'head.description' : 'You have been logged out of your account.',
            'body.class' : 'sessionDeleted'
        };
        // Read in a template as a string
        helpers.getTemplate('sessionDeleted',templateData,function(err,str){
            if(!err && str){
                // Add the universal header and footer
                helpers.addUniversalTemplates(str,templateData,function(err,str){
                    if(!err && str){
                        // Return that page as HTML
                        callback(200,str,'html');
                    } else {
                        callback(500,undefined,'html');
                    }
                });
            } else {
                callback(500,undefined,'html');
            }
        });
    } else {
        callback(405,undefined,'html');
    }
};

// Account has been deleted
handlers.accountDeleted = function(data,callback){
    // Reject any request that isn't a GET
    if(data.method == 'get'){
        // Prepare data for interpolation
        var templateData = {
            'head.title' : 'Account Deleted',
            'head.description' : 'Your account has been deleted.',
            'body.class' : 'accountDeleted'
        };
        // Read in a template as a string
        helpers.getTemplate('accountDeleted',templateData,function(err,str){
            if(!err && str){
                // Add the universal header and footer
                helpers.addUniversalTemplates(str,templateData,function(err,str){
                    if(!err && str){
                        // Return that page as HTML
                        callback(200,str,'html');
                    } else {
                        callback(500,undefined,'html');
                    }
                });
            } else {
                callback(500,undefined,'html');
            }
        });
    } else {
        callback(405,undefined,'html');
    }
};

// Favicon
handlers.favicon = function(data,callback){
    // Reject any request that isn't a GET
    if(data.method == 'get'){
        // Read in the favicon's data
        helpers.getStaticAsset('favicon.ico',function(err,data){
            if(!err && data){
                // Callback the data
                callback(200,data,'favicon');
            } else {
                callback(500);
            }
        });
    } else {
        callback(405);
    }
};

// Public assets
handlers.public = function(data,callback){
    // Reject any request that isn't a GET
    if(data.method == 'get'){
        // Get the filename being requested
        var trimmedAssetName = data.trimmedPath.replace('public/','').trim();
        if(trimmedAssetName.length > 0){
            // Read in the asset's data
            helpers.getStaticAsset(trimmedAssetName,function(err,data){
                if(!err && data){

                    // Determine the content type (default to plain text)
                    var contentType = 'plain';

                    if(trimmedAssetName.indexOf('.css') > -1){
                        contentType = 'css';
                    }

                    if(trimmedAssetName.indexOf('.png') > -1){
                        contentType = 'png';
                    }

                    if(trimmedAssetName.indexOf('.jpg') > -1){
                        contentType = 'jpg';
                    }

                    if(trimmedAssetName.indexOf('.ico') > -1){
                        contentType = 'favicon';
                    }

                    // Callback the data
                    callback(200,data,contentType);
                } else {
                    callback(404);
                }
            });
        } else {
            callback(404);
        }

    } else {
        callback(405);
    }
};

/*
 * JSON API Handlers
 *
 */

// Ping
handlers.ping = function(data,callback){
    callback(200);
};

// Error example (this is why we're wrapping the handler caller in a try catch)
handlers.exampleError = function(data,callback){
    var err = new Error('This is an example error.');
    throw(err);
};

// Not-Found
handlers.notFound = function(data,callback){
    callback(404);
};


// Export the handlers
module.exports = handlers;
