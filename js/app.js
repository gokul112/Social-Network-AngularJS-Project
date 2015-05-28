'use strict';

var app = angular.module('app', ['ngRoute']);

app.constant('baseServiceUrl', 'http://softuni-ads.azurewebsites.net/api');

app.config(function ($routeProvider, $locationProvider) {

    $routeProvider
        .when('/',
            {
                templateUrl:'partials/welcome.html',
                controller: 'AppController'
            })
        .when('/login',
            {
                templateUrl: 'partials/login.html',
                controller: 'LoginController'
            })
        .when('/register',
            {
                templateUrl: 'partials/register.html',
                controller: 'RegisterController'
            })
        .otherwise({  redirectTo: '/'});
});
