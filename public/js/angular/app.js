/**
 * You must include the dependency on 'ngMaterial'
 */

var app = angular.module('BlankApp', ['ngMaterial', 'ngMessages'])

// Get The Current User
var globalsConfig = {
    currentUser : false
};
app.constant("moment", moment);
app.config(function($mdDateLocaleProvider, moment) {
    /**
     * @param date {Date}
     * @returns {string} string representation of the provided date
     */
    $mdDateLocaleProvider.formatDate = function(date) {
        return date ? moment(date).format('M/D') : '';
    };

    /**
     * @param dateString {string} string that can be converted to a Date
     * @returns {Date} JavaScript Date object created from the provided dateString
     */
    $mdDateLocaleProvider.parseDate = function(dateString) {
        var m = moment(dateString, 'M/D', true);
        return m.isValid() ? m.toDate() : new Date(NaN);
    };

    /**
     * Check if the date string is complete enough to parse. This avoids calls to parseDate
     * when the user has only typed in the first digit or two of the date.
     * Allow only a day and month to be specified.
     * @param dateString {string} date string to evaluate for parsing
     * @returns {boolean} true if the date string is complete enough to be parsed
     */
    $mdDateLocaleProvider.isDateComplete = function(dateString) {
        dateString = dateString.trim();
        // Look for two chunks of content (either numbers or text) separated by delimiters.
        var re = /^(([a-zA-Z]{3,}|[0-9]{1,4})([ .,]+|[/-]))([a-zA-Z]{3,}|[0-9]{1,4})/;
        return re.test(dateString);
    };
});

app.factory('appHttp', ["$http", function ($http) {
    var _lib = {};

    _lib.readUser = function (userId) {

        var req = {
            method: 'GET',
            url: '/api/users',
            params: {_id: userId},
            headers: {
                'Content-Type': 'application/json',
                'token' : appJs.config.sessionToken.token_id
            }
        };

        return $http(req);
    };

    return _lib;
}]);
app.controller('AppBodyCtrl', function ($scope , appHttp, $timeout, $mdSidenav, $log) {
    $scope.avatarUrl = 'public/img/avatar/male.png';
    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.isOpenRight = function(){
        return $mdSidenav('right').isOpen();
    };

    // Get the user_id in the current token
    $scope.currentUser = {};
    var userId = typeof(appJs.config.userId) == 'string' && appJs.config.userId.trim().length == 10 ? appJs.config.userId : false;
    if (userId) {
        appHttp.readUser(userId).then(function (response) {
            $scope.currentUser = globalsConfig.currentUser = response.data;
        }, function (error) {
            console.log(error);
        });
    } else {
        alert("Something wrong Cannot get the User ");
        window.location = 'login';
    }

    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
        var timer;

        return function debounced() {
            var context = $scope,
                args = Array.prototype.slice.call(arguments);
            $timeout.cancel(timer);
            timer = $timeout(function() {
                timer = undefined;
                func.apply(context, args);
            }, wait || 10);
        };
    }

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
        return debounce(function() {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav(navID)
                .toggle()
                .then(function () {
                    $log.debug("toggle " + navID + " is done");
                });
        }, 200);
    }

    function buildToggler(navID) {
        return function() {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav(navID)
                .toggle()
                .then(function () {
                    $log.debug("toggle " + navID + " is done");
                });
        };
    }

    // Log the user out then redirect them
    $scope.userLogout = function (redirectUser) {
        // Set redirectUser to default to true
        redirectUser = typeof(redirectUser) == 'boolean' ? redirectUser : true;

        // Get the current token id
        var tokenId = typeof(appJs.config.sessionToken.token_id) == 'string' ? appJs.config.sessionToken.token_id : false;

        // Send the current token to the tokens endpoint to delete it
        var queryStringObject = {
            'id' : tokenId
        };
        appJs.client.request(undefined,'api/tokens','DELETE',queryStringObject,undefined,function(statusCode,responsePayload){
            // Set the app.config token as false
            appJs.setSessionToken(false);

            // Send the user to the logged out page
            if(redirectUser){
                window.location = '/login';
            }

        });
    };
})
    .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav('left').close()
                .then(function () {
                    $log.debug("close LEFT is done");
                });

        };
    })
    .controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav('right').close()
                .then(function () {
                    $log.debug("close RIGHT is done");
                });
        };
    })
    .controller('MenuCtrl', function ($scope) {

        $scope.menus = [
            {
                name: "Dashboard",
                path: "/dashboard",
                icon: "menu"
            },
            {
                name: "Profile",
                path: "/profile",
                icon: "person"
            }
        ];
    })
    .controller('CheckListCtrl', function ($scope, $log) {
        $scope.todos = [
            { name: 'Pepperoni', isDone: true },
            { name: 'Sausage', isDone: false },
            { name: 'Black Olives', isDone: true },
            { name: 'Green Peppers', isDone: false }
        ];

        this.myDate = new Date();

        this.onDateChanged = function() {
            $log.log('Updated Date: ', this.myDate);
        };
    })
    .controller('ProfileCtrl', [ "$scope", "appHttp",function ($scope, appHttp) {

        $scope.userProfile = {};
        var userId = typeof(appJs.config.userId) == 'string' && appJs.config.userId.trim().length == 10 ? appJs.config.userId : false;
        if (userId) {
            appHttp.readUser(userId).then(function (response) {
                $scope.userProfile = globalsConfig.currentUser = response.data;
            }, function (error) {
                console.log(error);
            });
        } else {
            alert("Something wrong Cannot get the User ");
            window.location = 'login';
        }

        $scope.profileFormData = {
            _id : userId
        };

        $scope.updateUser = function(e) {
            e.preventDefault();
            console.log($scope.profileFormData);
        };
    }])