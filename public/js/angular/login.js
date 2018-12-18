/**
 * Logic for frontend register Page
 */

var app = angular.module('LoginPage', ['ngMaterial', 'ngMessages']);

app.factory("LoginHTTP", ["$http", function ($http) {
    return {
        create: function (userData) {
            return $http.post("/api/tokens", userData);
        }
    }
}]);


app.controller("LoginCtrl", ['$scope' ,'LoginHTTP', function ($scope, LoginHTTP) {
    $scope.loading = false;
    $scope.logoUrl = "public/logo.png";
    $scope.formData = {};
    $scope.user = {};
    $scope.config = {
        sessionToken : false
    };

    $scope.createSession = function (e) {
        e.preventDefault();
        $scope.loading = true;

        // console.log($scope.formData);

        var userData = {
            username : $scope.formData.username,
            password : $scope.formData.password
        };

        LoginHTTP.create(userData).then(function (response) {
            // Set A new Token
            $scope.config.sessionToken = response.data;
            var tokenString = JSON.stringify(response.data);
            localStorage.setItem('token',tokenString);

            // Redirect to dashboard
            window.location = '/';

            $scope.loading = false;
        }, function (error) {
            console.log({"Create" : error});
            window.location = '/login';
        });

        //
        // $scope.formData.username = "";
        // $scope.formData.email = "";
        // $scope.formData.phone = "";
        // $scope.formData.password = "";

        $scope.loading = false;
    };

}])