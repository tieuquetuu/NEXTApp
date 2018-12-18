/*
 * Frontend Logic for application
 *
 */

// Container for frontend application
var appJs = {};

// Config
appJs.config = {
    'sessionToken' : false,
    'userId' : false
};
appJs.tokenString = localStorage.getItem('token');
if (typeof (appJs.tokenString) == "string") {
    appJs.config.sessionToken = JSON.parse(appJs.tokenString);
    appJs.config.userId = appJs.config.sessionToken.user_id;
} else {
    window.location = 'login';
}

// AJAX Client (for RESTful API)
appJs.client = {};

// Interface for making API calls
appJs.client.request = function(headers,path,method,queryStringObject,payload,callback){

    // Set defaults
    headers = typeof(headers) == 'object' && headers !== null ? headers : {};
    path = typeof(path) == 'string' ? path : '/';
    method = typeof(method) == 'string' && ['POST','GET','PUT','DELETE'].indexOf(method.toUpperCase()) > -1 ? method.toUpperCase() : 'GET';
    queryStringObject = typeof(queryStringObject) == 'object' && queryStringObject !== null ? queryStringObject : {};
    payload = typeof(payload) == 'object' && payload !== null ? payload : {};
    callback = typeof(callback) == 'function' ? callback : false;

    // For each query string parameter sent, add it to the path
    var requestUrl = path+'?';
    var counter = 0;
    for(var queryKey in queryStringObject){
        if(queryStringObject.hasOwnProperty(queryKey)){
            counter++;
            // If at least one query string parameter has already been added, preprend new ones with an ampersand
            if(counter > 1){
                requestUrl+='&';
            }
            // Add the key and value
            requestUrl+=queryKey+'='+queryStringObject[queryKey];
        }
    }

    // Form the http request as a JSON type
    var xhr = new XMLHttpRequest();
    xhr.open(method, requestUrl, true);
    xhr.setRequestHeader("Content-type", "application/json");

    // For each header sent, add it to the request
    for(var headerKey in headers){
        if(headers.hasOwnProperty(headerKey)){
            xhr.setRequestHeader(headerKey, headers[headerKey]);
        }
    }

    // If there is a current session token set, add that as a header
    if(app.config.sessionToken){
        xhr.setRequestHeader("token", app.config.sessionToken.id);
    }

    // When the request comes back, handle the response
    xhr.onreadystatechange = function() {
        if(xhr.readyState == XMLHttpRequest.DONE) {
            var statusCode = xhr.status;
            var responseReturned = xhr.responseText;

            // Callback if requested
            if(callback){
                try{
                    var parsedResponse = JSON.parse(responseReturned);
                    callback(statusCode,parsedResponse);
                } catch(e){
                    callback(statusCode,false);
                }

            }
        }
    }

    // Send the payload as JSON
    var payloadString = JSON.stringify(payload);
    xhr.send(payloadString);

};

// Get the session token from localstorage and set it in the app.config object
appJs.getSessionToken = function(){
    var tokenString = localStorage.getItem('token');
    if(typeof(tokenString) == 'string'){
        try{
            var token = JSON.parse(tokenString);
            appJs.config.sessionToken = token;
            if(typeof(token) == 'object'){
                appJs.setLoggedInClass(true);
            } else {
                appJs.setLoggedInClass(false);
            }
        }catch(e){
            appJs.config.sessionToken = false;
            appJs.setLoggedInClass(false);
        }
    }
};

// Set (or remove) the loggedIn class from the body
appJs.setLoggedInClass = function(add){
    var target = document.querySelector("body");
    if(add){
        target.classList.add('UserLoggedIn');
    } else {
        target.classList.remove('UserLoggedIn');
    }
};

// Set the session token in the appJs.config object as well as localstorage
appJs.setSessionToken = function(token){
    appJs.config.sessionToken = token;
    var tokenString = JSON.stringify(token);
    localStorage.setItem('token',tokenString);
    if(typeof(token) == 'object'){
        appJs.setLoggedInClass(true);
    } else {
        appJs.setLoggedInClass(false);
    }
};

// Renew the token
appJs.renewToken = function(callback){
    var currentToken = typeof(appJs.config.sessionToken) == 'object' ? appJs.config.sessionToken : false;
    if(currentToken){
        // Update the token with a new expiration
        var payload = {
            'id' : currentToken.token_id,
            'extend' : true,
        };
        appJs.client.request(undefined,'api/tokens','PUT',undefined,payload,function(statusCode,responsePayload){
            // Display an error on the form if needed
            if(statusCode == 200){
                // Get the new token details
                var queryStringObject = {'id' : currentToken.token_id};
                appJs.client.request(undefined,'api/tokens','GET',queryStringObject,undefined,function(statusCode,responsePayload){
                    // Display an error on the form if needed
                    if(statusCode == 200){
                        appJs.setSessionToken(responsePayload);
                        callback(false);
                    } else {
                        appJs.setSessionToken(false);
                        callback(true);
                    }
                });
            } else {
                appJs.setSessionToken(false);
                callback(true);
            }
        });
    } else {
        appJs.setSessionToken(false);
        callback(true);
    }
};

// Load data on the page
appJs.loadDataOnPage = function(){
    // Get the current page from the body class
    var bodyClasses = document.querySelector("body").classList;
    var primaryClass = typeof(bodyClasses[0]) == 'string' ? bodyClasses[0] : false;
    var bodyClassStr = document.querySelector("body").getAttribute("class");

    // Logic for admin details page
    if (bodyClassStr.indexOf("UserLoggedIn") > -1) {
        console.log("You loggin");
    } else {
        window.location = '/login';
    }
};

// Loop to renew token often
appJs.tokenRenewalLoop = function(){
    setInterval(function(){
        appJs.renewToken(function(err){
            if(!err){
                // console.log("Token renewed successfully @ "+Date.now());
            }
        });
    },1000 * 60 * 15); // Set 15 minute to renew token
};

// Init (bootstrapping)
appJs.init = function(){
    // // Get the token from localstorage
    appJs.getSessionToken();
    // // Renew token
    appJs.tokenRenewalLoop();
    // Load data on page
    appJs.loadDataOnPage();
};

// Call the init processes after the window loads
window.onload = function(){
    appJs.init();
};