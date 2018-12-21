/**
 *  Control this route
 *
 */

// Dependencies
var TokensController = require('./../app/controllers/TokensController');
var UsersController = require('./../app/controllers/UsersController');
var CustomersController = require('./../app/controllers/CustomersController');
var SmsController = require('./../app/controllers/SmsController');
var handlers = require('./../app/controllers/handlers');
var middleware = require('../app/middleware');


// container all the route
var route = {
    // '' : handlers.index,
    // 'account/create' : handlers.accountCreate,
    // 'account/edit' : handlers.accountEdit,
    // 'account/deleted' : handlers.accountDeleted,
    // 'session/create' : handlers.sessionCreate,
    // 'session/deleted' : handlers.sessionDeleted,
    // 'checks/all' : handlers.checksList,
    // 'checks/create' : handlers.checksCreate,
    // 'checks/edit' : handlers.checksEdit,
    // 'ping' : handlers.ping,
    // 'api/users' : handlers.users,
    // 'api/tokens' : handlers.tokens,
    // 'api/checks' : handlers.checks,
    // 'favicon.ico' : handlers.favicon,
    // 'public' : handlers.public,
    // 'examples/error' : handlers.exampleError

    /*
     * HTML Handlers
     *
     */
    ''          : handlers.index,
    'favicon.ico' : handlers.favicon,
    'profile'   : handlers.profile,
    'public' : handlers.public,
    'signup'    : handlers.accountSignUp,
    'login'     : handlers.sessionCreate,
    'logout'    : handlers.sessionDeleted,
    'middleware': middleware.sessionChecked,
    'sms/workflow' : handlers.workflow,
    // 'sms/customers' : handlers.customers,

    /*
     * JSON API Handlers
     *
     */
    'api/tokens'            : TokensController,
    'api/users'             : UsersController,
    'api/sms/customers'     : CustomersController,
    'api/sms/listCustomer'  : SmsController.createListCustomer,
};

// Export the module
module.exports = route;