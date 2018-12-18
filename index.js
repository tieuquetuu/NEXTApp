/*
 * Primary file for API
 *
 */

// Dependencies
var server = require('./lib/server');

// Declare the app
var app = {};

// Init function
app.init = function(callback){

    // Start the server
    server.init();
};


app.init(function(){});


// Export the app
module.exports = app;
