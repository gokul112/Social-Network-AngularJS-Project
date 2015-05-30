app = angular.module('SocialNetwork', ['ngRoute']);

app.constant('baseServiceUrl', 'http://softuni-social-network.azurewebsites.net/api');

app.run(function ($rootScope) {
    $rootScope.navigateToPage = function (message, page) {
        var initialLocation = window.location.href;

        var splitted = window.location.href.split('#');
        if (page) {
            window.location.replace(splitted[0] + '' + page);
        } else {
            window.location.replace(splitted[0] + '#/');
        }

        if (initialLocation === window.location.href) {
            location.reload();
        }

        if (message) {
            notifyService.showInfo("Success", message);
        }
    };

    $rootScope.clearCredentials = function () {
        localStorage.clear();
    }
});

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'MainController'
        })
        .when('/FriendRequests', {
            templateUrl: 'partials/friendRequests.html',
            controller: 'MainController',
            resolve: {
                factory: redirectToHomeIfNotLogged
            }
        })
        .when('/Search/:id', {
            templateUrl: 'partials/searchResults.html',
            controller: 'MainController',
            resolve: {
                factory: redirectToHomeIfNotLogged
            }
        })
        .when('/EditProfile', {
            templateUrl: 'partials/editProfile.html',
            controller: 'MainController',
            resolve: {
                factory: redirectToHomeIfNotLogged
            }
        })
        .when('/ChangePassword', {
            templateUrl: 'partials/changePassword.html',
            controller: 'MainController',
            resolve: {
                factory: redirectToHomeIfNotLogged
            }
        })
        .when('/Login', {
            templateUrl: 'partials/login.html',
            controller: 'MainController',
            resolve: {
                factory: redirectToHomeIfLogged
            }
        })
        .when('/Register', {
            templateUrl: 'partials/register.html',
            controller: 'MainController',
            resolve: {
                factory: redirectToHomeIfLogged
            }
        })
        .when('/Search/:id', {
            templateUrl: 'partials/search.html',
            controller: 'MainController',
            resolve: {
                factory: redirectToHomeIfNotLogged
            }
        })
        .when('/User/:id', {
            templateUrl: 'partials/wall.html',
            controller: 'MainController',
            resolve: {
                factory: redirectToHomeIfNotLogged
            }
        })
        .when('/OwnFriends', {
            templateUrl: 'partials/friendsDetailedList.html',
            controller: 'MainController',
            resolve: {
                factory: redirectToHomeIfNotLogged
            }
        })
        .when('/:id/Friends', {
            templateUrl: 'partials/friendsDetailedList.html',
            controller: 'MainController',
            resolve: {
                factory: redirectToHomeIfNotLogged
            }
        })
        .when('/Post/:id', {
            templateUrl: 'partials/detailedPost.html',
            controller: 'MainController',
            resolve: {
                factory: redirectToHomeIfNotLogged
            }
        })
        .otherwise({ redirectTo: '/' });

});

function redirectToHomeIfNotLogged() {
    if (!localStorage['sessionToken']) {
        var splitted = window.location.href.split('#');
        window.location.replace(splitted[0] + '#/');

    }
}

function redirectToHomeIfLogged() {
    if (localStorage['sessionToken']) {
        var splitted = window.location.href.split('#');
        window.location.replace(splitted[0] + '#/');

    }
}
