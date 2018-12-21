/*
 * Request Handlers
 *
 */

// Dependencies
var helpers = require('./../../lib/helpers');

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
        helpers.views('index',templateData,function(err,str){
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

// Signup
handlers.accountSignUp = function(data, callback) {
      if (data.method == 'get') {
          // Prepare data for interpolation
          var templateData = {
              'head.title' : 'Create an Account',
              'head.description' : 'SignUp is easy and only takes a few seconds.',
              'body.class' : 'accountSignUp'
          };

          // Read in a template as a string
          helpers.getTemplate('admin/accountSignUp',templateData,function(err,accountSignUpString){
              if(!err && accountSignUpString){
                  // Add them all together
                  var fullString = accountSignUpString;
                  callback(200,fullString, 'html');
              } else {
                  callback('Could not find the accountSignUp template');
              }
          });

      } else {
          callback(405, undefined, 'html');
      }
};

// Login
handlers.sessionCreate = function(data, callback) {
    if (data.method == 'get') {
        // Prepare data for interpolation
        var templateData = {
            'head.title' : 'Log In',
            'head.description' : 'Login is easy and only takes a few seconds.',
            'body.class' : 'pageLogin'
        };

        // Read in a template as a string
        helpers.getTemplate('admin/pageLogin',templateData,function(err,accountSignUpString){
            if(!err && accountSignUpString){
                // Add them all together
                var fullString = accountSignUpString;
                callback(200,fullString, 'html');
            } else {
                callback('Could not find the accountSignUp template');
            }
        });

    } else {
        callback(405, undefined, 'html');
    }
};

// Logout
handlers.sessionDeleted = function(data, callback) {
    // Reject any request that isn't a GET
    if(data.method == 'get'){
        // Prepare data for interpolation
        var templateData = {
            'head.title' : 'Logged Out',
            'head.description' : 'You have been logged out of your account.',
            'body.class' : 'pageLogout'
        };
        // Read in a template as a string
        helpers.getTemplate('admin/pageLogout',templateData,function(err,str){
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

// Profile
handlers.profile = function(data, callback) {
    // Reject any request that isn't a GET
    if (data.method == 'get') {
        // Prepare data for interpolation
        var templateData = {
            'head.title' : '',
            'head.description' : '',
            'body.class' : 'userProfile'
        };

        // Read in a template as a string
        helpers.views('users/profile',templateData,function(err,str){
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
        callback(405, undefined, 'html');
    }
};

// Workflow
handlers.workflow = function(data, callback) {
    if (data.method == 'get') {
        // Prepare data for interpolation
        var templateData = {
            'head.title' : 'Create a automation marketing plain',
            'head.description' : 'Create a automation marketing plain is easy and only takes a few seconds.',
            'body.class' : 'pageSmsWorkflow'
        };

        // Read in a template as a string
        helpers.getTemplate('sms/workflow',templateData,function(err,accountSignUpString){
            if(!err && accountSignUpString){
                // Add them all together
                var fullString = accountSignUpString;
                callback(200,fullString, 'html');
            } else {
                callback('Could not find the accountSignUp template');
            }
        });
    } else {
        callback(405, undefined, 'html');
    }
};

// Export the handlers
module.exports = handlers;