'use strict';

var app = angular.module('app', ['ngRoute', 'ngResource', 'ui.bootstrap.pagination']);

app.constant('baseServiceUrl', 'http://softuni-ads.azurewebsites.net/api');

app.config(function ($routeProvider) {

    $routeProvider
        .when('/',
            {
                templateUrl:'partials/welcome.html',
                controller: 'AppController'
            })
        .when('/login',
            {
                templateUrl: 'partials/login.html',
                controller: 'LoginController',
                resolve:{
                    isLogged: function($location){
                        if(localStorage.getItem('accessToken')){
                            $location.path('/');
                        }
                    }
                }
            })
        .when('/register',
            {
                templateUrl: 'partials/register.html',
                controller: 'RegisterController',
                resolve:{
                    isLogged: function($location){
                        if(localStorage.getItem('accessToken')){
                            $location.path('/');
                        }
                    }
                }
            })
        .when('/user/:username/wall/', {
            templateUrl: 'templates/wall.html',
            controller: 'mainController',
            resolve:{
                isLogged: function($location){
                    if(!localStorage.getItem('accessToken')){
                        $location.path('/');
                    }
                }
            }
        })
        .when('/settings/edit/details/', {
            templateUrl: 'templates/profile-details.html',
            controller: 'mainController',
            resolve:{
                isLogged: function($location){
                    if(!localStorage.getItem('accessToken')){
                        $location.path('/');
                    }
                }
            }
        })
        .when('/settings/edit/password/', {
            templateUrl: 'templates/profile-password.html',
            controller: 'mainController',
            resolve:{
                isLogged: function($location){
                    if(!localStorage.getItem('accessToken')){
                        $location.path('/');
                    }
                }
            }
        })
        .when('/friends/requests/', {
            templateUrl: 'templates/pending-requests.html',
            controller: 'mainController',
            resolve:{
                isLogged: function($location){
                    if(!localStorage.getItem('accessToken')){
                        $location.path('/');
                    }
                }
            }
        })
        .otherwise({  redirectTo: '/'});
});
