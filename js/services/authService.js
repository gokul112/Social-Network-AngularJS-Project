'use strict';

app.factory('authService',
    function ($http, baseServiceUrl) {
        return {
            login: function(userData, success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/user/login',
                    data: userData
                };
                $http(request).success(function(data) {
                    sessionStorage['currentUser'] = JSON.stringify(data);
                    success(data);
                }).error(error);
            },

            register: function(userData, success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/user/register',
                    data: userData
                };
                $http(request).success(function(data) {
                    sessionStorage['currentUser'] = JSON.stringify(data);
                    success(data);
                }).error(error);
            },

            isLoggedIn : function() {
                return sessionStorage['currentUser'] != undefined;
            },

            logout: function() {
                delete sessionStorage['currentUser'];
            },

            getCurrentUser : function() {
                localStorage.setItem('accessToken', data['access_token']);
                localStorage.setItem('username', data['userName']);
                localStorage.setItem('name', data['name']);
            },

            clearCurrentUser : function() {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('username');
                localStorage.removeItem('name');;
            },

            getAccessToken: function() {
                return localStorage.getItem('accessToken');
            },

            getUsername: function(userData, success, error) {
                return localStorage.getItem('username');
            },

            getName: function() {
                return localStorage.getItem('name');
            }
        }
    }
);