/**
 *  Control this route
 *
 */

// Dependencies
var TokensController = require('./../app/controllers/TokensController');
var UsersController = require('./../app/controllers/UsersController');
var handlers = require('./../app/controllers/handlers');

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
    'profile'   : handlers.profile,
    'signup'    : handlers.accountSignUp,
    'login'     : handlers.sessionCreate,
    'logout'    : handlers.sessionDeleted,

    /*
     * JSON API Handlers
     *
     */
    'api/tokens' : TokensController,
    'api/users' : UsersController
};

// Export the module
module.exports = route;